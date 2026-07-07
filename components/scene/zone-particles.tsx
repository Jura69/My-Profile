import { memo, useMemo } from 'react'

interface ParticleSpec {
    id: number
    x: number
    y: number
    size: number
    delay: number
    duration: number
}

function generate(count: number, sizeBase: number, sizeVar: number): ParticleSpec[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: sizeBase + Math.random() * sizeVar,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 6
    }))
}

function isCoarsePointer() {
    return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
}

/**
 * Zone-scoped ambient particles (≤15 nodes total, fewer on touch devices):
 * golden pollen for the dawn zone, fireflies for the night zone. Group
 * visibility multipliers --dawn-a / --night-a are scroll-driven by
 * ambient-scene, and fully-hidden groups are display:none'd via data attrs
 * on the scene root ([data-dawn="off"], [data-night="off"]).
 */
const ZoneParticles = memo(function ZoneParticles() {
    const coarse = useMemo(isCoarsePointer, [])
    const pollen = useMemo(() => generate(coarse ? 5 : 8, 2, 2.5), [coarse])
    const fireflies = useMemo(() => generate(coarse ? 4 : 7, 2.5, 2), [coarse])

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Dawn pollen — warm golden dust drifting up */}
            <div className="scene-pollen absolute inset-0" style={{ opacity: 'var(--dawn-a, 1)' }}>
                {pollen.map(p => (
                    <span
                        key={p.id}
                        className="absolute rounded-full bg-ghibli-golden-dust motion-safe:animate-[scene-pollen-float_10s_ease-in-out_infinite]"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            opacity: 0.35,
                            boxShadow: `0 0 ${p.size * 2}px var(--color-ghibli-golden-dust)`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`
                        }}
                    />
                ))}
            </div>

            {/* Night fireflies — pulsing warm yellow, dark mode only */}
            <div className="scene-fireflies absolute inset-0" style={{ opacity: 'var(--night-a, 0)' }}>
                {fireflies.map(f => (
                    <span
                        key={f.id}
                        className="absolute rounded-full motion-safe:animate-[scene-firefly-drift_9s_ease-in-out_infinite]"
                        style={{
                            left: `${f.x}%`,
                            top: `${30 + (f.y * 0.7)}%`,
                            width: `${f.size}px`,
                            height: `${f.size}px`,
                            background: '#f6e05e',
                            boxShadow: '0 0 8px #f6e05e, 0 0 16px #f6e05e66',
                            animationDelay: `${f.delay}s`,
                            animationDuration: `${f.duration}s`
                        }}
                    />
                ))}
            </div>
        </div>
    )
})

export default ZoneParticles
