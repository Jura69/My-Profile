import { Link as RouterLink } from 'react-router'
import { cn } from '../../lib/cn'
import { coverSrcSet, type Project } from './works-data'

type OverlaySize = 'flagship' | 'compact'

const sizeClasses: Record<OverlaySize, { card: string; body: string; title: string; blurb: string }> = {
    flagship: {
        card: 'min-h-[340px] lg:min-h-[520px]',
        body: 'px-6 pb-6 lg:px-8 lg:pb-8',
        title: 'text-[clamp(28px,3vw,38px)] leading-[1.1]',
        blurb: 'text-base'
    },
    compact: {
        card: 'min-h-[200px] lg:min-h-[248px]',
        body: 'px-5 pb-5 lg:px-[22px] lg:pb-[22px]',
        title: 'text-2xl leading-[1.15]',
        blurb: 'text-sm'
    }
}

interface OverlayProjectCardProps {
    project: Project
    size: OverlaySize
    className?: string
    /** `sizes` for the cover srcset — the card's rendered width per breakpoint. */
    sizes?: string
}

/**
 * Project card with the title on the painting (the banner overlay language): cover, `.cover-scrim`
 * text block, gold kicker, white H3, a 2-line blurb and, on flagships at lg, tech pills. The whole
 * card is one link named by its title, so the cover is decorative (alt="").
 */
export default function OverlayProjectCard({ project, size, className, sizes }: OverlayProjectCardProps) {
    const s = sizeClasses[size]
    return (
        <RouterLink
            to={`/works/${project.id}`}
            className={cn(
                'group relative flex flex-col justify-end overflow-hidden rounded-[20px] border border-line bg-surface-sunken shadow-paper transition-shadow hover:shadow-paper-lift',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                s.card,
                className
            )}
        >
            {project.cover && (
                <img
                    src={`${project.cover}-640.webp`}
                    srcSet={coverSrcSet(project.cover)}
                    sizes={sizes ?? (size === 'flagship' ? '(min-width:1024px) 644px, 100vw' : '(min-width:1024px) 368px, 100vw')}
                    alt=""
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] dark:brightness-90"
                />
            )}
            <div className={cn('cover-scrim relative pt-24', s.body)}>
                {project.kicker && <p className="eyebrow text-golden-dust-200">{project.kicker}</p>}
                <h3
                    className={cn(
                        'mt-2.5 font-rounded font-extrabold text-white [text-shadow:0_2px_12px_rgb(0_0_0/0.4)]',
                        s.title
                    )}
                >
                    {project.title}
                </h3>
                <p className={cn('mt-2.5 line-clamp-2 max-w-[48ch] font-rounded leading-[1.55] text-white/90', s.blurb)}>
                    {project.description}
                </p>
                {size === 'flagship' && project.tech && (
                    <ul className="mt-4 hidden list-none flex-wrap gap-1.5 p-0 lg:flex">
                        {project.tech.map(tag => (
                            <li
                                key={tag}
                                className="inline-flex h-[26px] items-center rounded-full border border-white/30 bg-white/15 px-2.5 font-rounded text-xs font-bold text-white"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </RouterLink>
    )
}
