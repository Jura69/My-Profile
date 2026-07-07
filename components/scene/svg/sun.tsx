/**
 * Ghibli-style sun, ported from the legacy celestial-timelapse.
 * Tintable via CSS vars set by ambient-scene as the day progresses:
 * --sun-core, --sun-mid, --sun-outer, --sun-ray, --sun-glow.
 */
export default function SunSvg() {
    return (
        <svg width="88" height="88" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <filter id="scene-sun-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                </filter>
                <filter id="scene-sun-soft" x="-15%" y="-15%" width="130%" height="130%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
                </filter>
                <radialGradient id="scene-sun-core-grad" cx="38%" cy="38%">
                    <stop offset="0%" style={{ stopColor: 'var(--sun-core, #fffde7)' }} />
                    <stop offset="40%" style={{ stopColor: 'var(--sun-mid, #ffe082)' }} />
                    <stop offset="100%" style={{ stopColor: 'var(--sun-outer, #ffd54f)' }} />
                </radialGradient>
                <radialGradient id="scene-sun-halo-grad" cx="50%" cy="50%">
                    <stop offset="0%" style={{ stopColor: 'var(--sun-glow, #ffd600)' }} stopOpacity="0.2" />
                    <stop offset="50%" style={{ stopColor: 'var(--sun-glow, #ffd600)' }} stopOpacity="0.05" />
                    <stop offset="100%" style={{ stopColor: 'var(--sun-glow, #ffd600)' }} stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Subtle halo */}
            <circle cx="36" cy="36" r="34" fill="url(#scene-sun-halo-grad)" filter="url(#scene-sun-glow)" />

            {/* Thin crisp rays */}
            <g opacity="0.4" filter="url(#scene-sun-soft)">
                {Array.from({ length: 8 }, (_, i) => {
                    const angle = i * 45 + 22.5
                    const len = 14 + (i % 2 === 0 ? 2 : 0)
                    return (
                        <line
                            key={i}
                            x1="36"
                            y1="36"
                            x2={36 + Math.cos((angle * Math.PI) / 180) * (12 + len)}
                            y2={36 + Math.sin((angle * Math.PI) / 180) * (12 + len)}
                            style={{ stroke: 'var(--sun-ray, #fff8e1)' }}
                            strokeWidth={i % 2 === 0 ? 1.5 : 1}
                            strokeLinecap="round"
                            opacity={0.7 + (i % 2) * 0.2}
                        />
                    )
                })}
            </g>

            {/* Inner glow + body + highlight */}
            <circle cx="36" cy="36" r="14" style={{ fill: 'var(--sun-glow, #ffd600)' }} opacity="0.1" filter="url(#scene-sun-glow)" />
            <circle cx="36" cy="36" r="10" fill="url(#scene-sun-core-grad)" />
            <circle cx="33" cy="33" r="4" fill="white" opacity="0.3" filter="url(#scene-sun-soft)" />
        </svg>
    )
}
