import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('vending-ai-agent')

const Work = () => (
    <>
        <SEO
            title="Vending Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Vending machine management platform with sales analytics, inventory tracking, and restocking workflows for enterprise vending operations."
            keywords="Vending Management, Sales Analytics, Inventory Tracking, React, TypeScript, MUI, ApexCharts, C# .NET"
            image="/images/og/vending-ai-agent.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Vending Management',
                description: 'Vending machine management platform with sales analytics & inventory tracking',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/vending-ai-agent-cover-1280.webp',
                stack: 'React 18, TypeScript, MUI, Redux Toolkit, ApexCharts, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Vending Management', url: 'https://jura69.vercel.app/works/vending-ai-agent' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'Vending Management' }]}
            title="Vending Management"
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
                    value: 'React 18, TypeScript, MUI, Redux Toolkit, ApexCharts, C# .NET',
                    badges: ['React 18', 'TypeScript', 'MUI', 'Redux Toolkit', 'ApexCharts', 'C# .NET']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Vending machine management platform built at Creasia. Provides sales analytics, inventory tracking,
                    and restocking workflows to optimize vending operations across multiple locations.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/vending-ai-agent-detail.webp" alt="Vending Management" />
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
