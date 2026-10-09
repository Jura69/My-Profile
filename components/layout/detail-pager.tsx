import { Link as RouterLink } from 'react-router'
import { ArrowRight } from '../icons/kit-icons-interface'
import Container from '../ui/container'
import ProjectRowCard from '../works/project-row-card'
import type { CardItem } from '../works/works-data'

interface DetailPagerProps {
    /** The sibling pages in listing order (works pass their own category, like the Works tabs). */
    items: CardItem[]
    currentId: string
    /** Listing route; each item lives at `${basePath}/${id}`. */
    basePath: string
    allLabel: string
    label?: string
}

/**
 * Every detail page ends the same way: previous / next row cards (wrapping around the list) and
 * a link back to the listing. With fewer than two items only the link is shown.
 */
export default function DetailPager({ items, currentId, basePath, allLabel, label = 'More projects' }: DetailPagerProps) {
    const at = items.findIndex(item => item.id === currentId)
    const showPager = items.length >= 2 && at >= 0
    const prev = showPager ? items[(at - 1 + items.length) % items.length] : undefined
    const next = showPager ? items[(at + 1) % items.length] : undefined

    return (
        <Container size="page" className="pt-14 pb-16 md:pt-24 md:pb-28">
            <nav aria-label={label}>
                {prev && next && (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
                        <ProjectRowCard project={prev} to={`${basePath}/${prev.id}`} kicker="Previous" reverse titleAs="span" />
                        <ProjectRowCard project={next} to={`${basePath}/${next.id}`} kicker="Next" titleAs="span" />
                    </div>
                )}
                <p className="mt-6 text-center">
                    <RouterLink
                        to={basePath}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg font-rounded text-base font-bold text-accent-on-sky hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                    >
                        {allLabel} <ArrowRight aria-hidden="true" />
                    </RouterLink>
                </p>
            </nav>
        </Container>
    )
}
