import { Link as RouterLink } from 'react-router'
import { motion } from 'motion/react'
import Badge from '../ui/badge'
import { cn } from '../../lib/cn'
import type { Project } from './works-data'

/**
 * Large flagship card — 16:9 cover, title, blurb, tech badges. Hover lifts the
 * whole card and scales the image inside its clipped frame (transform-only, so
 * no layout shift). The RouterLink covers the whole block for one big hit area.
 */
export default function FeaturedProjectCard({ project }: { project: Project }) {
    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="group h-full"
        >
            <RouterLink
                to={`/works/${project.id}`}
                className={cn(
                    'flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-elevated shadow-sm transition-shadow',
                    'hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
                )}
            >
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        loading="lazy"
                        width={640}
                        height={360}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-rounded text-lg font-bold text-ink">{project.title}</h3>
                    <p className="mt-2 flex-1 font-rounded text-sm leading-relaxed text-ink-muted">
                        {project.description}
                    </p>
                    {project.tech && project.tech.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.tech.map(tag => (
                                <Badge key={tag} tone="neutral">
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
