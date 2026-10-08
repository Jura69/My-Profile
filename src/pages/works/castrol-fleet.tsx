import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="Castrol Fleet Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Vehicle fleet tracking platform with real-time geolocation via Mapbox. Includes maintenance scheduling, route optimization, and logistics management."
            keywords="Castrol Fleet Management, Vehicle Tracking, Geolocation, Mapbox, React, TypeScript, MUI, Full Calendar, C# .NET"
            image="/images/og/castrol-fleet.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Castrol Fleet Management',
                description: 'Vehicle fleet tracking with geolocation & maintenance scheduling',
                year: '2024',
                image: 'https://my-profile-jura69.vercel.app/images/works/castrol-fleet-cover-1280.webp',
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
            <DetailTitle parentPath="/works" parentLabel="Works" year="2024">
                Castrol Fleet Management
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Vehicle fleet tracking platform with real-time geolocation via Mapbox built at Creasia. Includes
                    maintenance scheduling, route optimization, and logistics management for fleet operators managing
                    large vehicle networks.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web application (Enterprise)' },
                        { label: 'Stack', value: 'React 18, TypeScript, MUI, Mapbox GL, Full Calendar, C# .NET' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/castrol-fleet-detail.webp" alt="Castrol Fleet Management" />
            </Reveal>
        </Container>
    </>
)

export default Work
