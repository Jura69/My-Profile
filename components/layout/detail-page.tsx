import { memo } from 'react'
import { Link as RouterLink } from 'react-router'
import { IoChevronForward, IoOpenOutline } from 'react-icons/io5'
import Badge from '../ui/badge'
import { cn } from '../../lib/cn'

/**
 * Tailwind building blocks for detail pages (works / audiophile / activities),
 * replacing the old Chakra `detail-components.tsx` + emotion `paragraph.tsx`.
 * Pages swap imports + JSX wrappers; their text content stays the same.
 * Heading order per page: DetailTitle = h1, DetailHeading = h2.
 */

interface DetailTitleProps {
    parentPath: string
    parentLabel: string
    /** Optional year pill rendered next to the title (e.g. project year). */
    year?: string
    children: React.ReactNode
}

/** Breadcrumb (parent link › ) + page title as the page's single h1. */
export function DetailTitle({ parentPath, parentLabel, year, children }: DetailTitleProps) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-1 text-sm text-ink-muted">
                <RouterLink
                    to={parentPath}
                    className="text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                    {parentLabel}
                </RouterLink>
                <IoChevronForward aria-hidden="true" className="shrink-0" />
            </div>
            <h1 className="mt-1 flex flex-wrap items-center gap-2 font-rounded text-2xl font-bold text-ink">
                {children}
                {year && <Badge tone="accent">{year}</Badge>}
            </h1>
        </div>
    )
}

/** Sub-section heading within a detail page (h2). */
export function DetailHeading({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h2 className={cn('mt-8 mb-3 font-rounded text-lg font-bold text-ink', className)}>{children}</h2>
}

/** Body prose paragraph — left-aligned, ~68ch measure, muted ink. */
export function DetailProse({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn('mt-4 max-w-[68ch] font-rounded text-base leading-relaxed text-ink-muted', className)}>
            {children}
        </p>
    )
}

export interface MetaRow {
    label: string
    value: React.ReactNode
    /** `red` flags a status/warning row; defaults to the accent tone. */
    tone?: 'accent' | 'red'
}

/** Bordered label/value panel (Github, stack, specs…) with optional heading. */
export function DetailMeta({ title, rows }: { title?: string; rows: MetaRow[] }) {
    return (
        <>
            {title && <DetailHeading>{title}</DetailHeading>}
            <div className="mt-4 rounded-xl border border-line bg-surface-elevated/60 p-4">
                <ul className="m-0 flex list-none flex-col gap-2 pl-0">
                    {rows.map((row, i) => (
                        <li key={i} className="font-rounded text-sm text-ink">
                            <Badge tone={row.tone === 'red' ? 'neutral' : 'accent'} className="mr-2 align-middle">
                                {row.label}
                            </Badge>
                            <span className="align-middle">{row.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

/** External link with a trailing open-in-new icon (used inside meta rows). */
export function DetailLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
            {children}
            <IoOpenOutline aria-hidden="true" className="shrink-0" />
        </a>
    )
}

/** Rounded, lazy-loaded content image. width/height give a 4:3 space reservation
 *  (approximate — real ratios vary; the phase-6 image audit sizes them exactly). */
export const DetailImage = memo(({ src, alt }: { src: string; alt: string }) => (
    <div className="mt-4 overflow-hidden rounded-xl border border-line">
        <img src={src} alt={alt} width={800} height={600} loading="lazy" className="h-auto w-full" />
    </div>
))
