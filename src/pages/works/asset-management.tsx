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
    <Layout title="Asset Management">
        <SEO
            title="Asset Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Enterprise asset tracking and lifecycle management platform built at Creasia. Monitor, maintain, and optimize physical and digital assets from acquisition to disposal."
            keywords="Asset Management, Enterprise, React, TypeScript, MUI, Redux Toolkit, C# .NET, Entity Framework Core"
            image="/images/works/asset-management-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'Asset Management',
                description: 'Enterprise asset tracking & lifecycle management platform',
                year: '2024',
                image: 'https://my-profile-jura69.vercel.app/images/works/asset-management-thumb.webp',
                stack: 'React 18, TypeScript, MUI, Redux Toolkit, C# .NET 7, Entity Framework Core'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Asset Management', url: 'https://my-profile-jura69.vercel.app/works/asset-management' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works">
                Asset Management <Badge>2024</Badge>
            </DetailTitle>
            <P>
                Enterprise asset tracking and lifecycle management platform built at Creasia.
                Enables organizations to monitor, maintain, and optimize their physical and digital assets
                throughout the entire lifecycle from acquisition to disposal.
            </P>
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Platform</Meta>
                    <span>Web application (Enterprise)</span>
                </ListItem>
                <ListItem>
                    <Meta>Stack</Meta>
                    <span>React 18, TypeScript, MUI, Redux Toolkit, C# .NET 7, Entity Framework Core</span>
                </ListItem>
            </List>

            <DetailImage src="/images/works/asset-management-detail.webp" alt="Asset Management" />
        </Container>
    </Layout>
)

export default Work
