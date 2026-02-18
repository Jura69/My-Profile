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
    <Layout title="BAT PSA">
        <SEO
            title="BAT PSA - Enterprise Analytics Dashboard | Trương Tuấn Lộc"
            description="Administrative dashboard for problem statement analysis at British American Tobacco. Features advanced reporting, data visualization, and export capabilities."
            keywords="BAT PSA, Analytics Dashboard, Problem Statement Analysis, React, DevExtreme, TailwindCSS, Redux, C# .NET, Docker"
            image="/images/works/bat-psa-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'BAT PSA',
                description: 'Admin dashboard for problem statement analysis with reporting',
                year: '2024',
                image: 'https://my-profile-jura69.vercel.app/images/works/bat-psa-thumb.webp',
                stack: 'React 18, DevExtreme, TailwindCSS, Redux Toolkit, C# .NET 7, Docker'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'BAT PSA', url: 'https://my-profile-jura69.vercel.app/works/bat-psa' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works">
                BAT PSA <Badge>2024</Badge>
            </DetailTitle>
            <P>
                Administrative dashboard for problem statement analysis at British American Tobacco.
                Features advanced reporting, data visualization, and export capabilities
                for operational decision-making across the organization.
            </P>
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Platform</Meta>
                    <span>Web application (Enterprise)</span>
                </ListItem>
                <ListItem>
                    <Meta>Stack</Meta>
                    <span>React 18, DevExtreme, TailwindCSS, Redux Toolkit, C# .NET 7, Docker</span>
                </ListItem>
            </List>

            <DetailImage src="/images/works/bat-psa-detail.webp" alt="BAT PSA" />
        </Container>
    </Layout>
)

export default Work
