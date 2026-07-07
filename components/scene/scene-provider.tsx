import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SceneContextValue {
    /** True when the user prefers reduced motion — scene renders static, Lenis stays off. */
    reducedMotion: boolean
}

const SceneContext = createContext<SceneContextValue>({ reducedMotion: false })

export function useScene() {
    return useContext(SceneContext)
}

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
    // new page has laid out (scroll distance depends on page height).
    useLayoutEffect(() => {
        const lenis = lenisRef.current
        if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true })
        } else {
            window.scrollTo({ top: 0 })
        }
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
        return () => cancelAnimationFrame(raf)
    }, [pathname])

    return <SceneContext.Provider value={{ reducedMotion }}>{children}</SceneContext.Provider>
}
