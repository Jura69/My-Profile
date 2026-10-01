import { Link as RouterLink } from 'react-router'
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'
import { coverSrcSet, type CardItem } from './works-data'

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
                    'flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-elevated shadow-paper transition-shadow',
                    'hover:shadow-paper-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring'
                )}
            >
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={project.thumbnail}
                        srcSet={project.cover && coverSrcSet(project.cover)}
                        sizes={project.cover && '(min-width:1024px) 260px, (min-width:640px) 50vw, 100vw'}
                        alt={project.title}
                        loading="lazy"
                        width={480}
                        height={270}
                        className={cn(
                            'h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]',
                            project.cover && 'dark:brightness-90'
                        )}
                    />
                </div>
                <div className="paper-grain flex flex-1 flex-col p-4">
                    <h3 className="font-rounded text-base font-bold text-ink">{project.title}</h3>
                    {project.description && (
                        <p className="mt-1 font-rounded text-sm leading-snug text-ink-muted">{project.description}</p>
                    )}
                </div>
            </RouterLink>
        </motion.article>
    )
}
