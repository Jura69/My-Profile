import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { useScene } from '../scene/use-scene'
import { useScrollProgress } from '../scene/use-scroll-progress'

/** Milestone markers inside the container opt in with this attribute; the trail sets data-lit on them. */
export const JOURNEY_NODE_ATTR = 'data-journey-node'

const SAMPLES = 240
const DESKTOP_QUERY = '(min-width: 768px)'

interface Geometry {
    height: number
    /** Path sampled at SAMPLES+1 even lengths; y is monotonic, so x can be looked up by y. */
    xs: Float32Array
    ys: Float32Array
    nodes: HTMLElement[]
    nodeYs: number[]
}

/**
 * Meandering trail through the milestone centres: each segment bulges sideways
 * (alternating) within the trail's lane, like a footpath through the forest. Control points stay vertically between
 * their endpoints, so y is monotonic along the path — the reveal relies on it.
 */
function trailPath(points: { x: number; y: number }[], amp: number) {
    let d = `M${points[0].x},${points[0].y}`
    for (let k = 1; k < points.length; k++) {
        const a = points[k - 1],
            b = points[k]
        const dy = b.y - a.y
        // Short runs (e.g. from the list top to the first milestone) bend less, so they never loop
        const bend = Math.min(amp, Math.abs(dy) * 0.35)
        // The run-out below the last milestone barely bends, so the trail settles instead of hooking
        const s = (k % 2 === 0 ? 1 : -1) * (k === points.length - 1 ? 0.35 : 1)
        d += ` C${a.x + s * bend},${a.y + dy * 0.34} ${b.x + s * bend},${b.y - dy * 0.34} ${b.x},${b.y}`
    }
    return d
}

/**
 * Scroll-drawn trail for the journey timeline, rendered behind the milestone
 * markers of `containerRef`. A seed lantern (the Mầm Đèn motif) walks the path
 * at the reading line; the trail above it is inked in and every milestone it
 * reaches lights up.
 *
 * Per-frame work is compositor-only: the inked path is revealed by a clipping
 * box sliding up while its SVG slides down by the same amount, and the lantern
 * is an HTML layer moved with translate3d — nothing repaints while scrolling
 * (a stroke-dashoffset reveal repainted the whole trail + cards every frame).
 * No React state either. Reduced motion: fully inked, all milestones lit, no lantern.
 */
