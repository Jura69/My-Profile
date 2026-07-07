import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Mode = 'light' | 'dark'

interface ThemeContextValue {
    mode: Mode
    toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({ mode: 'dark', toggle: () => {} })

/** Read/toggle the color theme. Provider owns the `.dark` class + persistence. */
export function useTheme() {
    return useContext(ThemeContext)
}

/** localStorage key. Old Chakra key is read once for migration. */
const STORAGE_KEY = 'theme'
const LEGACY_KEY = 'chakra-ui-color-mode'

function readInitialMode(): Mode {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY)
    return stored === 'light' ? 'light' : 'dark'
}

/**
 * Standalone theme provider (replaces Chakra colorMode). Mirrors the mode onto
 * the `.dark` class on <html> so Tailwind `dark:` variants follow, and persists
 * to localStorage. The inline script in index.html applies the class pre-paint
 * to avoid a flash; this provider keeps it in sync at runtime.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Mode>(readInitialMode)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', mode === 'dark')
        localStorage.setItem(STORAGE_KEY, mode)
    }, [mode])

    const toggle = useCallback(() => setMode(m => (m === 'dark' ? 'light' : 'dark')), [])

    return <ThemeContext.Provider value={{ mode, toggle }}>{children}</ThemeContext.Provider>
}
