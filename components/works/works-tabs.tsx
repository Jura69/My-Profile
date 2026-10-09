import { useId, useRef, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { cn } from '../../lib/cn'
import { useHydrated } from '../../lib/use-hydrated'
import { projectsInCategory } from './works-data'

export type WorksTabId = 'enterprise' | 'personal'

/** Enterprise leads — it is the deeper body of work, so it opens by default. */
const TABS: { id: WorksTabId; label: string; count: number }[] = [
    { id: 'enterprise', label: 'Enterprise', count: projectsInCategory('enterprise').length },
    { id: 'personal', label: 'Personal', count: projectsInCategory('personal').length }
]

const DEFAULT_TAB: WorksTabId = 'enterprise'

/** Anything that is not a known tab id (typo, stale link) falls back to Enterprise. */
function parseTab(value: string | null): WorksTabId {
    return TABS.some(tab => tab.id === value) ? (value as WorksTabId) : DEFAULT_TAB
}

/**
 * Segmented-pill tabs for the Works listing, following the WAI-ARIA tabs pattern
 * with automatic activation (arrow keys both move focus and switch panel).
 *
 * The active tab lives in the URL (`/works?tab=personal`) so a tab is shareable
 * and the browser Back button steps between them; the default tab keeps `/works`
 * clean by dropping the param entirely.
 *
 * Both panels stay mounted and the inactive one is only `hidden`, which keeps
 * every project in the prerendered HTML for crawlers while
 * lazy images inside a hidden panel still skip their fetch until it is shown.
 *
 * Each tab shows its project count as a decorative pill; screen readers and the markdown twin
 * get it from the sr-only text instead ("Enterprise (12 projects)").
 */
export default function WorksTabs({ panels }: { panels: Record<WorksTabId, ReactNode> }) {
    const [searchParams, setSearchParams] = useSearchParams()
    // The prerender has no query string: hydrate on the default tab, then apply ?tab=.
    const hydrated = useHydrated()
    const active = hydrated ? parseTab(searchParams.get('tab')) : DEFAULT_TAB
    const baseId = useId()
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

    const selectTab = (id: WorksTabId) => {
        const next = new URLSearchParams(searchParams)
        if (id === DEFAULT_TAB) next.delete('tab')
        else next.set('tab', id)
        setSearchParams(next, { preventScrollReset: true })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const current = TABS.findIndex(tab => tab.id === active)
        let nextIndex = -1

        if (event.key === 'ArrowRight') nextIndex = (current + 1) % TABS.length
        else if (event.key === 'ArrowLeft') nextIndex = (current - 1 + TABS.length) % TABS.length
        else if (event.key === 'Home') nextIndex = 0
        else if (event.key === 'End') nextIndex = TABS.length - 1
        else return

        event.preventDefault()
        const nextTab = TABS[nextIndex]
        selectTab(nextTab.id)
        tabRefs.current[nextTab.id]?.focus()
    }

    return (
        <>
            <div
                role="tablist"
                aria-label="Project categories"
                className="flex w-full gap-1 rounded-[14px] border border-line bg-surface-elevated p-1 sm:inline-flex sm:w-auto"
            >
                {TABS.map(tab => {
                    const isActive = tab.id === active
                    return (
                        <button
                            key={tab.id}
                            ref={node => {
                                tabRefs.current[tab.id] = node
                            }}
                            type="button"
                            role="tab"
                            id={`${baseId}-tab-${tab.id}`}
                            aria-selected={isActive}
                            aria-controls={`${baseId}-panel-${tab.id}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => selectTab(tab.id)}
                            onKeyDown={onKeyDown}
                            className={cn(
                                'inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-[18px] font-rounded text-[15px] font-bold transition-colors sm:flex-none',
                                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                                isActive
                                    ? 'bg-accent text-surface'
                                    : 'text-ink-muted hover:bg-accent/10 hover:text-accent'
                            )}
                        >
                            {tab.label}
                            <span
                                aria-hidden="true"
                                className={cn(
                                    'inline-grid h-[22px] min-w-6 place-items-center rounded-full px-1.5 text-xs',
                                    isActive ? 'bg-surface/20' : 'bg-ink/10'
                                )}
                            >
                                {tab.count}
                            </span>
                            <span className="sr-only"> ({tab.count} projects)</span>
                        </button>
                    )
                })}
            </div>

            {TABS.map(tab => (
                <div
                    key={tab.id}
                    role="tabpanel"
                    id={`${baseId}-panel-${tab.id}`}
                    aria-labelledby={`${baseId}-tab-${tab.id}`}
                    hidden={tab.id !== active}
                >
                    {panels[tab.id]}
                </div>
            ))}
        </>
    )
}
