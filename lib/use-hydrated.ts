import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * False while rendering on the server (build-time prerender) and during the client's
 * hydration pass, true on every render after that — and on a plain client render (dev).
 *
 * Use it to keep the first client render identical to the prerendered HTML for state the
 * server cannot know (stored theme, OS motion preference, query string, random decor).
 * React only patches attributes on real updates, never on a hydration mismatch, so such
 * values must switch in AFTER hydration, which this hook schedules for free.
 */
export function useHydrated() {
    return useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    )
}
