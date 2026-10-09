import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage, DetailLink } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('ticketapp')

const Work = () => (
    <>
        <SEO
            title="Flutter Ticket Booking App | Trương Tuấn Lộc"
            description="A modern mobile application for booking movie tickets, built with Flutter for cross-platform compatibility. Features seat selection, secure booking, and intuitive user interface."
            keywords="Flutter App, Ticket Booking App, Mobile App Development, Flutter Projects, Movie Ticket App, Cross-platform App"
            image="/images/og/ticketapp.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Flutter Ticket Booking App',
                description: 'A modern mobile application for booking movie tickets',
                year: project.year,
                github: 'https://github.com/Jura69/Flutter-TicketApp',
                image: 'https://jura69.vercel.app/images/works/Ticket1.webp',
                stack: 'Flutter, Node.js, Express, MongoDB'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Flutter Ticket App', url: 'https://jura69.vercel.app/works/ticketapp' }
            ]}
        />
        <PageHeader
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Works', to: '/works' },
                { label: 'Flutter Ticket Booking App' }
            ]}
            title="Flutter Ticket Booking App"
            eyebrow={`Personal project · ${project.year}`}
            lead={project.description}
            media={{ kind: 'cover', project }}
        />
        <DetailBody
            factsTitle="Project facts"
            facts={[
                { label: 'Year', value: project.year },
                { label: 'Built at', value: 'Personal project' },
                {
                    label: 'Github',
                    value: (
                        <DetailLink href="https://github.com/Jura69/Flutter-TicketApp">
                            https://github.com/Jura69/Flutter-TicketApp
                        </DetailLink>
                    )
                },
                { label: 'Platform', value: 'Android, iOS' },
                {
                    label: 'Stack',
                    value: 'Flutter, Nodejs Express, MongoDB',
                    badges: ['Flutter', 'Nodejs Express', 'MongoDB']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    A modern mobile application for booking movie tickets, built with Flutter for cross-platform
                    compatibility. Features include browsing available movies, selecting seats, and secure ticket
                    booking with a clean, intuitive user interface.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/Ticket2.webp" alt="Ticket" />
                <DetailImage src="/images/works/Ticket3.webp" alt="Ticket" />
            </Reveal>
        </DetailBody>
        <DetailPager
            items={projectsInCategory(project.category)}
            currentId={project.id}
            basePath="/works"
            allLabel="All projects"
        />
    </>
)

export default Work
