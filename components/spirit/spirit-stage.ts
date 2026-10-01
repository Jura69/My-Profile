/**
 * Owner of the hero spirit's WebGL stage (no React): renderer, camera, light rig, render loop,
 * observers, context loss and teardown. One stage = one WebGL context.
 *
 * Loop policy: `setAnimationLoop` runs only when the stage is compiled, motion is allowed, the host is
 * in the viewport AND the tab is visible. Reduced motion never loops — it renders one still frame on
 * mount and again on theme/size changes. Theme switches lerp the rig over ~0.6 s (instant when still).
 * Lifecycle: render only after `compileAsync` settles (or a 4 s timeout — a failed compile poll never
 * rejects); teardown waits for the same settle before disposing, since tearing down mid-compile makes
 * the poll throw. Any WebGL failure (context lost, render throw) calls `onFail` once → 2D illustration.
 */
import * as THREE from 'three'
import { createForestSpirit } from './forest-spirit'
import { createMossIsland, ISLAND_TOP } from './moss-island'
import { paintUniforms } from './painted-material'
import { createSpiritLighting } from './spirit-lighting'

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
/** Three-quarter hero framing: spirit + island fill ~80 % of the square cell. */
const CAMERA = { fov: 28, azimuth: -14, elevation: 11, distance: 4.7, target: new THREE.Vector3(0.04, 0.5, 0) }

/** Throws when WebGL2 is unavailable (three's renderer constructor) — callers fall back to 2D. */
export function createSpiritStage(container: HTMLElement, options: SpiritStageOptions) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.width = canvas.style.height = '100%'
    canvas.setAttribute('aria-hidden', 'true')
    container.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(CAMERA.fov, 1, 0.1, 30)
    const az = THREE.MathUtils.degToRad(CAMERA.azimuth),
        el = THREE.MathUtils.degToRad(CAMERA.elevation)
    camera.position
        .set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el))
        .multiplyScalar(CAMERA.distance)
        .add(CAMERA.target)
    camera.lookAt(CAMERA.target)

    const spirit = createForestSpirit()
    spirit.group.position.y = ISLAND_TOP
    const island = createMossIsland()
    scene.add(island.group, spirit.group)
    const lighting = createSpiritLighting(scene, spirit)

    let target = options.dark ? 1 : 0
    let mix = target
    let reducedMotion = options.reducedMotion
    let compiled = false,
        disposed = false,
        lost = false,
        failed = false,
        inView = false,
        running = false
    lighting.apply(mix)
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
            paintUniforms.uTime.value = t
            spirit.update(t, motion)
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
            lighting.apply(mix)
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
        if (reducedMotion) drawStill()
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

    const settled = Promise.race([
        renderer.compileAsync(scene, camera).then(
            () => undefined,
            () => undefined
        ),
        new Promise<void>(resolve => setTimeout(resolve, COMPILE_TIMEOUT_MS))
    ])
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
            target = dark ? 1 : 0
            if (running) return // the loop lerps toward the new target
            mix = target
            lighting.apply(mix)
            if (reducedMotion) drawStill()
        },
        setReducedMotion(value: boolean) {
            reducedMotion = value
            paintUniforms.uWind.value = value ? 0 : 1
            syncLoop()
            if (value) {
                mix = target
                lighting.apply(mix)
                drawStill()
            }
        },
        /** Pointer reaction; ignored while still (reduced motion) or before the first frame. */
        react() {
            if (running) spirit.react(elapsed())
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
                spirit.dispose()
                island.dispose()
                renderer.dispose()
                if (!lost) renderer.forceContextLoss()
            })
        }
    }
}

export type SpiritStage = ReturnType<typeof createSpiritStage>
