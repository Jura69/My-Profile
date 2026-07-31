import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="Creasia AI Center - Enterprise AI Agent Platform | Trương Tuấn Lộc"
            description="Enterprise AI agent platform — multi-channel AI assistants with agent orchestration, custom skills, and tool integrations."
            keywords="AI Agent Platform, AI Agents, Agent Orchestration, Agent Skills, LLM Integration, Creasia"
            image="/images/works/ai-center-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'Creasia AI Center',
                description:
                    'Enterprise AI agent platform — multi-channel AI assistants with agent orchestration, custom skills & tools.',
                year: '2026',
                image: 'https://my-profile-jura69.vercel.app/images/works/ai-center-thumb.webp',
                stack: 'Go, PostgreSQL'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Creasia AI Center', url: 'https://my-profile-jura69.vercel.app/works/ai-center' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2026">
                Creasia AI Center
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Enterprise platform for building and running AI agents across the messaging channels a
                    business already uses. Teams connect the AI models they prefer, extend agents with custom
                    skills and tools, and let agents coordinate with each other to complete multi-step work —
                    from customer conversations to internal automation.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'AI agent platform (Enterprise)' },
                        { label: 'Stack', value: 'Go, PostgreSQL' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/ai-center-detail.webp" alt="Creasia AI Center" />
            </Reveal>
        </Container>
    </>
)

export default Work
