import { Fragment } from 'react'
import { Link as RouterLink } from 'react-router'
import { ArrowRight } from '../icons/kit-icons-interface'
import { SprigLeaf } from '../icons/kit-ornaments'
import Container from '../ui/container'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import { buttonClasses } from '../ui/button-styles'
import OverlayProjectCard from '../works/overlay-project-card'
import { findProject, projects } from '../works/works-data'
import { featuredBrands, selectedWork } from './home-data'

const [flagship, ...compact] = selectedWork.map(findProject)

/**
 * Scene 2 — morning: proof before biography. Directly under the hero (the hero cue targets #work):
 * one flagship and two compact overlay cards in a bento, the client brands, and the way to all
 * projects (a header link from sm, a full-width button below sm — never both at once).
 */
export default function SelectedWork() {
    return (
        <section id="work" data-section="selected-work" className="w-full py-16 md:py-24">
            <Container size="page">
                <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                        <SectionHeading as="h2" eyebrow="01 · Morning">
                            Selected work
                        </SectionHeading>
                        <RouterLink
                            to="/works"
                            className="hidden min-h-11 items-center gap-2 rounded-lg font-rounded text-base font-bold text-accent-on-sky hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:inline-flex"
                        >
                            All {projects.length} projects <ArrowRight aria-hidden="true" />
                        </RouterLink>
                    </div>

                    <div className="mt-9 flex flex-col gap-6 lg:flex-row">
                        <OverlayProjectCard project={flagship} size="flagship" className="lg:flex-[1.75]" />
                        <div className="flex flex-col gap-6 lg:flex-1">
                            {compact.map(project => (
                                <OverlayProjectCard key={project.id} project={project} size="compact" className="lg:flex-1" />
                            ))}
                        </div>
                    </div>

                    <p className="mt-6 flex items-start gap-2.5 font-rounded text-[15px] text-ink-muted">
                        <SprigLeaf aria-hidden="true" className="mt-0.5 shrink-0 text-accent-on-sky" />
                        <span>
                            Enterprise work at CREASIA for brands including{' '}
                            {featuredBrands.map((brand, i) => (
                                <Fragment key={brand}>
                                    {i > 0 && (i === featuredBrands.length - 1 ? ' and ' : ', ')}
                                    <strong className="font-bold text-ink">{brand}</strong>
                                </Fragment>
                            ))}
                            .
                        </span>
                    </p>

                    <RouterLink to="/works" className={buttonClasses('outline', 'lg', 'mt-8 w-full bg-surface-elevated sm:hidden')}>
                        All {projects.length} projects <ArrowRight aria-hidden="true" />
                    </RouterLink>
                </Reveal>
            </Container>
        </section>
    )
}
