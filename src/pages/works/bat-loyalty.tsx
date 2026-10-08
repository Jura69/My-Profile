import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="BAT Loyalty Program - Enterprise Platform | Trương Tuấn Lộc"
            description="Customer loyalty rewards and points management system for British American Tobacco. Handles point accumulation, redemption workflows, and reward catalog management."
            keywords="BAT Loyalty Program, Customer Loyalty, Rewards System, React, MUI, Redux, C# .NET, Enterprise"
            image="/images/og/bat-loyalty.jpg"
        />
        <ProjectSchema
            project={{
                title: 'BAT Loyalty Program',
                description: 'Customer loyalty rewards & points management system',
                year: '2024',
                image: 'https://jura69.vercel.app/images/works/bat-loyalty-cover-1280.webp',
                stack: 'React 18, MUI, Redux, C# .NET, RESTful API'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'BAT Loyalty Program', url: 'https://jura69.vercel.app/works/bat-loyalty' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2024">
                BAT Loyalty Program
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Customer loyalty rewards and points management system for British American Tobacco. Handles point
                    accumulation, redemption workflows, and reward catalog management across multiple regions and
                    partner networks.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web application (Enterprise)' },
                        { label: 'Stack', value: 'React 18, MUI, Redux, C# .NET, RESTful API' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/bat-loyalty-detail.webp" alt="BAT Loyalty Program" />
            </Reveal>
        </Container>
    </>
)

export default Work
