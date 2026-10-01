import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="Planogram AI - Retail Shelf Compliance | Trương Tuấn Lộc"
            description="AI-powered planogram compliance platform — computer vision verifies retail product placement automatically from shelf photos."
            keywords="Planogram Compliance, Computer Vision, Retail AI, Shelf Audit, Python, .NET, Creasia"
            image="/images/works/planogram-cover-1280.webp"
        />
        <ProjectSchema
            project={{
                title: 'Planogram AI',
                description:
                    'AI-powered retail shelf compliance — verifies product placement automatically from shelf photos with computer vision.',
                year: '2026',
                image: 'https://my-profile-jura69.vercel.app/images/works/planogram-cover-1280.webp',
                stack: 'Python, .NET, Computer Vision'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Planogram AI', url: 'https://my-profile-jura69.vercel.app/works/planogram' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2026">
                Planogram AI
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Shelf-verification platform that automates planogram compliance checking for retail. Field
                    teams photograph shelves, computer-vision models detect and identify the products on display,
                    and the system scores each shelf against the planned layout — turning a slow manual audit
                    into an instant, photo-driven report.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'AI service + web dashboard (Enterprise)' },
                        { label: 'Stack', value: 'Python, .NET, Computer Vision' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/planogram-detail.webp" alt="Planogram AI" />
            </Reveal>
        </Container>
    </>
)

export default Work
