import { Link as RouterLink } from 'react-router'
import { ArrowRight } from '../icons/kit-icons-interface'
import { cn } from '../../lib/cn'
import { type CardItem } from './works-data'

interface ProjectRowCardProps {
    project: CardItem
    /** Link target; defaults to the works detail page. */
    to?: string
    /** Small label above the title ("Previous", "Next"). */
    kicker?: string
    /** Previous-style card: a back arrow leads instead of the trailing forward arrow. */
    reverse?: boolean
    /** h3 inside a listing; span where the card is not part of the heading outline (pager). */
    titleAs?: 'h3' | 'span'
    className?: string
}

/**
 * Horizontal paper card: thumbnail, title, an optional 2-line blurb (gear has none) and an arrow.
 * The whole card is one link named by its title, so the thumbnail is decorative (alt="").
 * Used for the Works "More from…" lists and the detail-page previous/next pager.
 */
export default function ProjectRowCard({
    project,
    to,
    kicker,
    reverse,
    titleAs: Title = 'h3',
    className
}: ProjectRowCardProps) {
    return (
        <RouterLink
            to={to ?? `/works/${project.id}`}
            className={cn(
                'paper-grain group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface-elevated p-3 shadow-paper transition-shadow hover:shadow-paper-lift',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                reverse ? 'pr-4 pl-4' : 'pr-4',
                className
            )}
        >
            {reverse && (
                <ArrowRight
                    aria-hidden="true"
                    className="shrink-0 -scale-x-100 text-accent transition-transform duration-200 group-hover:-translate-x-0.5"
                />
            )}
            <img
                src={project.cover ? `${project.cover}-480.webp` : project.thumbnail}
                alt=""
                width={136}
                height={77}
                loading="lazy"
                decoding="async"
                className={cn(
                    'h-16 w-24 shrink-0 rounded-[10px] object-cover sm:h-[77px] sm:w-[136px]',
                    project.cover && 'dark:brightness-90'
                )}
            />
            <div className="min-w-0 flex-1">
                {kicker && <span className="eyebrow block text-ink-muted">{kicker}</span>}
                <Title className={cn('block font-rounded text-base leading-snug font-extrabold text-ink', kicker && 'mt-1')}>
                    {project.title}
                </Title>
                {project.description && (
                    <span className="mt-1 line-clamp-2 font-rounded text-sm leading-normal text-ink-muted">
                        {project.description}
                    </span>
                )}
            </div>
            {!reverse && (
                <ArrowRight
                    aria-hidden="true"
                    className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
                />
            )}
        </RouterLink>
    )
}