export default function JourneyTrail({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
    const { reducedMotion } = useScene()
    const baseSvgRef = useRef<SVGSVGElement>(null)
    const baseRef = useRef<SVGPathElement>(null)
    const clipRef = useRef<HTMLDivElement>(null)
    const inkSvgRef = useRef<SVGSVGElement>(null)
    const inkRef = useRef<SVGPathElement>(null)
    const lanternRef = useRef<HTMLDivElement>(null)
    const geo = useRef<Geometry | null>(null)
    const lastY = useRef(-1)
    const progress = useRef(0)

    const update = useCallback(
        (p: number) => {
            progress.current = p
            const g = geo.current,
                clip = clipRef.current,
                inkSvg = inkSvgRef.current,
                lantern = lanternRef.current
            if (!g || !clip || !inkSvg || !lantern) return
            const y = (reducedMotion ? 1 : Math.min(1, Math.max(0, p))) * g.height
            // Sub-pixel spring tail: nothing visible changes, skip the writes
            if (Math.abs(y - lastY.current) < 0.25) return
            lastY.current = y

            // Binary search the samples for the trail's x at this y
            let lo = 0,
                hi = SAMPLES
            while (lo < hi) {
                const mid = (lo + hi) >> 1
                if (g.ys[mid] < y) lo = mid + 1
                else hi = mid
            }
            const j = Math.max(1, lo)
            const span = g.ys[j] - g.ys[j - 1]
            const t = span > 0 ? Math.min(1, Math.max(0, (y - g.ys[j - 1]) / span)) : 1
            const x = g.xs[j - 1] + (g.xs[j] - g.xs[j - 1]) * t

            const cut = g.height - y
            clip.style.transform = `translate3d(0, ${-cut}px, 0)`
            inkSvg.style.transform = `translate3d(0, ${cut}px, 0)`
            lantern.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
            lantern.style.opacity = reducedMotion ? '0' : '1'
            g.nodes.forEach((node, i) => {
                const lit = y >= g.nodeYs[i] - 1 ? 'true' : 'false'
                if (node.dataset.lit !== lit) node.dataset.lit = lit
            })
        },
        [reducedMotion]
    )

    useEffect(() => {
        const container = containerRef.current
        const baseSvg = baseSvgRef.current,
            base = baseRef.current,
            clip = clipRef.current,
            inkSvg = inkSvgRef.current,
            ink = inkRef.current
        if (!container || !baseSvg || !base || !clip || !inkSvg || !ink) return

        const measure = () => {
            const box = container.getBoundingClientRect()
            const nodeEls = [...container.querySelectorAll<HTMLElement>(`[${JOURNEY_NODE_ATTR}]`)]
            const nodes = nodeEls.map(n => {
                const r = n.getBoundingClientRect()
                return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
            })
            if (nodes.length === 0) return
            const points = [{ x: nodes[0].x, y: 0 }, ...nodes, { x: nodes[nodes.length - 1].x, y: box.height }]
            const amp = window.matchMedia(DESKTOP_QUERY).matches ? 32 : 10
            const d = trailPath(points, amp)

            for (const svg of [baseSvg, inkSvg]) {
                svg.setAttribute('width', `${box.width}`)
                svg.setAttribute('height', `${box.height}`)
                svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`)
            }
            clip.style.height = `${box.height}px`
            base.setAttribute('d', d)
            ink.setAttribute('d', d)

            const total = ink.getTotalLength()
            const xs = new Float32Array(SAMPLES + 1)
            const ys = new Float32Array(SAMPLES + 1)
            for (let j = 0; j <= SAMPLES; j++) {
                const pt = ink.getPointAtLength((j / SAMPLES) * total)
                xs[j] = pt.x
                ys[j] = pt.y
            }
            geo.current = { height: box.height, xs, ys, nodes: nodeEls, nodeYs: nodes.map(n => n.y) }
            lastY.current = -1
            update(progress.current)
        }

        measure()
        // Card text reflow, font swaps and breakpoint changes all move the milestones
        const ro = new ResizeObserver(measure)
        ro.observe(container)
        return () => ro.disconnect()
    }, [containerRef, update])

    // Progress 0 when the list top reaches the reading line (62% down the viewport), 1 when its end
    // does. Lenis already smooths the scroll, so the lantern follows it directly.
    useScrollProgress(containerRef, update, { enabled: !reducedMotion })

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {/* Untrodden trail: a dotted footpath (static — never repainted on scroll) */}
            <svg ref={baseSvgRef} className="absolute inset-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                <path
                    ref={baseRef}
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="0.5 9"
                    className="stroke-ink-subtle/60"
                />
            </svg>
            {/* Walked trail: clip box slides up, the inked SVG slides down by the same amount */}
            <div ref={clipRef} className="absolute inset-x-0 top-0 overflow-hidden will-change-transform">
                <svg ref={inkSvgRef} className="block overflow-visible will-change-transform">
                    <path ref={inkRef} fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-accent" />
                </svg>
            </div>
            {/* Seed lantern: soft halo, warm bulb, little moss cap */}
            <div
                ref={lanternRef}
                className="absolute top-0 left-0 opacity-0 transition-opacity duration-400 will-change-transform"
            >
                <span className="absolute size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-ghibli-golden-dust)_70%,transparent)_0%,color-mix(in_srgb,var(--color-ghibli-golden-dust)_25%,transparent)_40%,transparent_70%)]" />
                <span className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff8e1_0_22%,var(--color-ghibli-golden-dust)_48%)]" />
                <span className="absolute h-1 w-2 -translate-x-1/2 -translate-y-[11px] rounded-sm bg-accent" />
            </div>
        </div>
    )
}
