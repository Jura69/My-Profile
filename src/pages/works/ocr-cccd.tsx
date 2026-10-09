import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('ocr-cccd')

const Work = () => (
    <>
        <SEO
            title="OCR CCCD - Vietnamese ID Card Data Extraction | Trương Tuấn Lộc"
            description="AI-powered OCR extracting structured data from Vietnamese citizen ID cards — supports both CCCD and the 2024 Căn cước format."
            keywords="OCR, CCCD, Vietnamese ID Card, Document AI, Data Extraction, Python"
            image="/images/og/ocr-cccd.jpg"
        />
        <ProjectSchema
            project={{
                title: 'OCR CCCD',
                description: 'AI-powered OCR that extracts structured data from Vietnamese ID cards',
                year: project.year,
                image: 'https://jura69.vercel.app/images/works/ocr-cccd-cover-1280.webp',
                stack: 'Python, OCR, Vietnamese NLP'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'OCR CCCD', url: 'https://jura69.vercel.app/works/ocr-cccd' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'OCR CCCD' }]}
            title="OCR CCCD"
            eyebrow={`Enterprise · CREASIA · ${project.year}`}
            lead={project.description}
            media={{ kind: 'cover', project }}
        />
        <DetailBody
            factsTitle="Project facts"
            facts={[
                { label: 'Year', value: project.year },
                { label: 'Built at', value: 'CREASIA' },
                { label: 'Platform', value: 'OCR pipeline + API (Internal)' },
                { label: 'Stack', value: 'Python, OCR, Vietnamese NLP', badges: ['Python', 'OCR', 'Vietnamese NLP'] }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    OCR system that extracts structured data from Vietnamese citizen ID cards — both CCCD and the 2024
                    Căn cước format. Recognition is tuned for Vietnamese text with full diacritics, and post-processing
                    validates and normalizes every field into clean, machine-readable records.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/ocr-cccd-detail.webp" alt="OCR CCCD" />
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
