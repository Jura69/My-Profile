import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('asset-management')

const Work = () => (
    <>
        <SEO
            title="Asset Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Enterprise asset tracking and lifecycle management platform built at Creasia. Monitor, maintain, and optimize physical and digital assets from acquisition to disposal."
            keywords="Asset Management, Enterprise, React, TypeScript, MUI, Redux Toolkit, C# .NET, Entity Framework Core"
            image="/images/og/asset-management.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Asset Management',
                description: 'Enterprise asset tracking & lifecycle management platform',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/asset-management-cover-1280.webp',
                stack: 'React 18, TypeScript, MUI, Redux Toolkit, C# .NET 7, Entity Framework Core'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Asset Management', url: 'https://jura69.vercel.app/works/asset-management' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'Asset Management' }]}
            title="Asset Management"
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
                    value: 'React 18, TypeScript, MUI, Redux Toolkit, C# .NET 7, Entity Framework Core',
                    badges: ['React 18', 'TypeScript', 'MUI', 'Redux Toolkit', 'C# .NET 7', 'Entity Framework Core']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Enterprise asset tracking and lifecycle management platform built at Creasia. Enables organizations
                    to monitor, maintain, and optimize their physical and digital assets throughout the entire lifecycle
                    from acquisition to disposal.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/asset-management-detail.webp" alt="Asset Management" />
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
