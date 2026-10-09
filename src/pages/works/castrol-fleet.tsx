import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('castrol-fleet')

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
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/castrol-fleet-cover-1280.webp',
                stack: 'React 18, TypeScript, MUI, Mapbox GL, Full Calendar, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Castrol Fleet Management', url: 'https://jura69.vercel.app/works/castrol-fleet' }
            ]}
        />
        <PageHeader
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Works', to: '/works' },
                { label: 'Castrol Fleet Management' }
            ]}
            title="Castrol Fleet Management"
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
                    value: 'React 18, TypeScript, MUI, Mapbox GL, Full Calendar, C# .NET',
                    badges: ['React 18', 'TypeScript', 'MUI', 'Mapbox GL', 'Full Calendar', 'C# .NET']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Vehicle fleet tracking platform with real-time geolocation via Mapbox built at Creasia. Includes
                    maintenance scheduling, route optimization, and logistics management for fleet operators managing
                    large vehicle networks.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/castrol-fleet-detail.webp" alt="Castrol Fleet Management" />
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
