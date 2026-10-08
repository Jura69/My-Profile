import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="Warehouse Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Inventory tracking system with barcode and QR scanning integration. Manages order workflows, stock movements, and warehouse operations for enterprise logistics."
            keywords="Warehouse Management, Inventory Tracking, Barcode Scanning, QR Code, React, MUI, DevExtreme, Redux, C# .NET"
            image="/images/og/warehouse-management.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Warehouse Management',
                description: 'Inventory tracking with barcode scanning & order workflows',
                year: '2024',
                image: 'https://jura69.vercel.app/images/works/warehouse-management-cover-1280.webp',
                stack: 'React 18, MUI, DevExtreme, Redux, QR/Barcode scanning, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Warehouse Management', url: 'https://jura69.vercel.app/works/warehouse-management' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2024">
                Warehouse Management
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Inventory tracking system with barcode and QR scanning integration built at Creasia. Manages order
                    workflows, stock movements, and warehouse operations for enterprise logistics and supply chain
                    management.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web application (Enterprise)' },
                        { label: 'Stack', value: 'React 18, MUI, DevExtreme, Redux, QR/Barcode scanning, C# .NET' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/warehouse-management-detail.webp" alt="Warehouse Management" />
            </Reveal>
        </Container>
    </>
)

export default Work
