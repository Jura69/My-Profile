import { memo, useRef, useEffect, useCallback } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'

/**
 * Celestial Timelapse — Ghibli-style SVG sun/moon.
 *
 * ☀️ Light mode: Sun arcs along the RIGHT edge of the screen (away from content)
 * 🌙 Dark mode:  Fixed crescent moon arcs along the LEFT edge
 *
 * Both stay in the margin zones to never obstruct portfolio content.
 * PERFORMANCE: Direct DOM manipulation via refs for ZERO-LAG scroll tracking.
 */

interface CelestialTimelapseProps {
    progress: number // 0–1 scroll progress
}

// ══════════════════════════════════════════════════════════════════════
// SUN — arcs along the RIGHT margin, smaller & sharper
// ══════════════════════════════════════════════════════════════════════

function getSunArc(p: number): { x: number; y: number } {
    // Hugs the right edge: x stays between 88–96% (margin zone)
    const x = 92 + Math.sin(p * Math.PI) * 4
    // y: enters from top, arcs down to bottom
    const y = -10 + p * 110
    return { x, y }
}

function getSunOpacity(p: number): number {
    if (p < 0.12) return p / 0.12
    if (p > 0.88) return Math.max(0, 1 - (p - 0.88) / 0.12)
    return 0.85 // slightly transparent so content behind is never fully blocked
}

function getSunScale(p: number): number {
    // Compact — no dramatic scaling
    if (p < 0.1) return 0.7 + (p / 0.1) * 0.3
    return 1.0
}

function getSunColorIndex(p: number): number {
    if (p < 0.25) return 0
    if (p < 0.5) return 1
    if (p < 0.72) return 2
    if (p < 0.88) return 3
    return 4
}

// Refined, warm Ghibli palette — less saturated, more harmonious
const SUN_COLORS = [
    { core: '#FFFDE7', mid: '#FFE082', outer: '#FFD54F', ray: '#FFF8E1', glow: '#FFD600' },
    { core: '#FFF8E1', mid: '#FFCA28', outer: '#FFB300', ray: '#FFE082', glow: '#FFA000' },
    { core: '#FFF3E0', mid: '#FFB74D', outer: '#FF9800', ray: '#FFCC80', glow: '#F57C00' },
    { core: '#FBE9E7', mid: '#FF8A65', outer: '#E64A19', ray: '#FFAB91', glow: '#E64A19' },
    { core: '#FFCCBC', mid: '#E64A19', outer: '#BF360C', ray: '#FF7043', glow: '#BF360C' },
] as const

// ══════════════════════════════════════════════════════════════════════
// MOON — fixed crescent, arcs along the LEFT margin
// ══════════════════════════════════════════════════════════════════════

function getMoonArc(p: number): { x: number; y: number } {
    // Hugs the left edge: x stays between 4–12%
    const x = 8 - Math.sin(p * Math.PI) * 4
    // y: rises from bottom to top
    const y = 110 - p * 120
    return { x, y }
}

function getMoonOpacity(p: number): number {
    if (p < 0.08) return 0
    if (p < 0.25) return (p - 0.08) / 0.17
    return 0.8 // subtle so it doesn't compete with content
}

function getMoonScale(p: number): number {
    if (p < 0.15) return 0.6 + (p / 0.15) * 0.4
    return 1.0
}

// ── Inline SVG Components ──

function GhibliSunSVG({ colorIdx }: { colorIdx: number }) {
    const colors = SUN_COLORS[colorIdx]

    return (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="sun-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                </filter>
                <filter id="sun-soft" x="-15%" y="-15%" width="130%" height="130%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
                </filter>
                <radialGradient id="sun-core-grad" cx="38%" cy="38%">
                    <stop offset="0%" stopColor={colors.core} />
                    <stop offset="40%" stopColor={colors.mid} />
                    <stop offset="100%" stopColor={colors.outer} />
                </radialGradient>
                <radialGradient id="sun-halo-grad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor={colors.glow} stopOpacity="0.2" />
                    <stop offset="50%" stopColor={colors.glow} stopOpacity="0.05" />
                    <stop offset="100%" stopColor={colors.glow} stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Subtle halo */}
            <circle cx="36" cy="36" r="34" fill="url(#sun-halo-grad)" filter="url(#sun-glow)" />

            {/* Sharp rays — thin, crisp */}
            <g opacity="0.4" filter="url(#sun-soft)">
                {Array.from({ length: 8 }, (_, i) => {
                    const angle = i * 45 + 22.5  // offset for visual balance
                    const len = 14 + (i % 2 === 0 ? 2 : 0)
                    return (
                        <line
                            key={i}
                            x1="36" y1="36"
                            x2={36 + Math.cos((angle * Math.PI) / 180) * (12 + len)}
                            y2={36 + Math.sin((angle * Math.PI) / 180) * (12 + len)}
                            stroke={colors.ray}
                            strokeWidth={i % 2 === 0 ? 1.5 : 1}
                            strokeLinecap="round"
                            opacity={0.7 + (i % 2) * 0.2}
                        />
                    )
                })}
            </g>

            {/* Inner glow */}
            <circle cx="36" cy="36" r="14" fill={colors.glow} opacity="0.1" filter="url(#sun-glow)" />

            {/* Sun body — compact, sharp */}
            <circle cx="36" cy="36" r="10" fill="url(#sun-core-grad)" />

            {/* Specular highlight */}
            <circle cx="33" cy="33" r="4" fill="white" opacity="0.3" filter="url(#sun-soft)" />
        </svg>
    )
}

