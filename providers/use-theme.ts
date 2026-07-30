import { createContext, useContext } from 'react'

export type Mode = 'light' | 'dark'

export interface ThemeContextValue {
    mode: Mode
    toggle: () => void
}

/** Context object lives here (not in theme.tsx) so the provider file only
 *  exports a component and react-refresh can hot-swap it. */
export const ThemeContext = createContext<ThemeContextValue>({ mode: 'dark', toggle: () => {} })

/** Read/toggle the color theme. ThemeProvider owns the `.dark` class + persistence. */
export function useTheme() {
    return useContext(ThemeContext)
}
