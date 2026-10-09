import { memo } from 'react'
import { ExternalLink } from '../icons/kit-icons-interface'
import { cn } from '../../lib/cn'

/**
 * Prose building blocks for detail pages (works / audiophile / activities), used inside
 * DetailBody (detail-layout.tsx) under a PageHeader. Heading order per page: the PageHeader
 * title = h1, DetailHeading = h2.
 */

/** Sub-section heading within a detail page (h2). The first one in the article has no top gap. */
export function DetailHeading({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h2 className={cn('mt-12 font-rounded text-2xl leading-tight font-extrabold text-ink first:mt-0', className)}>
            {children}
        </h2>
    )
}

/** Body prose paragraph — left-aligned, ~68ch measure, muted ink. */
export function DetailProse({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn('mt-3.5 max-w-[68ch] font-rounded text-[17px] leading-[1.75] text-ink-muted', className)}>
            {children}
        </p>
    )
}

/** External link with a trailing open-in-new icon (used as a fact value). */
export function DetailLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
            {children}
            <ExternalLink aria-hidden="true" className="shrink-0" />
        </a>
    )
}

/** Rounded, lazy-loaded content image in a <figure>. width/height give a 4:3 space reservation
 *  (approximate — real ratios vary). */
export const DetailImage = memo(({ src, alt }: { src: string; alt: string }) => (
    <figure className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface-sunken">
        <img src={src} alt={alt} width={800} height={600} loading="lazy" className="block h-auto w-full" />
    </figure>
))