function GhibliMoonSVG({ glowIntensity }: { glowIntensity: number }) {
    // Fixed crescent — shadow stays constant
    const shadowCx = 72
    const shadowR = 14

    return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="moon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={4 + glowIntensity * 3} />
                </filter>
                <filter id="moon-soft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                </filter>
                <radialGradient id="moon-surface" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#F8F9FF" />
                    <stop offset="50%" stopColor="#E8EAF6" />
                    <stop offset="100%" stopColor="#C5CAE9" />
                </radialGradient>
                <radialGradient id="moon-halo" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#E8EAF6" stopOpacity={0.2 * glowIntensity} />
                    <stop offset="50%" stopColor="#C5CAE9" stopOpacity={0.06 * glowIntensity} />
                    <stop offset="100%" stopColor="#9FA8DA" stopOpacity="0" />
                </radialGradient>
                <mask id="crescent-mask">
                    <circle cx="32" cy="32" r="12" fill="white" />
                    <circle cx={shadowCx} cy={30} r={shadowR} fill="black" />
                </mask>
            </defs>

            {/* Ethereal halo */}
            <circle cx="32" cy="32" r="28" fill="url(#moon-halo)" filter="url(#moon-glow)" />

            {/* Moon body — fixed crescent */}
            <g mask="url(#crescent-mask)">
                <circle cx="32" cy="32" r="12" fill="url(#moon-surface)" />
                {/* Subtle craters */}
                <circle cx="28" cy="28" r="1.5" fill="#B0BEC5" opacity="0.15" filter="url(#moon-soft)" />
                <circle cx="26" cy="36" r="1" fill="#B0BEC5" opacity="0.12" filter="url(#moon-soft)" />
                <circle cx="30" cy="38" r="0.8" fill="#B0BEC5" opacity="0.1" filter="url(#moon-soft)" />
            </g>

            {/* Luminous rim */}
            <circle
                cx="32" cy="32" r="11.5"
                fill="none" stroke="#F5F5FF"
                strokeWidth="0.5"
                opacity={0.25 + glowIntensity * 0.2}
                mask="url(#crescent-mask)"
            />
        </svg>
    )
}

// ══════════════════════════════════════════════════════════════════════

const CelestialTimelapse = memo(function CelestialTimelapse({ progress }: CelestialTimelapseProps) {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    const sunRef = useRef<HTMLDivElement>(null)
    const moonRef = useRef<HTMLDivElement>(null)
    const prevColorIdxRef = useRef(-1)

    const sunColorIdx = getSunColorIndex(progress)
    const moonGlow = Math.min(1, progress * 1.2)

    // Direct DOM updates — ZERO React overhead
    const updatePositions = useCallback((p: number) => {
        if (!isDark && sunRef.current) {
            const pos = getSunArc(p)
            const scale = getSunScale(p)
            const opacity = getSunOpacity(p)
            sunRef.current.style.left = `${pos.x}%`
            sunRef.current.style.top = `${pos.y}%`
            sunRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`
            sunRef.current.style.opacity = `${opacity}`
        }
        if (isDark && moonRef.current) {
            const pos = getMoonArc(p)
            const scale = getMoonScale(p)
            const opacity = getMoonOpacity(p)
            moonRef.current.style.left = `${pos.x}%`
            moonRef.current.style.top = `${pos.y}%`
            moonRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`
            moonRef.current.style.opacity = `${opacity}`
        }
    }, [isDark])

    useEffect(() => {
        updatePositions(progress)
    }, [progress, updatePositions])

    const needsSunRender = !isDark && prevColorIdxRef.current !== sunColorIdx
    if (needsSunRender) prevColorIdxRef.current = sunColorIdx

    const sunOpacity = getSunOpacity(progress)
    const moonOpacity = getMoonOpacity(progress)

    return (
        <>
            <style>{`
        @keyframes sun-ray-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

            {/* ── ☀️ Sun — RIGHT margin ── */}
            {!isDark && sunOpacity > 0 && (
                <Box
                    ref={sunRef}
                    position="fixed"
                    pointerEvents="none"
                    zIndex={-1}
                    w="72px"
                    h="72px"
                    willChange="left, top, transform, opacity"
                >
                    <Box
                        position="absolute"
                        inset="0"
                        style={{ animation: 'sun-ray-rotate 60s linear infinite' }}
                    >
                        <GhibliSunSVG colorIdx={sunColorIdx} />
                    </Box>
                </Box>
            )}

            {/* ── 🌙 Moon — LEFT margin ── */}
            {isDark && moonOpacity > 0 && (
                <Box
                    ref={moonRef}
                    position="fixed"
                    pointerEvents="none"
                    zIndex={-1}
                    w="64px"
                    h="64px"
                    willChange="left, top, transform, opacity"
                >
                    <GhibliMoonSVG glowIntensity={moonGlow} />
                </Box>
            )}
        </>
    )
})

export default CelestialTimelapse
