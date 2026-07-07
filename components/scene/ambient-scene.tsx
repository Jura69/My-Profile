import { memo, useRef } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useScene } from './scene-provider'
import { getInterpolatedZone, lerpColor, lerp, clamp01, dawnAlpha, nightAlpha } from './zone-data'
import CelestialArc from './celestial-arc'
import ParallaxHills from './parallax-hills'
import Stars from './stars'
import ZoneParticles from './zone-particles'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface SunStop {
    at: number
    core: string
    mid: string
    outer: string
    ray: string
    glow: string
}

/** Sun tint stops across its 0→0.55 arc (warm morning → red sunset). */
const SUN_STOPS: SunStop[] = [
    { at: 0.0, core: '#FFFDE7', mid: '#FFE082', outer: '#FFD54F', ray: '#FFF8E1', glow: '#FFD600' },
    { at: 0.14, core: '#FFF8E1', mid: '#FFCA28', outer: '#FFB300', ray: '#FFE082', glow: '#FFA000' },
    { at: 0.28, core: '#FFF3E0', mid: '#FFB74D', outer: '#FF9800', ray: '#FFCC80', glow: '#F57C00' },
    { at: 0.42, core: '#FBE9E7', mid: '#FF8A65', outer: '#E64A19', ray: '#FFAB91', glow: '#E64A19' },
    { at: 0.55, core: '#FFCCBC', mid: '#E64A19', outer: '#BF360C', ray: '#FF7043', glow: '#BF360C' }
]

const SUN_END = 0.58
const MOON_START = 0.58

const HILL_COLORS = {
    light: { back: '#cfe3cf', front: '#9fc49f', tree: '#6a9c6a', shade: '#7d95a8' },
    dark: { back: '#16203a', front: '#0f1830', tree: '#0b1226', shade: '#04060d' }
} as const

function sunColors(t: number) {
    let lower = SUN_STOPS[0]
    let upper = SUN_STOPS[SUN_STOPS.length - 1]
    for (let i = 0; i < SUN_STOPS.length - 1; i++) {
        if (t >= SUN_STOPS[i].at) {
            lower = SUN_STOPS[i]
            upper = SUN_STOPS[i + 1]
        }
    }
    const range = upper.at - lower.at
    const k = range > 0 ? clamp01((t - lower.at) / range) : 0
    return {
        core: lerpColor(lower.core, upper.core, k),
        mid: lerpColor(lower.mid, upper.mid, k),
        outer: lerpColor(lower.outer, upper.outer, k),
        ray: lerpColor(lower.ray, upper.ray, k),
        glow: lerpColor(lower.glow, upper.glow, k)
    }
}

/**
 * Fixed background scene orchestrator. One ScrollTrigger drives the whole
 * day→night narrative by writing CSS custom properties and transforms
 * directly to the DOM — no React state, zero re-renders on scroll.
 * GSAP lives only inside components/scene/ (animation discipline contract).
 */
const AmbientScene = memo(function AmbientScene() {
    const rootRef = useRef<HTMLDivElement>(null)
    const { reducedMotion } = useScene()
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    useGSAP(
        () => {
            const root = rootRef.current
            if (!root) return

            const sunEl = root.querySelector<HTMLElement>('[data-scene="sun"]')
            const moonEl = root.querySelector<HTMLElement>('[data-scene="moon"]')
            const hillsBack = root.querySelector<HTMLElement>('[data-scene="hills-back"]')
            const hillsFront = root.querySelector<HTMLElement>('[data-scene="hills-front"]')
            const setVar = (name: string, value: string) => root.style.setProperty(name, value)

            const apply = (p: number) => {
                const zone = getInterpolatedZone(p, isDark)
                setVar('--sky-top', zone.skyTop)
                setVar('--sky-bottom', zone.skyBottom)
                setVar('--star-o', zone.starOpacity.toFixed(3))

                const dawn = dawnAlpha(p)
                const night = nightAlpha(p, isDark)
                setVar('--dawn-a', dawn.toFixed(3))
                setVar('--night-a', night.toFixed(3))
                root.dataset.stars = isDark && zone.starOpacity > 0.01 ? 'on' : 'off'
                root.dataset.dawn = dawn > 0.01 ? 'on' : 'off'
                root.dataset.night = night > 0.01 ? 'on' : 'off'

                // Sun: rises left, peaks, sets right across the first ~55% of scroll
                if (sunEl) {
                    const t = clamp01(p / 0.55)
                    const x = 12 + t * 76
                    const y = 78 - Math.sin(t * Math.PI) * 58
                    const scale = 0.8 + Math.sin(t * Math.PI) * 0.25
                    const fadeIn = clamp01(p / 0.04)
                    const fadeOut = 1 - clamp01((p - 0.5) / (SUN_END - 0.5))
                    sunEl.style.transform = `translate(-50%, -50%) translate(${x}vw, ${y}vh) scale(${scale.toFixed(3)})`
                    sunEl.style.opacity = (0.85 * Math.min(fadeIn, fadeOut)).toFixed(3)
                    const c = sunColors(t)
                    setVar('--sun-core', c.core)
                    setVar('--sun-mid', c.mid)
                    setVar('--sun-outer', c.outer)
                    setVar('--sun-ray', c.ray)
                    setVar('--sun-glow', c.glow)
                }

                // Moon: rises on the right through the night zone
                if (moonEl) {
                    const t = clamp01((p - MOON_START) / (1 - MOON_START))
                    const x = 84 - t * 14
                    const y = 92 - t * 62
                    const scale = 0.7 + t * 0.3
                    moonEl.style.transform = `translate(-50%, -50%) translate(${x}vw, ${y}vh) scale(${scale.toFixed(3)})`
                    moonEl.style.opacity = (0.9 * clamp01((p - MOON_START) / 0.1)).toFixed(3)
                    setVar('--moon-glow-o', (0.4 + t * 0.6).toFixed(3))
                }

                // Hills: shade toward night and sink slightly for parallax depth
                const hc = HILL_COLORS[isDark ? 'dark' : 'light']
                const shadeT = p * 0.35
                setVar('--hill-back', lerpColor(hc.back, hc.shade, shadeT))
                setVar('--hill-front', lerpColor(hc.front, hc.shade, shadeT * 0.8))
                setVar('--hill-tree', lerpColor(hc.tree, hc.shade, shadeT * 0.6))
                if (hillsBack) hillsBack.style.transform = `translateY(${lerp(0, 34, p).toFixed(2)}%)`
                if (hillsFront) hillsFront.style.transform = `translateY(${lerp(0, 62, p).toFixed(2)}%)`
            }

            if (reducedMotion) {
                // Static mid-morning composition; CSS keyframes are off via motion-safe
                apply(0.18)
                return
            }

            apply(0)
            const trigger = ScrollTrigger.create({
                start: 0,
                end: 'max',
                onUpdate: self => apply(self.progress)
            })
            return () => trigger.kill()
        },
        { scope: rootRef, dependencies: [isDark, reducedMotion], revertOnUpdate: true }
    )

    return (
        <div
            ref={rootRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, var(--sky-top, #e8f4f8), var(--sky-bottom, #f5f0e8))' }}
            />
            <Stars />
            <CelestialArc />
            <ParallaxHills />
            <ZoneParticles />
        </div>
    )
})

export default AmbientScene
