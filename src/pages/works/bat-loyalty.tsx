import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('bat-loyalty')

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
                year: project.year,
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
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'BAT Loyalty Program' }]}
            title="BAT Loyalty Program"
            eyebrow={`Enterprise · CREASIA · ${project.year}`}
            lead={project.description}
            media={{ kind: 'cover', project }}
        />
        <DetailBody
            factsTitle="Project facts"
            facts={[
                { label: 'Year', value: project.year },
                { label: 'Built at', value: 'CREASIA' },
                { label: 'Platform', value: 'Web application (Enterprise)' },
                {
                    label: 'Stack',
                    value: 'React 18, MUI, Redux, C# .NET, RESTful API',
                    badges: ['React 18', 'MUI', 'Redux', 'C# .NET', 'RESTful API']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Customer loyalty rewards and points management system for British American Tobacco. Handles point
                    accumulation, redemption workflows, and reward catalog management across multiple regions and
                    partner networks.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/bat-loyalty-detail.webp" alt="BAT Loyalty Program" />
            </Reveal>
        </DetailBody>
        <DetailPager
            items={projectsInCategory(project.category)}
            currentId={project.id}
            basePath="/works"
            allLabel="All projects"
        />
    </>
)

export default Work
