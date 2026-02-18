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
    <Layout title="BAT Loyalty Program">
        <SEO
            title="BAT Loyalty Program - Enterprise Platform | Trương Tuấn Lộc"
            description="Customer loyalty rewards and points management system for British American Tobacco. Handles point accumulation, redemption workflows, and reward catalog management."
            keywords="BAT Loyalty Program, Customer Loyalty, Rewards System, React, MUI, Redux, C# .NET, Enterprise"
            image="/images/works/bat-loyalty-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'BAT Loyalty Program',
                description: 'Customer loyalty rewards & points management system',
                year: '2024',
                image: 'https://my-profile-jura69.vercel.app/images/works/bat-loyalty-thumb.webp',
                stack: 'React 18, MUI, Redux, C# .NET, RESTful API'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'BAT Loyalty Program', url: 'https://my-profile-jura69.vercel.app/works/bat-loyalty' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works">
                BAT Loyalty Program <Badge>2024</Badge>
            </DetailTitle>
            <P>
                Customer loyalty rewards and points management system for British American Tobacco.
                Handles point accumulation, redemption workflows, and reward catalog management
                across multiple regions and partner networks.
            </P>
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Platform</Meta>
                    <span>Web application (Enterprise)</span>
                </ListItem>
                <ListItem>
                    <Meta>Stack</Meta>
                    <span>React 18, MUI, Redux, C# .NET, RESTful API</span>
                </ListItem>
            </List>

            <DetailImage src="/images/works/bat-loyalty-detail.webp" alt="BAT Loyalty Program" />
        </Container>
    </Layout>
)

export default Work
