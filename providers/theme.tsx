import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ThemeContext, type Mode } from './use-theme'

/** localStorage key. Old Chakra key is read once for migration. */
const STORAGE_KEY = 'theme'
const LEGACY_KEY = 'chakra-ui-color-mode'

/** Mode the build-time prerender renders with (no window). The pre-paint script in index.html
 *  sets the real `.dark` class, so CSS-driven colors are right from the first frame. */
const SERVER_MODE: Mode = 'light'

/** MUST stay logic-identical with the pre-paint inline script in index.html,
 *  or first paint and hydrated state disagree (flash of the wrong theme). */
function readInitialMode(): Mode {
    if (typeof window === 'undefined') return SERVER_MODE
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY)
    if (stored === 'light') return 'light'
    if (stored === 'dark') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function hasStoredPreference() {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(STORAGE_KEY) !== null || localStorage.getItem(LEGACY_KEY) !== null
}

/**
 * Standalone theme provider (replaces Chakra colorMode). Mirrors the mode onto
 * the `.dark` class on <html> so Tailwind `dark:` variants follow, and persists
 * to localStorage. The inline script in index.html applies the class pre-paint
 * to avoid a flash; this provider keeps it in sync at runtime.
 *
 * Hydration contract: the context always carries the REAL mode and its value only changes
 * when the mode does. A context change above a lazy route's Suspense boundary that has not
 * hydrated yet makes React drop the prerendered HTML and client-render it, so nothing here
 * may flip right after hydration. Consumers whose MARKUP depends on the mode must either
 * style both themes with CSS `dark:` variants (ThemeToggle) or gate the value with
 * `useHydrated()` (PageBanner); effects may use it directly.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Mode>(readInitialMode)
    // Persist only explicit choices (stored key or a toggle click). Writing the
    // OS-derived value on mount would freeze a first visit's scheme forever and
    // stop new visitors from following prefers-color-scheme on later visits.
    const explicitChoice = useRef(hasStoredPreference())

    useEffect(() => {
        document.documentElement.classList.toggle('dark', mode === 'dark')
        if (explicitChoice.current) localStorage.setItem(STORAGE_KEY, mode)
    }, [mode])

    const toggle = useCallback(() => {
        explicitChoice.current = true
        setMode(m => (m === 'dark' ? 'light' : 'dark'))
    }, [])

    const value = useMemo(() => ({ mode, toggle }), [mode, toggle])
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
