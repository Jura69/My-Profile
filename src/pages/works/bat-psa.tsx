import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('bat-psa')

const Work = () => (
    <>
        <SEO
            title="BAT PSA - Enterprise Analytics Dashboard | Trương Tuấn Lộc"
            description="Administrative dashboard for problem statement analysis at British American Tobacco. Features advanced reporting, data visualization, and export capabilities."
            keywords="BAT PSA, Analytics Dashboard, Problem Statement Analysis, React, DevExtreme, TailwindCSS, Redux, C# .NET, Docker"
            image="/images/og/bat-psa.jpg"
        />
        <ProjectSchema
            project={{
                title: 'BAT PSA',
                description: 'Admin dashboard for problem statement analysis with reporting',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/bat-psa-cover-1280.webp',
                stack: 'React 18, DevExtreme, TailwindCSS, Redux Toolkit, C# .NET 7, Docker'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'BAT PSA', url: 'https://jura69.vercel.app/works/bat-psa' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'BAT PSA' }]}
            title="BAT PSA"
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
                    value: 'React 18, DevExtreme, TailwindCSS, Redux Toolkit, C# .NET 7, Docker',
                    badges: ['React 18', 'DevExtreme', 'TailwindCSS', 'Redux Toolkit', 'C# .NET 7', 'Docker']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Administrative dashboard for problem statement analysis at British American Tobacco. Features
                    advanced reporting, data visualization, and export capabilities for operational decision-making
                    across the organization.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/bat-psa-detail.webp" alt="BAT PSA" />
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
