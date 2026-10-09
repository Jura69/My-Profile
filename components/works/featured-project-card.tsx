import { Link as RouterLink } from 'react-router'
import { motion } from 'motion/react'
import Badge from '../ui/badge'
import { cn } from '../../lib/cn'
import { coverSrcSet, type Project } from './works-data'

/**
 * Large flagship card — 16:9 cover, optional kicker, title, blurb, tech badges. Hover lifts the
 * whole card and scales the image inside its clipped frame (transform-only, so no layout shift).
 * The RouterLink covers the whole block for one big hit area and is named by the title, so the
 * cover is decorative (alt="").
 */
export default function FeaturedProjectCard({ project, kicker }: { project: Project; kicker?: string }) {
    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="group h-full"
        >
            <RouterLink
                to={`/works/${project.id}`}
                className={cn(
                    'flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-elevated shadow-paper transition-shadow',
                    'hover:shadow-paper-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring'
                )}
            >
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={project.thumbnail}
                        srcSet={project.cover && coverSrcSet(project.cover)}
                        sizes={project.cover && '(min-width:1024px) 540px, 100vw'}
                        alt=""
                        loading="lazy"
                        width={640}
                        height={360}
                        className={cn(
                            'h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]',
                            project.cover && 'dark:brightness-90'
                        )}
                    />
                </div>
                <div className="paper-grain flex flex-1 flex-col p-6">
                    {kicker && <p className="eyebrow text-accent">{kicker}</p>}
                    <h3 className={cn('font-rounded text-[22px] leading-tight font-extrabold text-ink', kicker && 'mt-2')}>
                        {project.title}
                    </h3>
                    <p className="mt-2.5 flex-1 font-rounded text-[15px] leading-relaxed text-ink-muted">
                        {project.description}
                    </p>
                    {project.tech && project.tech.length > 0 && (
                        <div className="mt-[18px] flex flex-wrap gap-1.5">
                            {project.tech.map(tag => (
                                <Badge key={tag} tone="neutral" size="md">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </RouterLink>
        </motion.article>
    )
}
