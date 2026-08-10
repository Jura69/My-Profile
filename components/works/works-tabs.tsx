import { useId, useRef, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { cn } from '../../lib/cn'

export type WorksTabId = 'enterprise' | 'personal'

/** Enterprise leads — it is the deeper body of work, so it opens by default. */
const TABS: { id: WorksTabId; label: string }[] = [
    { id: 'enterprise', label: 'Enterprise @ Creasia' },
    { id: 'personal', label: 'Personal Projects' }
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
 * every project in the DOM for crawlers (this is a client-rendered SPA) while
 * lazy images inside a hidden panel still skip their fetch until it is shown.
 */
export default function WorksTabs({ panels }: { panels: Record<WorksTabId, ReactNode> }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const active = parseTab(searchParams.get('tab'))
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
                className="inline-flex gap-1 rounded-xl border border-line bg-surface-elevated p-1"
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
                                'h-9 cursor-pointer rounded-lg px-4 font-rounded text-sm font-semibold transition-colors',
                                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                                isActive
                                    ? 'bg-accent text-surface'
                                    : 'text-ink-muted hover:bg-accent/10 hover:text-accent'
                            )}
                        >
                            {tab.label}
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
