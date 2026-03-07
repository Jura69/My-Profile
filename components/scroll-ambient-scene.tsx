import { useEffect, useRef, memo, useMemo, useState, useCallback } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import CelestialTimelapse from './celestial-timelapse'

/**
 * Scroll-reactive ambient background scene with smooth color interpolation.
 *
 * - CSS gradient sky with hex-lerp for seamless transitions
 * - CSS-based ambient particles
 * - Twinkling stars (dark mode, contact zone)
 * - Celestial timelapse (sun/moon arc)
 */

// ── Hex color interpolation ──────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace('#', '')
    return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
    ]
}

function rgbToHex(r: number, g: number, b: number): string {
    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
    return '#' + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('')
}

function lerpColor(c1: string, c2: string, t: number): string {
    const [r1, g1, b1] = hexToRgb(c1)
    const [r2, g2, b2] = hexToRgb(c2)
    return rgbToHex(
        r1 + (r2 - r1) * t,
        g1 + (g2 - g1) * t,
        b1 + (b2 - b1) * t,
    )
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

// ── Zone definitions ─────────────────────────────────────────────────
interface ZoneStyle {
    skyTop: string
    skyBottom: string
    particleColor: string
    particleOpacity: number
    starOpacity: number
}

function getInterpolatedZone(progress: number, isDark: boolean): ZoneStyle {
    const zones: { at: number; style: ZoneStyle }[] = isDark
        ? [
            { at: 0.00, style: { skyTop: '#0a0e1a', skyBottom: '#0f1b2d', particleColor: '#4fd1c5', particleOpacity: 0.4, starOpacity: 0.15 } },
            { at: 0.15, style: { skyTop: '#0d1f3c', skyBottom: '#1a2a4a', particleColor: '#f6e05e', particleOpacity: 0.35, starOpacity: 0.05 } },
            { at: 0.30, style: { skyTop: '#1a2332', skyBottom: '#1a2e3a', particleColor: '#63b3ed', particleOpacity: 0.3, starOpacity: 0.0 } },
            { at: 0.50, style: { skyTop: '#1a1a2e', skyBottom: '#2d1b30', particleColor: '#ed8936', particleOpacity: 0.3, starOpacity: 0.0 } },
            { at: 0.70, style: { skyTop: '#0f0f24', skyBottom: '#1a0d2b', particleColor: '#b794f4', particleOpacity: 0.4, starOpacity: 0.3 } },
            { at: 0.90, style: { skyTop: '#08081a', skyBottom: '#0c0c24', particleColor: '#d6bcfa', particleOpacity: 0.5, starOpacity: 0.9 } },
        ]
        : [
            { at: 0.00, style: { skyTop: '#e8f4f8', skyBottom: '#f5f0e8', particleColor: '#319795', particleOpacity: 0.12, starOpacity: 0.0 } },
            { at: 0.15, style: { skyTop: '#fef5e7', skyBottom: '#fff8f0', particleColor: '#d69e2e', particleOpacity: 0.10, starOpacity: 0.0 } },
            { at: 0.30, style: { skyTop: '#ebf8ff', skyBottom: '#f0fff4', particleColor: '#3182ce', particleOpacity: 0.12, starOpacity: 0.0 } },
            { at: 0.50, style: { skyTop: '#fffaf0', skyBottom: '#fefcbf', particleColor: '#c05621', particleOpacity: 0.10, starOpacity: 0.0 } },
            { at: 0.70, style: { skyTop: '#faf5ff', skyBottom: '#e9d8fd', particleColor: '#805ad5', particleOpacity: 0.12, starOpacity: 0.0 } },
            { at: 0.90, style: { skyTop: '#edf2f7', skyBottom: '#e2e8f0', particleColor: '#718096', particleOpacity: 0.08, starOpacity: 0.0 } },
        ]

    // Find bounding zones
    let lowerIdx = 0
    for (let i = 0; i < zones.length - 1; i++) {
        if (progress >= zones[i].at) lowerIdx = i
    }
    const upperIdx = Math.min(lowerIdx + 1, zones.length - 1)

    if (lowerIdx === upperIdx) return zones[lowerIdx].style

    const lower = zones[lowerIdx]
    const upper = zones[upperIdx]
    const range = upper.at - lower.at
    const rawT = range > 0 ? (progress - lower.at) / range : 0
    // Smoothstep for easing
    const t = rawT * rawT * (3 - 2 * rawT)

    return {
        skyTop: lerpColor(lower.style.skyTop, upper.style.skyTop, t),
        skyBottom: lerpColor(lower.style.skyBottom, upper.style.skyBottom, t),
        particleColor: lerpColor(lower.style.particleColor, upper.style.particleColor, t),
        particleOpacity: lerp(lower.style.particleOpacity, upper.style.particleOpacity, t),
        starOpacity: lerp(lower.style.starOpacity, upper.style.starOpacity, t),
    }
}

// ── Particle generation ──────────────────────────────────────────────
interface Particle {
    id: number
    x: number
    y: number
    size: number
    animDelay: number
    animDuration: number
}

function generateParticles(count: number): Particle[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        animDelay: Math.random() * 8,
        animDuration: Math.random() * 6 + 8,
    }))
}

