import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('planogram')

const Work = () => (
    <>
        <SEO
            title="Planogram AI - Retail Shelf Compliance | Trương Tuấn Lộc"
            description="AI-powered planogram compliance platform — computer vision verifies retail product placement automatically from shelf photos."
            keywords="Planogram Compliance, Computer Vision, Retail AI, Shelf Audit, Python, .NET, Creasia"
            image="/images/og/planogram.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Planogram AI',
                description:
                    'AI-powered retail shelf compliance — verifies product placement automatically from shelf photos with computer vision.',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/planogram-cover-1280.webp',
                stack: 'Python, .NET, Computer Vision'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Planogram AI', url: 'https://jura69.vercel.app/works/planogram' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'Planogram AI' }]}
            title="Planogram AI"
            eyebrow={`Enterprise · CREASIA · ${project.year}`}
            lead={project.description}
            media={{ kind: 'cover', project }}
        />
        <DetailBody
            factsTitle="Project facts"
            facts={[
                { label: 'Year', value: project.year },
                { label: 'Built at', value: 'CREASIA' },
                { label: 'Platform', value: 'AI service + web dashboard (Enterprise)' },
                {
                    label: 'Stack',
                    value: 'Python, .NET, Computer Vision',
                    badges: ['Python', '.NET', 'Computer Vision']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Shelf-verification platform that automates planogram compliance checking for retail. Field teams
                    photograph shelves, computer-vision models detect and identify the products on display, and the
                    system scores each shelf against the planned layout — turning a slow manual audit into an instant,
                    photo-driven report.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/planogram-detail.webp" alt="Planogram AI" />
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
