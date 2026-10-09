import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('mondelez-display')

const Work = () => (
    <>
        <SEO
            title="Mondelez Display Management - Retail Program Operations | Trương Tuấn Lộc"
            description="Enterprise retail display management for Mondelez — outlet exhibition programs with mobile field operations, compliance auditing, and licensing workflows."
            keywords="Display Management, Retail Operations, Compliance Audit, Mondelez, React, .NET, SQL Server, Creasia"
            image="/images/og/mondelez-display.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Mondelez Display Management',
                description: 'Retail display program management with field operations & compliance auditing',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/mondelez-display-cover-1280.webp',
                stack: 'React, .NET, SQL Server'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                {
                    name: 'Mondelez Display Management',
                    url: 'https://jura69.vercel.app/works/mondelez-display'
                }
            ]}
        />
        <PageHeader
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Works', to: '/works' },
                { label: 'Mondelez Display Management' }
            ]}
            title="Mondelez Display Management"
            eyebrow={`Enterprise · CREASIA · ${project.year}`}
            lead={project.description}
            media={{ kind: 'cover', project }}
        />
        <DetailBody
            factsTitle="Project facts"
            facts={[
                { label: 'Year', value: project.year },
                { label: 'Built at', value: 'CREASIA' },
                { label: 'Platform', value: 'Web + mobile field operations (Enterprise)' },
                { label: 'Stack', value: 'React, .NET, SQL Server', badges: ['React', '.NET', 'SQL Server'] }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Enterprise system managing retail outlet exhibition programs for Mondelez end-to-end — program
                    registration, mobile field operations, photo-based compliance auditing, and licensing workflows
                    across retail outlets nationwide. It keeps display investments verifiable from head office down to
                    every store shelf.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/mondelez-display-detail.webp" alt="Mondelez Display Management" />
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
