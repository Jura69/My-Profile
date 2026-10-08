import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SceneContext } from './use-scene'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Root provider for the ambient scene system: owns the Lenis smooth-scroll
 * instance, keeps ScrollTrigger in sync with it, and handles route changes
 * (scroll reset + trigger refresh since page heights differ per route).
 */
export default function SceneProvider({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation()
    const lenisRef = useRef<Lenis | null>(null)
    const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion)

    // Follow OS/devtools changes to the reduced-motion preference at runtime
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])

    useEffect(() => {
        if (reducedMotion) return

        const lenis = new Lenis()
        lenisRef.current = lenis
        lenis.on('scroll', ScrollTrigger.update)

        // Drive Lenis from GSAP's ticker so both share one rAF loop
        const tick = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(tick)
            lenis.destroy()
            lenisRef.current = null
        }
    }, [reducedMotion])

    // Route change: jump to top before paint, then refresh triggers once the
    // new page has laid out (scroll distance depends on page height). Not on the
    // first run: the landing page is prerendered and may already be scrolled when
    // hydration mounts this provider — resetting it would yank the reader up.
    const landingPath = useRef<string | null>(pathname)
    useLayoutEffect(() => {
        if (landingPath.current === pathname) {
            const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
            return () => cancelAnimationFrame(raf)
        }
        landingPath.current = null
        const lenis = lenisRef.current
        if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true })
        } else {
            window.scrollTo({ top: 0 })
        }
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
        return () => cancelAnimationFrame(raf)
    }, [pathname])

    // Stable value: a context change above a not-yet-hydrated route boundary forces a client re-render
    const value = useMemo(() => ({ reducedMotion }), [reducedMotion])
    return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}
