import { useId, type ReactNode } from 'react'
import Badge from '../ui/badge'
import Container from '../ui/container'
import { cn } from '../../lib/cn'

export interface FactRow {
    label: string
    value: ReactNode
    /** neutral: a status-style pill (e.g. "Under development"); accent (default): plain value. */
    tone?: 'accent' | 'neutral'
    /** Shown as pills instead of the value text (never both), e.g. the stack. */
    badges?: string[]
}

/** Short plain values sit two-up in the phone facts card; badges and long values take the row. */
const isWide = (fact: FactRow) =>
    !!fact.badges || fact.tone === 'neutral' || typeof fact.value !== 'string' || fact.value.length > 18

interface DetailBodyProps {
    facts: FactRow[]
    factsTitle: string
    children: ReactNode
}

/**
 * Detail page body: the prose column (<article>) beside a facts card (<aside>), 300px wide on lg.
 * DOM order is article then aside; on phones the aside is moved up visually for a quick scan
 * before the prose (the facts do not depend on the prose, so meaning is unchanged).
 * Each fact is a dt/dd pair; the sr-only ": " makes it read "Year: 2026" (and the markdown twin
 * renders the pair as "**Year:** 2026").
 */
export function DetailBody({ facts, factsTitle, children }: DetailBodyProps) {
    const titleId = useId()
    return (
        <Container size="page" className="pt-10 md:pt-16">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
                <article className="min-w-0">{children}</article>
                <aside
                    aria-labelledby={titleId}
                    className="order-first rounded-2xl border border-line bg-surface-elevated p-5 shadow-paper sm:p-6 lg:order-none"
                >
                    <h2 id={titleId} className="eyebrow text-accent">
                        {factsTitle}
                    </h2>
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3.5 lg:grid-cols-1 lg:gap-y-4">
                        {facts.map((fact, i) => {
                            const wide = isWide(fact)
                            return (
                                <div
                                    key={fact.label}
                                    className={cn(
                                        'min-w-0',
                                        wide && 'col-span-2 lg:col-span-1',
                                        i > 0 && wide && 'border-t border-line pt-3.5',
                                        i > 0 && 'lg:border-t lg:border-line lg:pt-4'
                                    )}
                                >
                                    <dt className="font-rounded text-[13px] font-bold text-ink-muted">
                                        {fact.label}
                                        <span className="sr-only">: </span>
                                    </dt>
                                    {fact.badges ? (
                                        <dd className="mt-2 flex flex-wrap gap-1.5">
                                            {fact.badges.map(badge => (
                                                <Badge key={badge} size="md">
                                                    {badge}
                                                </Badge>
                                            ))}
                                        </dd>
                                    ) : fact.tone === 'neutral' ? (
                                        <dd className="mt-1.5">
                                            <Badge tone="neutral" size="md">
                                                {fact.value}
                                            </Badge>
                                        </dd>
                                    ) : (
                                        <dd className="mt-1 font-rounded text-base leading-snug font-bold [overflow-wrap:anywhere] text-ink">
                                            {fact.value}
                                        </dd>
                                    )}
                                </div>
                            )
                        })}
                    </dl>
                </aside>
            </div>
        </Container>
    )
}
