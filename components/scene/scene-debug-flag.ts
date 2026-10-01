/**
 * Single gate for the scene debug surface (/__lookdev, capture contract, fps overlay, tier override).
 * Statically false in a normal production build, so every branch behind it tree-shakes away.
 * Lives outside `world/` on purpose: app code imports it eagerly, and `world/` is a lazy chunk.
 */
export const SCENE_DEBUG = import.meta.env.DEV || import.meta.env.VITE_SCENE_DEBUG === '1'
