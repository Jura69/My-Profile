import { Link as RouterLink } from 'react-router'
import { ArrowRight } from '../../components/icons/kit-icons-interface'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Container from '../../components/ui/container'
import PageHeader from '../../components/ui/page-header'
import Reveal from '../../components/ui/reveal'
import SectionHeading from '../../components/ui/section-heading'
import FeaturedProjectCard from '../../components/works/featured-project-card'
import ProjectRowCard from '../../components/works/project-row-card'
import WorksTabs from '../../components/works/works-tabs'
import { Campfire, Headphones, WorksSatchel } from '../../components/icons/kit-icons-topics'
import type { IconComponent } from '../../components/icons/kit-icon-base'
import {
    audioGear,
    featuredProjects,
    otherPersonalProjects,
    featuredEnterpriseProjects,
    enterpriseProjects,
    projects,
    projectsInCategory,
    type Project
} from '../../components/works/works-data'

const enterpriseCount = projectsInCategory('enterprise').length
const personalCount = projectsInCategory('personal').length

const panelHeading = 'font-rounded text-xl font-extrabold text-ink'

/**
 * One tab panel: "Flagship work" cards (auto-fit, so 2 or 3 always fill the row), then the rest as
 * two-column row cards under their own h2 — the outline reads h1 → h2 → h3.
 */
function ProjectsPanel({ flagships, rest, restTitle }: { flagships: Project[]; rest: Project[]; restTitle: string }) {
    return (
        <>
            <h2 className={`mt-8 ${panelHeading}`}>Flagship work</h2>
            <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6">
                {flagships.map((project, i) => (
                    <Reveal key={project.id} delay={0.05 + i * 0.05} className="h-full">
                        <FeaturedProjectCard project={project} kicker={project.kicker} />
                    </Reveal>
                ))}
            </div>

            {rest.length > 0 && (
                <>
                    <div className="mt-14 flex items-baseline justify-between gap-3">
                        <h2 className={panelHeading}>{restTitle}</h2>
                        <span className="font-rounded text-sm font-bold text-ink-muted">
                            {rest.length} {rest.length === 1 ? 'project' : 'projects'}
                        </span>
                    </div>
                    <Reveal>
                        <ul className="mt-5 grid list-none gap-4 p-0 md:grid-cols-2">
                            {rest.map(project => (
                                <li key={project.id}>
                                    <ProjectRowCard project={project} />
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </>
            )}
        </>
    )
}

const OFF_THE_CLOCK: { to: string; title: string; blurb: string; icon: IconComponent }[] = [
    {
        to: '/audiophile',
        title: 'Audiophile',
        blurb: `Reviews of the ${audioGear.length} IEMs and DAC/AMPs I use every day.`,
        icon: Headphones
    },
    {
        to: '/activities',
        title: 'University activities',
        blurb: 'YTC NTU: social media, design and event photography.',
        icon: Campfire
    }
]

const Works = () => (
    <>
        <SEO
            title="My Projects & Works | Trương Tuấn Lộc Portfolio"
            description="Browse my portfolio of personal and enterprise projects. Includes Food Lover, TensorFlow Sign Language Detection, and 12 enterprise projects built at Creasia — from an AI agent platform to computer-vision shelf compliance and OCR systems."
            keywords="Portfolio Projects, Web Development, React, Node.js, Flutter, Machine Learning, TensorFlow, Enterprise Projects, Creasia, .NET, ERP, AI Agent Platform, Computer Vision, OCR"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' }
            ]}
        />

        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works' }]}
            eyebrow={`Portfolio · ${projects.length} projects`}
            title="My works"
            ornament={WorksSatchel}
            media={{ kind: 'banner', page: 'works', alt: 'Painted forest veranda with a sketching desk' }}
            lead={`${enterpriseCount} built at CREASIA — from an AI agent platform to computer-vision and OCR systems — plus ${personalCount} personal builds.`}
        />

        <section aria-label="Projects">
            <Container size="page" className="pt-10">
                <WorksTabs
                    panels={{
                        enterprise: (
                            <ProjectsPanel
                                flagships={featuredEnterpriseProjects}
                                rest={enterpriseProjects}
                                restTitle="More from CREASIA"
                            />
                        ),
                        personal: (
                            <ProjectsPanel
                                flagships={featuredProjects}
                                rest={otherPersonalProjects}
                                restTitle="More personal builds"
                            />
                        )
                    }}
                />
            </Container>
        </section>

        <section className="w-full py-16 md:py-24">
            <Container size="page">
                <Reveal>
                    <SectionHeading as="h2" eyebrow="Beyond code">
                        Off the clock
                    </SectionHeading>
                </Reveal>
                <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6">
                    {OFF_THE_CLOCK.map(({ to, title, blurb, icon: Icon }, i) => (
                        <Reveal key={to} delay={i * 0.05} className="h-full">
                            <RouterLink
                                to={to}
                                className="paper-grain group flex h-full items-center gap-5 rounded-2xl border border-line bg-surface-elevated p-6 shadow-paper transition-shadow hover:shadow-paper-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                            >
                                <span
                                    aria-hidden="true"
                                    className="grid size-14 shrink-0 place-items-center rounded-[14px] bg-accent-soft text-2xl text-accent"
                                >
                                    <Icon />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-rounded text-lg font-extrabold text-ink">{title}</h3>
                                    <span className="mt-1 block font-rounded text-[15px] leading-normal text-ink-muted">
                                        {blurb}
                                    </span>
                                </div>
                                <ArrowRight
                                    aria-hidden="true"
                                    className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                            </RouterLink>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    </>
)

export default Works
