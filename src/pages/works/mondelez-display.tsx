import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

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
                year: '2025',
                image: 'https://my-profile-jura69.vercel.app/images/works/mondelez-display-cover-1280.webp',
                stack: 'React, .NET, SQL Server'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                {
                    name: 'Mondelez Display Management',
                    url: 'https://my-profile-jura69.vercel.app/works/mondelez-display'
                }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2025">
                Mondelez Display Management
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Enterprise system managing retail outlet exhibition programs for Mondelez end-to-end — program
                    registration, mobile field operations, photo-based compliance auditing, and licensing workflows
                    across retail outlets nationwide. It keeps display investments verifiable from head office
                    down to every store shelf.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        { label: 'Platform', value: 'Web + mobile field operations (Enterprise)' },
                        { label: 'Stack', value: 'React, .NET, SQL Server' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/mondelez-display-detail.webp" alt="Mondelez Display Management" />
            </Reveal>
        </Container>
    </>
)

export default Work