// ── Stars generation ─────────────────────────────────────────────────
interface Star {
    id: number
    x: number
    y: number
    size: number
    twinkleDelay: number
}

function generateStars(count: number): Star[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        twinkleDelay: Math.random() * 5,
    }))
}

// ── Component ────────────────────────────────────────────────────────
const ScrollAmbientScene = memo(function ScrollAmbientScene() {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const [scrollProgress, setScrollProgress] = useState(0)
    const rafRef = useRef(0)
    const lastProgressRef = useRef(-1)

    const particles = useMemo(() => generateParticles(30), [])
    const stars = useMemo(() => generateStars(60), [])

    // Smoothly interpolated zone based on exact scroll progress
    const zone = useMemo(() => getInterpolatedZone(scrollProgress, isDark), [scrollProgress, isDark])

    useEffect(() => {
        const onScroll = () => {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight
                const progress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0

                // Fine-grained updates for smooth celestial movement
                if (Math.abs(progress - lastProgressRef.current) > 0.003) {
                    lastProgressRef.current = progress
                    setScrollProgress(progress)
                }
            })
        }

        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('scroll', onScroll)
        }
    }, [isDark])

    return (
        <>
            {/* Inject keyframes once */}
            <style>{`
        @keyframes ambient-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--p-opacity); }
          25% { transform: translate(8px, -12px) scale(1.1); opacity: calc(var(--p-opacity) * 1.3); }
          50% { transform: translate(-5px, -20px) scale(0.9); opacity: var(--p-opacity); }
          75% { transform: translate(10px, -8px) scale(1.05); opacity: calc(var(--p-opacity) * 0.7); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

            {/* Sky gradient — now with continuous interpolated colors */}
            <Box
                position="fixed"
                top={0}
                left={0}
                w="100vw"
                h="100vh"
                zIndex={-2}
                pointerEvents="none"
                bg={`linear-gradient(to bottom, ${zone.skyTop}, ${zone.skyBottom})`}
            />

            {/* Celestial timelapse */}
            <CelestialTimelapse progress={scrollProgress} />

            {/* Floating particles */}
            <Box
                position="fixed"
                top={0}
                left={0}
                w="100vw"
                h="100vh"
                zIndex={-1}
                pointerEvents="none"
                overflow="hidden"
            >
                {particles.map(p => (
                    <Box
                        key={p.id}
                        position="absolute"
                        left={`${p.x}%`}
                        top={`${p.y}%`}
                        w={`${p.size}px`}
                        h={`${p.size}px`}
                        borderRadius="full"
                        bg={zone.particleColor}
                        transition="background-color 0.5s ease"
                        style={{
                            '--p-opacity': String(zone.particleOpacity),
                            animation: `ambient-float ${p.animDuration}s ${p.animDelay}s ease-in-out infinite`,
                            boxShadow: `0 0 ${p.size * 2}px ${zone.particleColor}`,
                        } as React.CSSProperties}
                    />
                ))}

                {/* Stars (visible in dark mode when starOpacity > 0) */}
                {isDark && zone.starOpacity > 0.01 && stars.map(s => (
                    <Box
                        key={`star-${s.id}`}
                        position="absolute"
                        left={`${s.x}%`}
                        top={`${s.y}%`}
                        w={`${s.size}px`}
                        h={`${s.size}px`}
                        borderRadius="full"
                        bg="white"
                        opacity={zone.starOpacity}
                        style={{
                            animation: `star-twinkle ${3 + s.twinkleDelay}s ${s.twinkleDelay}s ease-in-out infinite`,
                        }}
                    />
                ))}
            </Box>
        </>
    )
})

export default ScrollAmbientScene
