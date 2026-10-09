import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('ai-center')

const Work = () => (
    <>
        <SEO
            title="Creasia AI Center - Enterprise AI Agent Platform | Trương Tuấn Lộc"
            description="Enterprise AI agent platform — multi-channel AI assistants with agent orchestration, custom skills, and tool integrations."
            keywords="AI Agent Platform, AI Agents, Agent Orchestration, Agent Skills, LLM Integration, Creasia"
            image="/images/og/ai-center.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Creasia AI Center',
                description:
                    'Enterprise AI agent platform — multi-channel AI assistants with agent orchestration, custom skills & tools.',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/ai-center-cover-1280.webp',
                stack: 'Go, PostgreSQL'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Creasia AI Center', url: 'https://jura69.vercel.app/works/ai-center' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'Creasia AI Center' }]}
            title="Creasia AI Center"
            eyebrow={`Enterprise · CREASIA · ${project.year}`}
            lead={project.description}
            media={{ kind: 'cover', project }}
        />
        <DetailBody
            factsTitle="Project facts"
            facts={[
                { label: 'Year', value: project.year },
                { label: 'Built at', value: 'CREASIA' },
                { label: 'Platform', value: 'AI agent platform (Enterprise)' },
                { label: 'Stack', value: 'Go, PostgreSQL', badges: ['Go', 'PostgreSQL'] }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Enterprise platform for building and running AI agents across the messaging channels a business
                    already uses. Teams connect the AI models they prefer, extend agents with custom skills and tools,
                    and let agents coordinate with each other to complete multi-step work — from customer conversations
                    to internal automation.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/ai-center-detail.webp" alt="Creasia AI Center" />
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
