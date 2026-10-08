import { projects, activities, audioGear } from '../components/works/works-data'

/**
 * Every indexable route, in reading order (home, listings, then details). The sitemap,
 * the build-time prerender and llms.txt all derive from this list, which itself derives
 * from the same works-data arrays the pages render — a new project cannot drift out.
 * Redirect-only and 404 routes are deliberately excluded.
 */
export function listSiteRoutes(): string[] {
    return [
        '/',
        '/works',
        ...projects.map(p => `/works/${p.id}`),
        '/activities',
        ...activities.map(a => `/activities/${a.id}`),
        '/audiophile',
        ...audioGear.map(g => `/audiophile/${g.id}`)
    ]
}
