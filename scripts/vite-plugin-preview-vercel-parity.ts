import type { Plugin } from 'vite'
import vercelConfig from '../vercel.json'

interface VercelHeaderRule {
    source: string
    headers: { key: string; value: string }[]
}

/** The few node:fs calls needed; the project ships no @types/node. */
interface Fs {
    existsSync(path: string): boolean
    readFileSync(path: string, encoding: 'utf8'): string
}

/**
 * Makes `vite preview` behave like the Vercel deployment, so local checks (discovery scan,
 * curl, hydration) see what production serves:
 * - the `headers` rules from vercel.json (single source; rule sources must be plain
 *   regex-compatible paths like `/(.*)\\.md`);
 * - unknown extensionless URLs get dist/404.html with status 404 (Vercel's static 404),
 *   instead of Vite's SPA fallback to the prerendered home page.
 */
export default function previewVercelParityPlugin(): Plugin {
    return {
        name: 'preview-vercel-parity',
        async configurePreviewServer(server) {
            const fs = (await import('node:fs' as string)) as Fs
            const outDir = server.config.build.outDir
            const headerRules: VercelHeaderRule[] = vercelConfig.headers ?? []
            const rules = headerRules.map(rule => ({
                pattern: new RegExp(`^${rule.source}$`),
                headers: rule.headers
            }))
            server.middlewares.use((req, res, next) => {
                // Typed loosely: without @types/node, IncomingMessage lacks url
                const rawPath = ((req as { url?: string }).url ?? '/').split('?')[0]
                let path = rawPath
                try {
                    path = decodeURI(rawPath)
                } catch {
                    // malformed %-escape: match rules against the raw path
                }
                for (const rule of rules) {
                    if (rule.pattern.test(path)) rule.headers.forEach(h => res.setHeader(h.key, h.value))
                }
                const isPage = path !== '/' && !/\.[a-z0-9]+$/i.test(path)
                const exists = fs.existsSync(`${outDir}${path.replace(/\/$/, '')}.html`)
                if (isPage && !exists && fs.existsSync(`${outDir}/404.html`)) {
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    res.end(fs.readFileSync(`${outDir}/404.html`, 'utf8'))
                    return
                }
                next()
            })
        }
    }
}
