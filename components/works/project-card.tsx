import { Link as RouterLink } from 'react-router'
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'
import type { CardItem } from './works-data'

/**
 * Compact project card — thumbnail, title, one-line blurb. Used for the
 * non-flagship personal work and the enterprise grid, and reused by the
 * audiophile/activities listings via `to`. Transform-only hover, no CLS.
 */
export default function ProjectCard({ project, to }: { project: CardItem; to?: string }) {
    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="group h-full"
        >
            <RouterLink
                to={to ?? `/works/${project.id}`}
                className={cn(
                    'flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-elevated shadow-sm transition-shadow',
                    'hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
                )}
            >
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        loading="lazy"
                        width={480}
                        height={270}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                </div>
                <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-rounded text-base font-bold text-ink">{project.title}</h3>
                    {project.description && (
                        <p className="mt-1 font-rounded text-sm leading-snug text-ink-muted">{project.description}</p>
                    )}
                </div>
            </RouterLink>
        </motion.article>
    )
}
