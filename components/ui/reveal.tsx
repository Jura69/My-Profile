import { useLayoutEffect, useRef } from 'react'
import { animate, inView } from 'motion'
import { useHydrated } from '../../lib/use-hydrated'

type Easing = 'easeOut' | readonly [number, number, number, number]

interface RevealProps {
    children: React.ReactNode
    className?: string
    /** Seconds to wait before animating — use for stagger between siblings. */
    delay?: number
    /** Initial rise offset in px (contract: 12–16px). */
    y?: number
    /** Initial horizontal offset in px (journey cards slide in from the trail). */
    x?: number
    /** Seconds; UI reveals stay at 0.5, the journey's longer walk uses 0.8. */
    duration?: number
    ease?: Easing
    once?: boolean
}

/** Fires on any overlap once the element is ~12% above the viewport bottom — never on a
 *  fraction of its own height: a ratio can't be met by blocks taller than the viewport ÷
 *  ratio (the Works tab panel is ~3800px on phones), which left them invisible forever. */
const VIEWPORT_MARGIN = '0px 0px -12% 0px'

/**
 * Standard entrance reveal (fade + rise), fires when scrolled into view.
 *
 * The markup is a plain element with NO hidden initial style, so prerendered HTML, crawlers
 * and no-JS readers always get visible content. The hiding happens on mount, before paint:
 * - mounted by hydration and already on screen → left alone (it is already painted; hiding
 *   it would flash), below the fold → hidden until scrolled in, exactly like before;
 * - mounted by a client navigation → hidden, then revealed when in view.
 * Reduced motion never hides anything: content is static and simply there.
 */
export default function Reveal({
    children,
    className,
    delay = 0,
    y = 14,
    x = 0,
    duration = 0.5,
    ease = 'easeOut',
    once = true
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    // Value from this component's first render: false means the hydration pass mounted it.
    const mountedAfterHydration = useRef(useHydrated()).current

    useLayoutEffect(() => {
        const el = ref.current
        if (!el) return
        // Any visible pixel counts: hiding something the reader can already see would flash it
        const rect = el.getBoundingClientRect()
        const onScreen = rect.top < window.innerHeight && rect.bottom > 0
        if (!mountedAfterHydration && onScreen) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const hide = () => {
            el.style.opacity = '0'
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }
        hide()

        const stop = inView(
            el,
            () => {
                const settle = animate(
                    el,
                    { opacity: 1, transform: 'translate3d(0px, 0px, 0)' },
                    { duration, delay, ease }
                )
                // Drop the settled inline styles so each block does not keep its own GPU layer
                settle.then(() => {
                    if (el.style.opacity !== '1') return // stopped and re-hidden (once = false)
                    el.style.opacity = ''
                    el.style.transform = ''
                })
                if (once) {
                    stop()
                    return
                }
                return () => {
                    settle.stop()
                    hide()
                }
            },
            { margin: VIEWPORT_MARGIN, amount: 'some' }
        )
        return () => {
            stop()
            // Never leave content hidden behind if the element survives (StrictMode re-run)
            el.style.opacity = ''
            el.style.transform = ''
        }
        // Entrance config is read once at mount, like motion's initial/whileInView props were.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}
