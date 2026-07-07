import Layout from '../../../components/layouts/article'
import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <Layout title="Vending Management">
        <SEO
            title="Vending Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Vending machine management platform with sales analytics, inventory tracking, and restocking workflows for enterprise vending operations."
            keywords="Vending Management, Sales Analytics, Inventory Tracking, React, TypeScript, MUI, ApexCharts, C# .NET"
            image="/images/works/vending-ai-agent-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'Vending Management',
                description: 'Vending machine management platform with sales analytics & inventory tracking',
                year: '2025',
                image: 'https://my-profile-jura69.vercel.app/images/works/vending-ai-agent-thumb.webp',
                stack: 'React 18, TypeScript, MUI, Redux Toolkit, ApexCharts, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Vending Management', url: 'https://my-profile-jura69.vercel.app/works/vending-ai-agent' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2025">
                Vending Management
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Vending machine management platform built at Creasia.
                    Provides sales analytics, inventory tracking, and restocking workflows
                    to optimize vending operations across multiple locations.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web application (Enterprise)' },
                        { label: 'Stack', value: 'React 18, TypeScript, MUI, Redux Toolkit, ApexCharts, C# .NET' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/vending-ai-agent-detail.webp" alt="Vending Management" />
            </Reveal>
        </Container>
    </Layout>
)

export default Work
