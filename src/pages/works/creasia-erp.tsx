import {
    Container,
    Badge,
    List,
    ListItem,
} from '@chakra-ui/react'
import { DetailTitle, DetailImage, Meta } from '../../../components/detail-components'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'
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
            <DetailTitle parentPath="/works" parentLabel="Works">
                Creasia ERP <Badge>2025</Badge>
            </DetailTitle>
            <P>
                Comprehensive enterprise resource planning platform built at Creasia covering
                finance, HR, procurement, and supply chain modules. Features Gantt-based
                project planning and multi-language support for global operations.
            </P>
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Platform</Meta>
                    <span>Web application (Enterprise)</span>
                </ListItem>
                <ListItem>
                    <Meta>Stack</Meta>
                    <span>React 18, TypeScript, MUI, Gantt charts, Full Calendar, i18next, C# .NET</span>
                </ListItem>
            </List>

            <DetailImage src="/images/works/creasia-erp-detail.webp" alt="Creasia ERP" />
        </Container>
    </Layout>
)

export default Work
