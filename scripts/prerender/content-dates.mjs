import { execFileSync } from 'node:child_process'

/**
 * Truthful "last modified" dates for the sitemap `lastmod` and the markdown twins'
 * "Last updated" line: the last commit touching the route's content sources. A shallow
 * clone (CI) or a missing git returns null and the date is omitted — never the build date,
 * which would claim every page changed on every deploy.
 */

const LISTING_SOURCES = {
    // Home shows the selected projects' titles, blurbs and covers from works-data
    '/': ['src/pages/index.tsx', 'components/home', 'components/works/works-data.ts'],
    '/works': ['src/pages/works.tsx', 'components/works/works-data.ts'],
    '/activities': ['src/pages/activities.tsx', 'components/works/works-data.ts'],
    '/audiophile': ['src/pages/audiophile.tsx', 'components/works/works-data.ts']
}

/** Source files whose edits change what a route shows. Detail pages own their prose. */
function sourcesFor(route) {
    return LISTING_SOURCES[route] ?? [`src/pages${route}.tsx`]
}

function git(args) {
    try {
        return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    } catch {
        return null
    }
}

let historyUsable
function hasFullHistory() {
    if (historyUsable === undefined) historyUsable = git(['rev-parse', '--is-shallow-repository']) === 'false'
    return historyUsable
}

/** `YYYY-MM-DD` of the last commit touching the route's sources, or null when unknowable. */
export function contentDateFor(route) {
    if (!hasFullHistory()) return null
    return git(['log', '-1', '--format=%cs', '--', ...sourcesFor(route)]) || null
}
