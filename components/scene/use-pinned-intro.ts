import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScene } from './use-scene'

gsap.registerPlugin(ScrollTrigger)

/**
 * Pins an element briefly (~half a viewport) as the content below scrolls up
 * into view — the single pinned "moment" of the homepage (Experience intro).
 *
 * No-op when the user prefers reduced motion OR is on a coarse (touch) pointer:
 * the element stays in normal flow and the section falls back to plain reveals.
 * `pinSpacing` reserves the pinned distance so nothing shifts (CLS guard).
 *
 * GSAP is confined to components/scene/ per the animation-discipline contract;
 * this hook is the sanctioned bridge for a section to request a pin.
 */
export function usePinnedIntro<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const { reducedMotion } = useScene()

    useLayoutEffect(() => {
        const el = ref.current
        if (!el || reducedMotion) return
        if (window.matchMedia('(pointer: coarse)').matches) return

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 22%',
                end: () => '+=' + Math.round(window.innerHeight * 0.5),
                pin: true,
                pinSpacing: true,
                anticipatePin: 1
            })
        }, el)

        return () => ctx.revert()
    }, [reducedMotion])

    return ref
}
