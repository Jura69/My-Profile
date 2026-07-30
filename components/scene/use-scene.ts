import { createContext, useContext } from 'react'

export interface SceneContextValue {
    /** True when the user prefers reduced motion — scene renders static, Lenis stays off. */
    reducedMotion: boolean
}

/** Context object lives here (not in scene-provider.tsx) so the provider file
 *  only exports a component and react-refresh can hot-swap it. */
export const SceneContext = createContext<SceneContextValue>({ reducedMotion: false })

export function useScene() {
    return useContext(SceneContext)
}
