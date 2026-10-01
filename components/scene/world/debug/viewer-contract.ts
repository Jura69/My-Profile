/**
 * Capture contract for automated inspection (dev / VITE_SCENE_DEBUG only).
 * `window.__viewer.setView(name)` SNAPS the camera/state (never tweens) so a screenshot can never
 * land mid-transition; `window.__sceneReady` flips true after shaders compiled and a frame presented.
 */

export interface ViewerApi {
    views: Record<string, () => void>
    state?: () => Record<string, unknown>
}

declare global {
    interface Window {
        __sceneReady?: boolean
        __viewer?: { views: string[]; setView(name: string): void; state(): Record<string, unknown> }
    }
}

export function installViewerContract(api: ViewerApi) {
    window.__sceneReady = false
    window.__viewer = {
        views: Object.keys(api.views),
        setView(name) {
            const view = api.views[name]
            if (!view) throw new Error(`unknown view "${name}" (have: ${Object.keys(api.views).join(', ')})`)
            view()
        },
        state: () => api.state?.() ?? {}
    }
    return {
        markReady() {
            window.__sceneReady = true
        },
        dispose() {
            delete window.__viewer
            delete window.__sceneReady
        }
    }
}
