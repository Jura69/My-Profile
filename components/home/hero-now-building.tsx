import { Link as RouterLink } from 'react-router'
import { ArrowRight } from '../icons/kit-icons-interface'
import { cn } from '../../lib/cn'
import { findProject } from '../works/works-data'

const project = findProject('ai-center')

/**
 * "Now building" card in the hero: the current flagship as one paper card linking to its page.
 * The thumbnail stays lazy (it is decoration next to the LCP text, never the LCP itself).
 */
export default function HeroNowBuilding({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <RouterLink
            to={`/works/${project.id}`}
            style={style}
            className={cn(
                'paper-grain group flex max-w-[22rem] items-center gap-3 rounded-2xl border border-line bg-surface-elevated py-2.5 pr-4 pl-2.5 shadow-paper-lift transition-transform duration-200 hover:-translate-y-0.5',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                className
            )}
        >
            <img
                src={`${project.cover}-480.webp`}
                alt=""
                width={76}
                height={52}
                loading="lazy"
                decoding="async"
                className="h-[52px] w-[76px] shrink-0 rounded-[10px] object-cover dark:brightness-90"
            />
            <span className="min-w-0 flex-1">
                <span className="eyebrow flex items-center gap-1.5 text-[11px] text-accent">
                    <span
                        aria-hidden="true"
                        className="size-2 rounded-full bg-ghibli-golden-dust shadow-[0_0_0_4px_rgb(212_168_83/0.25)] dark:shadow-[0_0_0_4px_rgb(212_168_83/0.3),0_0_12px_3px_rgb(241_217_153/0.6)]"
                    />
                    Now building
                </span>
                <span className="mt-0.5 block font-rounded text-base font-extrabold text-ink">{project.title}</span>
                <span className="block font-rounded text-[13px] text-ink-muted">Enterprise AI agent platform</span>
            </span>
            <ArrowRight
                aria-hidden="true"
                className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
            />
        </RouterLink>
    )
}
