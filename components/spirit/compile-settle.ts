/**
 * Abortable stand-in for `renderer.compileAsync`. three's version polls every 10 ms with no way to
 * stop it: after a context loss `program.isReady()` never turns true, and once the stage disposes its
 * materials the next poll reads a missing `currentProgram` and throws an uncaught TypeError.
 * This poll resolves when every program is ready, when `timeoutMs` passes, or as soon as `aborted()`
 * reports the stage is gone — so teardown can always wait for it. `renderer.compile` may throw
 * synchronously; callers treat that as a failed stage.
 */
import type * as THREE from 'three'

export function settleCompile(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    timeoutMs: number,
    aborted: () => boolean
): Promise<void> {
    const pending = renderer.compile(scene, camera)
    const deadline = performance.now() + timeoutMs
    return new Promise(resolve => {
        const poll = () => {
            if (aborted() || performance.now() > deadline) return resolve()
            for (const material of pending) {
                // Internal per-material record (typed `unknown`); same field three's compileAsync reads.
                const props = renderer.properties.get(material) as { currentProgram?: { isReady(): boolean } }
                if (props.currentProgram?.isReady()) pending.delete(material)
            }
            if (pending.size === 0) resolve()
            else setTimeout(poll, 10)
        }
        poll()
    })
}
