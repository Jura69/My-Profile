import { memo, useEffect, useMemo, useState } from 'react'
import { paintCloud, type CloudKind, type CloudMasks } from './cloud-sprite'

interface CloudSpec {
    kind: CloudKind
    seed: number
    /** Resting position (vw from the left / vh from the top) — the reduced-motion frame. */
    x: number
    y: number
    /** Width in vw (never below 140px on phones). */
    w: number
    /** Seconds for one full crossing; far clouds are smaller, fainter and slower. */
    duration: number
    depth: number
}

// Upper sky only, so the clouds read as distant weather behind the hero spirit, not over the content.
const CLOUDS: CloudSpec[] = [
    { kind: 'cumulus', seed: 8, x: 4, y: 11, w: 26, duration: 230, depth: 0.95 },
    { kind: 'tower', seed: 31, x: 70, y: 12, w: 20, duration: 260, depth: 0.9 },
    { kind: 'stratus', seed: 88, x: 33, y: 6, w: 19, duration: 300, depth: 0.7 },
    { kind: 'stratus', seed: 41, x: 52, y: 31, w: 14, duration: 340, depth: 0.55 },
    { kind: 'cumulus', seed: 29, x: 86, y: 36, w: 15, duration: 320, depth: 0.6 }
]

// Drift runs from fully off-screen left to off-screen right (scene-cloud-drift keyframes).
const TRAVEL_START_VW = -40
const TRAVEL_VW = 145

function isCoarsePointer() {
    return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
}

/** Run after first paint so sprite painting never competes with the hero. */
function whenIdle(fn: () => void) {
    if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(fn, { timeout: 1500 })
        return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(fn, 200)
    return () => clearTimeout(id)
}

function maskStyle(url: string): React.CSSProperties {
    const image = `url(${url})`
    return { WebkitMaskImage: image, maskImage: image, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }
}

/**
 * Slow left→right cumulus drift (≤5 nodes, 3 on touch devices). Sprites are
 * painted procedurally once (cloud-sprite.ts) and shown as two masked flat
 * fills — --cloud-shade body under the --cloud-lit sunlit side — so the sky
 * recolors them on scroll for the cost of a fill. Each cloud starts
 * mid-crossing at its resting position via a negative animation delay, so the
 * reduced-motion still frame (motion-safe: gate) matches the first animated
 * frame. Colors, the sky opacity multiplier (--cloud-a) and the scroll sink of the
 * [data-scene="clouds"] layer are written by ambient-scene.
 */
const DriftingClouds = memo(function DriftingClouds() {
    const clouds = useMemo(() => (isCoarsePointer() ? CLOUDS.slice(0, 3) : CLOUDS), [])
    const [masks, setMasks] = useState<CloudMasks[] | null>(null)

    useEffect(() => {
        let cancelled = false
        let painted: CloudMasks[] = []
        const cancelIdle = whenIdle(() => {
            Promise.all(clouds.map(c => paintCloud(c.kind, c.seed)))
                .then(result => {
                    painted = result
                    if (cancelled) result.forEach(m => [m.body, m.lit].forEach(u => URL.revokeObjectURL(u)))
                    else setMasks(result)
                })
                // Decorative layer: a failed paint just leaves the sky clear
                .catch(() => {})
        })
        return () => {
            cancelled = true
            cancelIdle()
            painted.forEach(m => [m.body, m.lit].forEach(u => URL.revokeObjectURL(u)))
        }
    }, [clouds])

    return (
        <div
            data-scene="clouds"
            // No group opacity (it would add a render surface over the masked layers): the
            // sky multiplier is folded into each cloud's own opacity instead
            className={`absolute inset-0 will-change-transform ${masks ? 'motion-safe:animate-[scene-fade-in_1.5s_ease-out]' : ''}`}
        >
            {masks &&
                clouds.map((c, i) => {
                    const progress = (c.x - TRAVEL_START_VW) / TRAVEL_VW
                    return (
                        <div
                            key={c.seed}
                            className="absolute motion-safe:animate-[scene-cloud-drift_240s_linear_infinite]"
                            style={
                                {
                                    '--cx': `${c.x}vw`,
                                    left: `${c.x}vw`,
                                    top: `${c.y}vh`,
                                    width: `max(140px, ${c.w}vw)`,
                                    aspectRatio: masks[i].aspect,
                                    opacity: `calc(var(--cloud-a, 0.85) * ${c.depth})`,
                                    animationDuration: `${c.duration}s`,
                                    animationDelay: `${(-progress * c.duration).toFixed(1)}s`
                                } as React.CSSProperties
                            }
                        >
                            <div
                                className="absolute inset-0"
                                style={{ background: 'var(--cloud-shade, #d2d6e8)', ...maskStyle(masks[i].body) }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: 'var(--cloud-lit, #fbf7ef)', ...maskStyle(masks[i].lit) }}
                            />
                        </div>
                    )
                })}
        </div>
    )
})

export default DriftingClouds
