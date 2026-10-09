import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Container from '../../components/ui/container'
import PageHeader from '../../components/ui/page-header'
import Reveal from '../../components/ui/reveal'
import ProjectCard from '../../components/works/project-card'
import { audioGear } from '../../components/works/works-data'
import { Headphones } from '../../components/icons/kit-icons-topics'

const Audiophile = () => (
    <>
        <SEO
            title="Audio Gear & Reviews | Trương Tuấn Lộc Portfolio"
            description="Explore my audiophile collection featuring in-depth reviews of IEMs and DAC/AMPs including Simgot EA1000, Moondrop SSP, Shanling Onix XI1, and FiiO KA11."
            keywords="Audiophile, IEM Reviews, DAC AMP, Simgot EA1000, Moondrop SSP, Shanling Onix XI1, FiiO KA11, Hi-Fi Audio, Headphone Reviews"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://jura69.vercel.app/audiophile' }
            ]}
        />

        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Audiophile' }]}
            eyebrow={`Off the clock · ${audioGear.length} devices`}
            title="My audio devices"
            ornament={Headphones}
            media={{
                kind: 'banner',
                page: 'audiophile',
                alt: 'Painted window view over a river valley with a record player and headphones',
                imgClassName: 'object-[75%_50%]'
            }}
            lead="IEMs and DAC/AMPs I listen with every day — specs and short impressions."
        />

        <section aria-label="Devices" className="w-full pt-10 pb-16 md:pb-24">
            <Container size="page">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
                    {audioGear.map((device, i) => (
                        <Reveal key={device.id} delay={0.05 + i * 0.05} className="h-full">
                            <ProjectCard project={device} to={`/audiophile/${device.id}`} />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    </>
)

export default Audiophile
