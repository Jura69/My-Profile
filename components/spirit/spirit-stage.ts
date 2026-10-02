/**
 * Owner of the hero spirit's WebGL lifecycle (no React): renderer, render loop, observers, context
 * loss and teardown; the scene content lives in `spirit-scene.ts`. One stage = one WebGL context.
 *
 * Loop policy: `setAnimationLoop` runs only when the stage is compiled, motion is allowed, the host is
 * in the viewport AND the tab is visible. Reduced motion never loops — it renders one still frame on
 * mount and again on theme/size changes. Theme switches lerp the rig over ~0.6 s (instant when still)
 * while the spirit plays its day/night reaction.
 * Lifecycle: render only after the abortable compile poll settles (`compile-settle.ts`, 4 s cap); teardown
 * waits for the same settle before disposing GPU objects. Any WebGL failure (context lost, render throw)
 * calls `onFail` once → 2D illustration; a throw after the context exists tears it down, then rethrows.
 */
import * as THREE from 'three'
import { paintUniforms } from './painted-material'
import { settleCompile } from './compile-settle'
import { createSpiritScene } from './spirit-scene'

export interface SpiritStageOptions {
    dark: boolean
    reducedMotion: boolean
    /** First frame is on the canvas — safe to fade it in over the placeholder. */
    onReady: () => void
    /** The stage cannot render (context lost, render threw); show the 2D fallback. */
    onFail: () => void
}

const COMPILE_TIMEOUT_MS = 4000
const THEME_LERP_SECONDS = 0.6

/** Throws when WebGL2 is unavailable (three's renderer constructor) — callers fall back to 2D. */
export function createSpiritStage(container: HTMLElement, options: SpiritStageOptions) {
    const world = createSpiritScene()
    const { scene, camera } = world

    // Context last: everything above is CPU-only, so a throw there leaks no GPU state.
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.width = canvas.style.height = '100%'
    canvas.setAttribute('aria-hidden', 'true')
    container.appendChild(canvas)

    let target = options.dark ? 1 : 0
    let mix = target
    let reducedMotion = options.reducedMotion
    let compiled = false,
        disposed = false,
        lost = false,
        failed = false,
        inView = false,
        running = false
    world.setNight(mix)
    paintUniforms.uWind.value = reducedMotion ? 0 : 1

    const start = performance.now()
    const elapsed = () => (performance.now() - start) / 1000
    let last = 0

    const fail = () => {
        if (failed) return
        failed = true
        renderer.setAnimationLoop(null)
        running = false
        options.onFail()
    }
    const draw = (t: number, motion: number) => {
        try {
            world.animate(t, motion, renderer.getPixelRatio())
            renderer.render(scene, camera)
        } catch {
            fail()
        }
    }
    const frame = () => {
        const t = elapsed()
        const dt = Math.min(0.1, t - last)
        last = t
        if (mix !== target) {
            const step = dt / THEME_LERP_SECONDS
            mix = Math.abs(target - mix) <= step ? target : mix + Math.sign(target - mix) * step
            world.setNight(mix)
        }
        draw(t, 1)
    }
    /** Still frame: rest pose, no wind, current rig. */
    const drawStill = () => {
        if (compiled && !disposed && !failed) draw(0, 0)
    }
    const syncLoop = () => {
        const run =
            compiled && !disposed && !failed && !reducedMotion && inView && document.visibilityState === 'visible'
        if (run === running) return
        running = run
        last = elapsed()
        renderer.setAnimationLoop(run ? frame : null)
    }

    const resize = () => {
        const w = container.clientWidth,
            h = container.clientHeight
        if (!w || !h) return
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, w < 260 ? 2 : 1.5))
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        // setSize clears the backing store: repaint now or the next paint shows an empty cell.
        if (running) draw(elapsed(), 1)
        else if (reducedMotion) drawStill()
    }
    let settled: Promise<void>
    try {
        settled = settleCompile(renderer, scene, camera, COMPILE_TIMEOUT_MS, () => disposed || lost)
    } catch (error) {
        renderer.dispose()
        renderer.forceContextLoss()
        canvas.remove()
        throw error
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    const intersection = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting
        syncLoop()
    })
    intersection.observe(container)
    document.addEventListener('visibilitychange', syncLoop)
    const onContextLost = () => {
        lost = true
        fail()
    }
    canvas.addEventListener('webglcontextlost', onContextLost)

    void settled.then(() => {
        if (disposed || failed) return
        compiled = true
        if (reducedMotion) drawStill()
        else frame()
        if (failed) return
        options.onReady()
        syncLoop()
    })

    return {
        setDark(dark: boolean) {
            const next = dark ? 1 : 0
            if (next === target) return
            target = next
            if (running) {
                world.themeShift(elapsed(), dark)
                return // the loop lerps toward the new target
            }
            mix = target
            world.setNight(mix)
            if (reducedMotion) drawStill()
        },
        setReducedMotion(value: boolean) {
            reducedMotion = value
            paintUniforms.uWind.value = value ? 0 : 1
            syncLoop()
            if (value) {
                mix = target
                world.setNight(mix)
                drawStill()
            }
        },
        /** Pointer reaction; ignored while still (reduced motion) or before the first frame. */
        react() {
            if (running) world.react(elapsed())
        },
        /** True while the loop runs — lets the pointer handler skip layout reads when idle. */
        isRunning: () => running,
        /** Pointer position relative to the cell centre (−1..1 per axis, +y up); ignored while still. */
        lookAt(x: number, y: number) {
            if (running) world.lookAt(x, y, elapsed())
        },
        /** Idempotent: the React mount calls it on failure and again on unmount. */
        dispose() {
            if (disposed) return
            disposed = true
            renderer.setAnimationLoop(null)
            running = false
            resizeObserver.disconnect()
            intersection.disconnect()
            document.removeEventListener('visibilitychange', syncLoop)
            canvas.removeEventListener('webglcontextlost', onContextLost)
            canvas.remove()
            void settled.then(() => {
                world.dispose()
                renderer.dispose()
                if (!lost) renderer.forceContextLoss()
            })
        }
    }
}

export type SpiritStage = ReturnType<typeof createSpiritStage>
