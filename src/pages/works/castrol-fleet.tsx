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
    <Layout title="Castrol Fleet Management">
        <SEO
            title="Castrol Fleet Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Vehicle fleet tracking platform with real-time geolocation via Mapbox. Includes maintenance scheduling, route optimization, and logistics management."
            keywords="Castrol Fleet Management, Vehicle Tracking, Geolocation, Mapbox, React, TypeScript, MUI, Full Calendar, C# .NET"
            image="/images/works/castrol-fleet-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'Castrol Fleet Management',
                description: 'Vehicle fleet tracking with geolocation & maintenance scheduling',
                year: '2024',
                image: 'https://my-profile-jura69.vercel.app/images/works/castrol-fleet-thumb.webp',
                stack: 'React 18, TypeScript, MUI, Mapbox GL, Full Calendar, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Castrol Fleet Management', url: 'https://my-profile-jura69.vercel.app/works/castrol-fleet' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works">
                Castrol Fleet Management <Badge>2024</Badge>
            </DetailTitle>
            <P>
                Vehicle fleet tracking platform with real-time geolocation via Mapbox built at Creasia.
                Includes maintenance scheduling, route optimization, and logistics management
                for fleet operators managing large vehicle networks.
            </P>
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Platform</Meta>
                    <span>Web application (Enterprise)</span>
                </ListItem>
                <ListItem>
                    <Meta>Stack</Meta>
                    <span>React 18, TypeScript, MUI, Mapbox GL, Full Calendar, C# .NET</span>
                </ListItem>
            </List>

            <DetailImage src="/images/works/castrol-fleet-detail.webp" alt="Castrol Fleet Management" />
        </Container>
    </Layout>
)

export default Work
