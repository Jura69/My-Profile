/* eslint-disable react-refresh/only-export-components -- build-time server entry, never hot-reloaded */
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import { AppShell } from './app'

export { listSiteRoutes } from '../lib/site-routes'
export { SITE_ORIGIN, SITE_NAME, markdownPathFor } from '../lib/site'

/**
 * Build-time render of one route to an HTML string (scripts/prerender-routes.mjs).
 * `prerender` waits for every lazy route chunk and Suspense boundary, so the
 * output is the complete page. The tree mirrors src/main.tsx (StrictMode → router →
 * AppShell) so the browser can hydrate it without a mismatch.
 *
 * `progressiveChunkSize: Infinity` keeps every Suspense boundary inline. By default Fizz
 * outlines big boundaries into a hidden <div> swapped in by an inline script, which leaves
 * crawlers and no-JS readers with an empty <main>.
 */
export async function render(url: string): Promise<string> {
    const { prelude } = await prerender(
        <StrictMode>
            <StaticRouter location={url}>
                <AppShell />
            </StaticRouter>
        </StrictMode>,
        { progressiveChunkSize: Number.POSITIVE_INFINITY }
    )
    return new Response(prelude).text()
}
