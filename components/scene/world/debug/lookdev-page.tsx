/**
 * /__lookdev — dev-only look-dev page for the painted forest spike (route exists only when
 * SCENE_DEBUG). Full-screen canvas over the site, optional banner raster below for side-by-side
 * judgement, paper-grain CSS overlay, fps overlay and the capture contract.
 *
 * Query: preset=dawn|night · view=hero|spirit|tree|wide · shadow=0|1 · tm=none|aces · sky=banner|zone
 *        profile=desktop|mobile · compare=1 · light=off · motion=0 · dolly=1 · dpr=<n>
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createLookdevWorld } from './lookdev-scene'
import { installViewerContract } from './viewer-contract'
import { createFpsOverlay } from './fps-overlay'
import type { PresetName } from './lookdev-presets'

function readOptions() {
    const q = new URLSearchParams(window.location.search)
    const coarse = window.matchMedia('(pointer: coarse)').matches
    return {
        preset: (q.get('preset') === 'night' ? 'night' : 'dawn') as PresetName,
        view: q.get('view') ?? 'hero',
        shadows: q.get('shadow') === '1',
        aces: q.get('tm') === 'aces',
        skySource: q.get('sky') === 'zone' ? ('zone' as const) : ('banner' as const),
        profile: (q.get('profile') ?? (coarse ? 'mobile' : 'desktop')) as 'desktop' | 'mobile',
        compare: q.get('compare') === '1',
        lightOff: q.get('light') === 'off',
        motion: q.get('motion') === '0' ? 0 : 1,
        dolly: q.get('dolly') === '1',
        dpr: q.get('dpr') ? Number(q.get('dpr')) : null
    }
}

export default function LookdevPage() {
    const hostRef = useRef<HTMLDivElement>(null)
    const opts = useRef(readOptions()).current

    useEffect(() => {
        const host = hostRef.current
        if (!host) return
        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
        renderer.setPixelRatio(opts.dpr ?? Math.min(window.devicePixelRatio, opts.profile === 'mobile' ? 1 : 1.5))
        renderer.toneMapping = opts.aces ? THREE.ACESFilmicToneMapping : THREE.NoToneMapping
        renderer.toneMappingExposure = 1.05
        host.prepend(renderer.domElement)

        const world = createLookdevWorld(renderer, opts)
        world.applyPreset(opts.preset)
        if (opts.lightOff) world.setPracticalLights(false)
        const resize = () => {
            const { clientWidth: w, clientHeight: h } = host
            renderer.setSize(w, h)
            world.resize(w, h)
        }
        resize()
        world.setView(world.views.includes(opts.view) ? opts.view : 'hero')
        window.addEventListener('resize', resize)

        // Created after compile: a compile counted as one long frame would poison the first fps sample.
        let fps: ReturnType<typeof createFpsOverlay> | null = null
        const contract = installViewerContract({
            views: Object.fromEntries(world.views.map(v => [v, () => world.setView(v)])),
            state: world.state
        })
        // Extra presets reachable from the capture script without reloading.
        ;(window as unknown as Record<string, unknown>).__lookdev = {
            preset: (p: PresetName) => world.applyPreset(p),
            practicals: (on: boolean) => world.setPracticalLights(on)
        }

        let disposed = false
        const start = performance.now()
        // compileAsync keeps polling materials until ready: tearing down mid-compile (StrictMode,
        // fast route change) makes that poll throw. Dispose only once the compile has settled.
        const compiled = renderer.compileAsync(world.scene, world.camera).catch(() => undefined)
        compiled.then(() => {
            if (disposed) return
            fps = createFpsOverlay(renderer, host)
            renderer.setAnimationLoop(() => {
                const t = (performance.now() - start) / 1000
                if (opts.dolly) {
                    const k = (1 - Math.cos((t * Math.PI * 2) / 8)) / 2
                    world.camera.position.z = 12 - k * 9
                    world.camera.position.y = 1.5 + k * 1.2
                }
                world.update(t, opts.motion)
                renderer.render(world.scene, world.camera)
                fps?.tick()
            })
            requestAnimationFrame(() => requestAnimationFrame(() => contract.markReady()))
        })

        return () => {
            disposed = true
            renderer.setAnimationLoop(null)
            window.removeEventListener('resize', resize)
            contract.dispose()
            fps?.dispose()
            delete (window as unknown as Record<string, unknown>).__lookdev
            renderer.domElement.remove()
            void compiled.then(() => {
                world.dispose()
                renderer.dispose()
                renderer.forceContextLoss()
            })
        }
    }, [opts])

    const dark = opts.preset === 'night'
    return (
        <div className="fixed inset-0 z-[100] overflow-auto bg-[#1c1a16]">
            <div
                ref={hostRef}
                className="relative w-full"
                style={{ height: opts.compare ? 'calc(100vw / 3)' : '100vh' }}
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: `url('/images/ui/paper-grain-${dark ? 'dark' : 'light'}.webp') repeat`,
                        backgroundSize: '512px',
                        mixBlendMode: dark ? 'screen' : 'multiply',
                        opacity: dark ? 0.12 : 0.55
                    }}
                />
            </div>
            {opts.compare && (
                <img
                    src={`/images/banners/works-${dark ? 'night' : 'day'}-1600.webp`}
                    alt="Gouache banner reference"
                    className="block aspect-[3/1] w-full object-cover"
                />
            )}
        </div>
    )
}
