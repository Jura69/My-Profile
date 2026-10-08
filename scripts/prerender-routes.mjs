/**
 * Build-time prerender (last step of `yarn build`). Renders every route with the SSR
 * bundle (.ssr-build/entry-server.js, from src/entry-server.tsx) and writes the static
 * site surfaces into dist/:
 *   - <route>.html   real HTML + per-page <head> (Vercel cleanUrls serves /works → works.html)
 *   - 404.html       the not-found page (noindex), served by Vercel for unknown URLs
 *   - <route>.md     markdown twin of the page's <main> (root: index.md)
 *   - sitemap.xml, llms.txt, llms-full.txt
 * The browser then hydrates each page in place (src/main.tsx).
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { htmlToMarkdown } from './prerender/html-to-markdown.mjs'
import { contentDateFor } from './prerender/content-dates.mjs'
import { buildLlmsFull, buildLlmsTxt, buildSitemap } from './prerender/discovery-files.mjs'

const OUT_DIR = 'dist'
const SSR_DIR = '.ssr-build'
const NOT_FOUND_PROBE = '/__prerender-not-found__'
const ROOT_SLOT = '<div id="root"></div>'
/** index.html's static title/description/OG block, replaced by each page's own tags. */
const FALLBACK_HEAD = /<!-- seo-fallback:start -->[\s\S]*?<!-- seo-fallback:end -->/
/** Tags React 19 hoists to <head>. Fizz emits them as one run at the very start of a
 *  non-document render; only that leading run moves, so an SVG <title> in the body stays put. */
const HOISTED_RUN = /^(?:\s*(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>))+/
const HOISTED_TAG = /<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g

const decode = s => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

const template = readFileSync(join(OUT_DIR, 'index.html'), 'utf8')
if (!template.includes(ROOT_SLOT) || !FALLBACK_HEAD.test(template)) {
    throw new Error('prerender: index.html needs an empty #root and the seo-fallback markers')
}

const ssr = await import(pathToFileURL(join(SSR_DIR, 'entry-server.js')).href)
const origin = ssr.SITE_ORIGIN

/** Render a route and assemble its full HTML document. */
async function renderPage(route) {
    const rendered = await ssr.render(route)
    const run = rendered.match(HOISTED_RUN)?.[0] ?? ''
    if (!run.includes('<title>')) throw new Error(`prerender: ${route} did not start with its hoisted <title>/<meta> tags`)
    const head = run.match(HOISTED_TAG).join('\n    ')
    const body = rendered.slice(run.length)
    const html = template.replace(FALLBACK_HEAD, () => head).replace(ROOT_SLOT, () => `<div id="root">${body}</div>`)
    return { html, head, body }
}

function writeOut(path, content) {
    const file = join(OUT_DIR, path)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, content)
}

const htmlPathFor = route => (route === '/' ? '/index.html' : `${route}.html`)

/** Markdown twin: name, summary, canonical and date up top, then the page content. */
function buildTwin({ body, head, route, url, date }) {
    const main = body.match(/<main\b[^>]*>([\s\S]*)<\/main>/)?.[1] ?? ''
    const markdown = htmlToMarkdown(main, origin)
    const description = decode(head.match(/<meta\b[^>]*\bname="description" content="([^"]*)"/)?.[1] ?? '')
    const h1 = markdown.match(/^# (.+)$/m)
    const name = h1 ? h1[1].trim() : decode(head.match(/<title\b[^>]*>([^<]*)<\/title>/)?.[1] ?? route)
    const rest = h1 ? markdown.replace(h1[0], '').trim() : markdown
    const meta = [`Canonical: ${url}`, date && `Last updated: ${date}`].filter(Boolean).join('\n')
    const twin = `# ${name}\n\n> ${description}\n\n${meta}\n\n${rest}\n`.replace(/\n{3,}/g, '\n\n')
    return { name, description, markdown: twin }
}

const pages = []
for (const route of ssr.listSiteRoutes()) {
    const { html, head, body } = await renderPage(route)
    if (!/<h1\b/.test(body) || body.includes('Lost in the forest?')) {
        throw new Error(`prerender: ${route} rendered the 404 page or has no <h1> — is it in src/app.tsx?`)
    }
    const url = origin + (route === '/' ? '/' : route)
    const mdUrl = origin + ssr.markdownPathFor(route)
    const date = contentDateFor(route)
    const twin = buildTwin({ body, head, route, url, date })
    writeOut(htmlPathFor(route), html)
    writeOut(ssr.markdownPathFor(route), twin.markdown)
    pages.push({ route, url, mdUrl, date, ...twin })
}

const notFound = await renderPage(NOT_FOUND_PROBE)
writeOut('/404.html', notFound.html)

writeOut('/sitemap.xml', buildSitemap(pages))
writeOut('/llms.txt', buildLlmsTxt(pages, origin))
writeOut('/llms-full.txt', buildLlmsFull(pages))

rmSync(SSR_DIR, { recursive: true, force: true })
console.log(`prerender: ${pages.length} pages + 404, markdown twins, sitemap.xml, llms.txt, llms-full.txt`)
