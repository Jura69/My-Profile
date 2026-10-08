import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="AdvanceSystem - Retail Audit & Field-Force Platform | Trương Tuấn Lộc"
            description="Retail audit and trade-marketing field-force management platform for FMCG brands — mobile field apps, supervisor web portals, and consumer engagement."
            keywords="Retail Audit, Field Force Management, Trade Marketing, FMCG, .NET, SQL Server, Creasia"
            image="/images/og/advance-system.jpg"
        />
        <ProjectSchema
            project={{
                title: 'AdvanceSystem',
                description: 'Retail audit & field-force management platform for FMCG brands',
                year: '2025',
                image: 'https://my-profile-jura69.vercel.app/images/works/advance-system-cover-1280.webp',
                stack: '.NET, ASP.NET Core, SQL Server'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'AdvanceSystem', url: 'https://my-profile-jura69.vercel.app/works/advance-system' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2025">
                AdvanceSystem
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Retail audit and trade-marketing field-force management platform serving major FMCG brands
                    across Vietnam. It powers mobile field apps for sales representatives, supervisor and admin web
                    portals, and consumer engagement through Zalo minigames and landing pages — with role-based
                    workflows for every tier of the field organization.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web portals + mobile field apps (Enterprise)' },
                        { label: 'Stack', value: '.NET, ASP.NET Core, SQL Server' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/advance-system-detail.webp" alt="AdvanceSystem" />
            </Reveal>
        </Container>
    </>
)

export default Work
