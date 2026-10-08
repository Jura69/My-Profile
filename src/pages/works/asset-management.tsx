import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="Asset Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Enterprise asset tracking and lifecycle management platform built at Creasia. Monitor, maintain, and optimize physical and digital assets from acquisition to disposal."
            keywords="Asset Management, Enterprise, React, TypeScript, MUI, Redux Toolkit, C# .NET, Entity Framework Core"
            image="/images/og/asset-management.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Asset Management',
                description: 'Enterprise asset tracking & lifecycle management platform',
                year: '2024',
                image: 'https://jura69.vercel.app/images/works/asset-management-cover-1280.webp',
                stack: 'React 18, TypeScript, MUI, Redux Toolkit, C# .NET 7, Entity Framework Core'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Asset Management', url: 'https://jura69.vercel.app/works/asset-management' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2024">
                Asset Management
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Enterprise asset tracking and lifecycle management platform built at Creasia. Enables organizations
                    to monitor, maintain, and optimize their physical and digital assets throughout the entire lifecycle
                    from acquisition to disposal.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web application (Enterprise)' },
                        {
                            label: 'Stack',
                            value: 'React 18, TypeScript, MUI, Redux Toolkit, C# .NET 7, Entity Framework Core'
                        }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/asset-management-detail.webp" alt="Asset Management" />
            </Reveal>
        </Container>
    </>
)

export default Work
