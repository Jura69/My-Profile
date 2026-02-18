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
            <DetailTitle parentPath="/works" parentLabel="Works">
                Vending Management <Badge>2025</Badge>
            </DetailTitle>
            <P>
                Vending machine management platform built at Creasia.
                Provides sales analytics, inventory tracking, and restocking workflows
                to optimize vending operations across multiple locations.
            </P>
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Platform</Meta>
                    <span>Web application (Enterprise)</span>
                </ListItem>
                <ListItem>
                    <Meta>Stack</Meta>
                    <span>React 18, TypeScript, MUI, Redux Toolkit, ApexCharts, C# .NET</span>
                </ListItem>
            </List>

            <DetailImage src="/images/works/vending-ai-agent-detail.webp" alt="Vending Management" />
        </Container>
    </Layout>
)

export default Work
