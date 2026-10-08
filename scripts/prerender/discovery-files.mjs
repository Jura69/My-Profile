/**
 * Site-level discovery files built from the prerendered pages: sitemap.xml, llms.txt and
 * llms-full.txt. Every page record comes from the same render as the HTML, so titles,
 * descriptions and text cannot drift from what visitors see.
 *
 * page = { route, name, description, date, markdown, mdUrl, url }
 */

const xmlEscape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Canonical HTML URLs only (twins and 404 stay out); lastmod only when truthfully known. */
export function buildSitemap(pages) {
    const urls = pages
        .map(p => {
            const lastmod = p.date ? `\n    <lastmod>${p.date}</lastmod>` : ''
            return `  <url>\n    <loc>${xmlEscape(p.url)}</loc>${lastmod}\n  </url>`
        })
        .join('\n')
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

const entry = (p, name = p.name) => `- [${name}](${p.mdUrl}): ${p.description}`

/** llmstxt.org shape: H1 name, > summary, context, H2 sections of links to markdown twins. */
export function buildLlmsTxt(pages, origin) {
    const home = pages.find(p => p.route === '/')
    const section = prefix => pages.filter(p => p.route.startsWith(prefix))
    const projects = section('/works/')
    const optional = [...section('/activities'), ...section('/audiophile')]
    return [
        '# Trương Tuấn Lộc (Jura69)',
        '',
        `> ${home.description}`,
        '',
        'Personal portfolio: professional summary, skills, work history and project write-ups (enterprise work at CREASIA and personal projects). Every link below is the markdown version of a page; drop the `.md` suffix for the HTML page. Contact: Loctruongtuan@gmail.com.',
        '',
        '## Pages',
        '',
        entry(home, 'Home: profile, skills and work history'),
        entry(pages.find(p => p.route === '/works'), 'Works: all projects'),
        '',
        '## Projects',
        '',
        ...projects.map(p => entry(p)),
        '',
        '## Optional',
        '',
        ...optional.map(p => entry(p)),
        `- [CV (PDF)](${origin}/files/CV.pdf): Downloadable résumé`,
        `- [Full site as one file](${origin}/llms-full.txt): Every page above in reading order`,
        ''
    ].join('\n')
}

/** The whole public content in reading order, one markdown file. */
export function buildLlmsFull(pages) {
    return pages.map(p => p.markdown.trim()).join('\n\n---\n\n') + '\n'
}
