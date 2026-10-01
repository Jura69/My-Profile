import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="BAT PSA - Enterprise Analytics Dashboard | Trương Tuấn Lộc"
            description="Administrative dashboard for problem statement analysis at British American Tobacco. Features advanced reporting, data visualization, and export capabilities."
            keywords="BAT PSA, Analytics Dashboard, Problem Statement Analysis, React, DevExtreme, TailwindCSS, Redux, C# .NET, Docker"
            image="/images/works/bat-psa-cover-1280.webp"
        />
        <ProjectSchema
            project={{
                title: 'BAT PSA',
                description: 'Admin dashboard for problem statement analysis with reporting',
                year: '2024',
                image: 'https://my-profile-jura69.vercel.app/images/works/bat-psa-cover-1280.webp',
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
            <DetailTitle parentPath="/works" parentLabel="Works" year="2024">
                BAT PSA
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Administrative dashboard for problem statement analysis at British American Tobacco. Features
                    advanced reporting, data visualization, and export capabilities for operational decision-making
                    across the organization.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web application (Enterprise)' },
                        { label: 'Stack', value: 'React 18, DevExtreme, TailwindCSS, Redux Toolkit, C# .NET 7, Docker' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/bat-psa-detail.webp" alt="BAT PSA" />
            </Reveal>
        </Container>
    </>
)

export default Work
