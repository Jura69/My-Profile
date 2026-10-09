import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('warehouse-management')

const Work = () => (
    <>
        <SEO
            title="Warehouse Management - Enterprise Platform | Trương Tuấn Lộc"
            description="Inventory tracking system with barcode and QR scanning integration. Manages order workflows, stock movements, and warehouse operations for enterprise logistics."
            keywords="Warehouse Management, Inventory Tracking, Barcode Scanning, QR Code, React, MUI, DevExtreme, Redux, C# .NET"
            image="/images/og/warehouse-management.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Warehouse Management',
                description: 'Inventory tracking with barcode scanning & order workflows',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/warehouse-management-cover-1280.webp',
                stack: 'React 18, MUI, DevExtreme, Redux, QR/Barcode scanning, C# .NET'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Warehouse Management', url: 'https://jura69.vercel.app/works/warehouse-management' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'Warehouse Management' }]}
            title="Warehouse Management"
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
                    value: 'React 18, MUI, DevExtreme, Redux, QR/Barcode scanning, C# .NET',
                    badges: ['React 18', 'MUI', 'DevExtreme', 'Redux', 'QR/Barcode scanning', 'C# .NET']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Inventory tracking system with barcode and QR scanning integration built at Creasia. Manages order
                    workflows, stock movements, and warehouse operations for enterprise logistics and supply chain
                    management.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/warehouse-management-detail.webp" alt="Warehouse Management" />
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
