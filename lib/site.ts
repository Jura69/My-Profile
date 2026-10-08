/** Production origin: canonical URLs, sitemap, OG images, markdown twins and llms.txt. */
export const SITE_ORIGIN = 'https://my-profile-jura69.vercel.app'

export const SITE_NAME = 'Trương Tuấn Lộc Portfolio'

/** Markdown twin URL path for a route: `/` → `/index.md`, `/works` → `/works.md`. */
export function markdownPathFor(route: string) {
    return route === '/' ? '/index.md' : `${route}.md`
}
