import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('creasia-erp')

const Work = () => (
    <>
        <SEO
            title="Creasia ERP - Enterprise Resource Planning | Trương Tuấn Lộc"
            description="Comprehensive enterprise resource planning platform covering finance, HR, procurement, and supply chain modules. Features Gantt-based project planning and multi-language support."
            keywords="Creasia ERP, Enterprise Resource Planning, Finance, HR, Procurement, Supply Chain, React, TypeScript, MUI, Gantt, i18next, C# .NET"
            image="/images/og/creasia-erp.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Creasia ERP',
                description: 'Comprehensive ERP covering finance, HR, procurement & supply chain',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/creasia-erp-cover-1280.webp',
                stack: 'React 18, TypeScript, MUI, Gantt charts, Full Calendar, i18next, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Creasia ERP', url: 'https://jura69.vercel.app/works/creasia-erp' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'Creasia ERP' }]}
            title="Creasia ERP"
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
                    value: 'React 18, TypeScript, MUI, Gantt charts, Full Calendar, i18next, C# .NET',
                    badges: ['React 18', 'TypeScript', 'MUI', 'Gantt charts', 'Full Calendar', 'i18next', 'C# .NET']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Comprehensive enterprise resource planning platform built at Creasia covering finance, HR,
                    procurement, and supply chain modules. Features Gantt-based project planning and multi-language
                    support for global operations.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/creasia-erp-detail.webp" alt="Creasia ERP" />
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
