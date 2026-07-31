import { memo, useRef } from 'react'
import { useTheme } from '../../providers/use-theme'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useScene } from './use-scene'
import { getInterpolatedZone, lerpColor, lerp, clamp01, dawnAlpha, nightAlpha } from './zone-data'
import CelestialArc from './celestial-arc'
import ParallaxHills from './parallax-hills'
import Stars from './stars'
import ZoneParticles from './zone-particles'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const MOON_START = 0.58

const HILL_COLORS = {
    light: { back: '#cfe3cf', front: '#9fc49f', tree: '#6a9c6a', shade: '#7d95a8' },
    dark: { back: '#16203a', front: '#0f1830', tree: '#0b1226', shade: '#04060d' }
} as const

/**
 * Fixed background scene orchestrator. One ScrollTrigger drives the whole
 * day→night narrative by writing CSS custom properties and transforms
 * directly to the DOM — no React state, zero re-renders on scroll.
 * GSAP lives only inside components/scene/ (animation discipline contract).
 */
const AmbientScene = memo(function AmbientScene() {
    const rootRef = useRef<HTMLDivElement>(null)
    const { reducedMotion } = useScene()
    const { mode } = useTheme()
    const isDark = mode === 'dark'

    useGSAP(
        () => {
            const root = rootRef.current
            if (!root) return

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
                root.dataset.day = night > 0.99 ? 'off' : 'on'

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
        <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, var(--sky-top, #e8f4f8), var(--sky-bottom, #f5f0e8))'
                }}
            />
            <Stars />
            <CelestialArc />
            <ParallaxHills />
            <ZoneParticles />
        </div>
    )
})

export default AmbientScene
