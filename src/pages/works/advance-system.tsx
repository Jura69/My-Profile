import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('advance-system')

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
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/advance-system-cover-1280.webp',
                stack: '.NET, ASP.NET Core, SQL Server'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'AdvanceSystem', url: 'https://jura69.vercel.app/works/advance-system' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'AdvanceSystem' }]}
            title="AdvanceSystem"
            eyebrow={`Enterprise · CREASIA · ${project.year}`}
            lead={project.description}
            media={{ kind: 'cover', project }}
        />
        <DetailBody
            factsTitle="Project facts"
            facts={[
                { label: 'Year', value: project.year },
                { label: 'Built at', value: 'CREASIA' },
                { label: 'Platform', value: 'Web portals + mobile field apps (Enterprise)' },
                {
                    label: 'Stack',
                    value: '.NET, ASP.NET Core, SQL Server',
                    badges: ['.NET', 'ASP.NET Core', 'SQL Server']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Retail audit and trade-marketing field-force management platform serving major FMCG brands across
                    Vietnam. It powers mobile field apps for sales representatives, supervisor and admin web portals,
                    and consumer engagement through Zalo minigames and landing pages — with role-based workflows for
                    every tier of the field organization.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/advance-system-detail.webp" alt="AdvanceSystem" />
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
