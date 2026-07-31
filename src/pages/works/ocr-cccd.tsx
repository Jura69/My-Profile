import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="OCR CCCD - Vietnamese ID Card Data Extraction | Trương Tuấn Lộc"
            description="AI-powered OCR extracting structured data from Vietnamese citizen ID cards — supports both CCCD and the 2024 Căn cước format."
            keywords="OCR, CCCD, Vietnamese ID Card, Document AI, Data Extraction, Python"
            image="/images/works/ocr-cccd-thumb.webp"
        />
        <ProjectSchema
            project={{
                title: 'OCR CCCD',
                description: 'AI-powered OCR that extracts structured data from Vietnamese ID cards',
                year: '2026',
                image: 'https://my-profile-jura69.vercel.app/images/works/ocr-cccd-thumb.webp',
                stack: 'Python, OCR, Vietnamese NLP'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'OCR CCCD', url: 'https://my-profile-jura69.vercel.app/works/ocr-cccd' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2026">
                OCR CCCD
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    OCR system that extracts structured data from Vietnamese citizen ID cards — both CCCD and the
                    2024 Căn cước format. Recognition is tuned for Vietnamese text with full diacritics, and
                    post-processing validates and normalizes every field into clean, machine-readable records.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'OCR pipeline + API (Internal)' },
                        { label: 'Stack', value: 'Python, OCR, Vietnamese NLP' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/ocr-cccd-detail.webp" alt="OCR CCCD" />
            </Reveal>
        </Container>
    </>
)

export default Work
