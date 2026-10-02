import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reports 0→1 progress of `ref` scrolling past a reading line, from the
 * ScrollTrigger already synced to Lenis — positions are cached on refresh, so
 * a scroll update does no layout reads, and Lenis provides the smoothing.
 * The callback runs outside React (write to the DOM, not state).
 *
 * GSAP is confined to components/scene/ per the animation-discipline contract;
 * this hook is the sanctioned bridge for a section to follow scroll.
 */
export function useScrollProgress(
    ref: RefObject<HTMLElement | null>,
    onProgress: (progress: number) => void,
    { start = 'top 62%', end = 'bottom 62%', enabled = true } = {}
) {
    // Latest callback without re-creating the trigger when it changes
    const cb = useRef(onProgress)
    cb.current = onProgress

    // Passive effect: a child's layout effect would run before the parent's ref is attached
    useEffect(() => {
        const el = ref.current
        if (!el || !enabled) return
        const trigger = ScrollTrigger.create({
            trigger: el,
            start,
            end,
            onUpdate: self => cb.current(self.progress),
            onRefresh: self => cb.current(self.progress)
        })
        cb.current(trigger.progress)
        return () => trigger.kill()
    }, [ref, start, end, enabled])
}
