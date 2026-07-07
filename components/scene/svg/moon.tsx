/**
 * Ghibli-style crescent moon, ported from the legacy celestial-timelapse.
 * Glow strength is driven by --moon-glow-o (0–1) set by ambient-scene.
 */
export default function MoonSvg() {
    return (
        <svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <filter id="scene-moon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                </filter>
                <filter id="scene-moon-soft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                </filter>
                <radialGradient id="scene-moon-surface" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#F8F9FF" />
                    <stop offset="50%" stopColor="#E8EAF6" />
                    <stop offset="100%" stopColor="#C5CAE9" />
                </radialGradient>
                <radialGradient id="scene-moon-halo" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#E8EAF6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#C5CAE9" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#9FA8DA" stopOpacity="0" />
                </radialGradient>
                <mask id="scene-moon-crescent">
                    <circle cx="32" cy="32" r="12" fill="white" />
                    <circle cx="72" cy="30" r="14" fill="black" />
                </mask>
            </defs>

            {/* Ethereal halo — strength follows the night */}
            <g style={{ opacity: 'var(--moon-glow-o, 0.6)' }}>
                <circle cx="32" cy="32" r="28" fill="url(#scene-moon-halo)" filter="url(#scene-moon-glow)" />
            </g>

            {/* Crescent body with subtle craters */}
            <g mask="url(#scene-moon-crescent)">
                <circle cx="32" cy="32" r="12" fill="url(#scene-moon-surface)" />
                <circle cx="28" cy="28" r="1.5" fill="#B0BEC5" opacity="0.15" filter="url(#scene-moon-soft)" />
                <circle cx="26" cy="36" r="1" fill="#B0BEC5" opacity="0.12" filter="url(#scene-moon-soft)" />
                <circle cx="30" cy="38" r="0.8" fill="#B0BEC5" opacity="0.1" filter="url(#scene-moon-soft)" />
            </g>

            {/* Luminous rim */}
            <circle cx="32" cy="32" r="11.5" fill="none" stroke="#F5F5FF" strokeWidth="0.5" opacity="0.35" mask="url(#scene-moon-crescent)" />
        </svg>
    )
}
