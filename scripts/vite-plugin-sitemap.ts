import type { Plugin } from 'vite'
import { projects, activities, audioGear } from '../components/works/works-data'

const ORIGIN = 'https://my-profile-jura69.vercel.app'

/**
 * Build-time sitemap generator. Routes derive from the same works-data arrays
 * the pages render, so listing/detail additions can never drift out of the
 * sitemap again. Redirect-only and 404 routes are deliberately excluded.
 * Emitted through the bundle (no node:fs) so dist stays the single output path.
 */
export default function sitemapPlugin(): Plugin {
    return {
        name: 'generate-sitemap',
        apply: 'build',
        generateBundle() {
            const routes = [
                '/',
                '/works',
                '/activities',
                '/audiophile',
                ...projects.map(p => `/works/${p.id}`),
                ...activities.map(a => `/activities/${a.id}`),
                ...audioGear.map(g => `/audiophile/${g.id}`)
            ]
            const lastmod = new Date().toISOString().slice(0, 10)
            const urls = routes
                .map(route => `  <url>\n    <loc>${ORIGIN}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
                .join('\n')
            const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
        }
    }
}
