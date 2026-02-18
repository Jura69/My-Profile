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
    <Layout title="Warehouse Management">
        <SEO
            title="Warehouse Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Inventory tracking system with barcode and QR scanning integration. Manages order workflows, stock movements, and warehouse operations for enterprise logistics."
            keywords="Warehouse Management, Inventory Tracking, Barcode Scanning, QR Code, React, MUI, DevExtreme, Redux, C# .NET"
            image="/images/works/warehouse-management-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'Warehouse Management',
                description: 'Inventory tracking with barcode scanning & order workflows',
                year: '2024',
                image: 'https://my-profile-jura69.vercel.app/images/works/warehouse-management-thumb.webp',
                stack: 'React 18, MUI, DevExtreme, Redux, QR/Barcode scanning, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Warehouse Management', url: 'https://my-profile-jura69.vercel.app/works/warehouse-management' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works">
                Warehouse Management <Badge>2024</Badge>
            </DetailTitle>
            <P>
                Inventory tracking system with barcode and QR scanning integration built at Creasia.
                Manages order workflows, stock movements, and warehouse operations
                for enterprise logistics and supply chain management.
            </P>
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Platform</Meta>
                    <span>Web application (Enterprise)</span>
                </ListItem>
                <ListItem>
                    <Meta>Stack</Meta>
                    <span>React 18, MUI, DevExtreme, Redux, QR/Barcode scanning, C# .NET</span>
                </ListItem>
            </List>

            <DetailImage src="/images/works/warehouse-management-detail.webp" alt="Warehouse Management" />
        </Container>
    </Layout>
)

export default Work
