import Layout from '../../../components/layouts/article'
import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <Layout title="Creasia ERP">
        <SEO
            title="Creasia ERP - Enterprise Resource Planning | Trương Tuấn Lộc"
            description="Comprehensive enterprise resource planning platform covering finance, HR, procurement, and supply chain modules. Features Gantt-based project planning and multi-language support."
            keywords="Creasia ERP, Enterprise Resource Planning, Finance, HR, Procurement, Supply Chain, React, TypeScript, MUI, Gantt, i18next, C# .NET"
            image="/images/works/creasia-erp-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'Creasia ERP',
                description: 'Comprehensive ERP covering finance, HR, procurement & supply chain',
                year: '2025',
                image: 'https://my-profile-jura69.vercel.app/images/works/creasia-erp-thumb.webp',
                stack: 'React 18, TypeScript, MUI, Gantt charts, Full Calendar, i18next, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Creasia ERP', url: 'https://my-profile-jura69.vercel.app/works/creasia-erp' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2025">
                Creasia ERP
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Comprehensive enterprise resource planning platform built at Creasia covering
                    finance, HR, procurement, and supply chain modules. Features Gantt-based
                    project planning and multi-language support for global operations.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web application (Enterprise)' },
                        { label: 'Stack', value: 'React 18, TypeScript, MUI, Gantt charts, Full Calendar, i18next, C# .NET' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/creasia-erp-detail.webp" alt="Creasia ERP" />
            </Reveal>
        </Container>
    </Layout>
)

export default Work
