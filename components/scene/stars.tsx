import { memo, useMemo } from 'react'

interface Star {
    id: number
    x: number
    y: number
    size: number
    delay: number
}

function generateStars(count: number): Star[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 5
    }))
}

/**
 * Twinkling star field. Overall visibility is driven by --star-o (0–1) which
 * ambient-scene animates with scroll; the wrapper is display:none'd via
 * [data-stars="off"] on the scene root so hidden stars cost nothing.
 */
const Stars = memo(function Stars() {
    const stars = useMemo(() => generateStars(48), [])

    return (
        <div className="scene-stars absolute inset-0 overflow-hidden" style={{ opacity: 'var(--star-o, 0)' }}>
            {stars.map(s => (
                <span
                    key={s.id}
                    className="absolute rounded-full bg-white motion-safe:animate-[scene-star-twinkle_4s_ease-in-out_infinite]"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${3 + s.delay}s`
                    }}
                />
            ))}
        </div>
    )
})

export default Stars
