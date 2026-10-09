import { Fragment } from 'react'
import { Link as RouterLink } from 'react-router'

export interface Crumb {
    label: string
    /** Omit on the last crumb: it is the current page. */
    to?: string
}

/**
 * Breadcrumb trail: `<nav aria-label="Breadcrumb"><ol>`, the last item marked `aria-current="page"`.
 * The › separators are decorative list items hidden from assistive tech. Links are ≥ 32px tall.
 */
export default function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex list-none flex-wrap items-center gap-1.5 p-0 font-rounded text-sm font-semibold text-ink-muted">
                {items.map((item, i) => {
                    const last = i === items.length - 1
                    return (
                        <Fragment key={item.label}>
                            {i > 0 && <li aria-hidden="true">›</li>}
                            {last || !item.to ? (
                                <li aria-current={last ? 'page' : undefined} className="text-ink">
                                    {item.label}
                                </li>
                            ) : (
                                <li>
                                    <RouterLink
                                        to={item.to}
                                        className="inline-flex min-h-8 items-center rounded text-accent-on-sky underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                                    >
                                        {item.label}
                                    </RouterLink>
                                </li>
                            )}
                        </Fragment>
                    )
                })}
            </ol>
        </nav>
    )
}
