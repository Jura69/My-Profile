/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** '1' keeps the scene debug surface (lookdev route, capture contract, fps overlay) in a build. */
    readonly VITE_SCENE_DEBUG?: string
}
