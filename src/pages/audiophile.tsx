import Layout from '../../components/layouts/article'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Reveal from '../../components/ui/reveal'
import SectionHeading from '../../components/ui/section-heading'
import ProjectCard from '../../components/works/project-card'
import type { CardItem } from '../../components/works/works-data'

const devices: CardItem[] = [
    { id: 'ea1000', title: 'Simgot EA1000 Fermat', thumbnail: '/images/audiophile/ea1000.webp' },
    { id: 'moondropSSP', title: 'Moondrop SSP', thumbnail: '/images/audiophile/ssp.jpg' },
    { id: 'onix', title: 'Onix Alpha XI1', thumbnail: '/images/audiophile/onix.jpg' },
    { id: 'fiioka11', title: 'Fiio Ka11', thumbnail: '/images/audiophile/ka11.jpg' }
]

const Audiophile = () => (
    <Layout title="Audiophile">
        <SEO
            title="Audio Gear & Reviews | Trương Tuấn Lộc Portfolio"
            description="Explore my audiophile collection featuring in-depth reviews of IEMs and DAC/AMPs including Simgot EA1000, Moondrop SSP, Shanling Onix XI1, and FiiO KA11."
            keywords="Audiophile, IEM Reviews, DAC AMP, Simgot EA1000, Moondrop SSP, Shanling Onix XI1, FiiO KA11, Hi-Fi Audio, Headphone Reviews"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://my-profile-jura69.vercel.app/audiophile' }
            ]}
        />

        <section className="w-full px-4 py-8">
            <div className="mx-auto max-w-[1100px]">
                <Reveal>
                    <SectionHeading as="h2">My Audio Devices 🎧</SectionHeading>
                </Reveal>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {devices.map((device, i) => (
                        <Reveal key={device.id} delay={0.05 + i * 0.05} className="h-full">
                            <ProjectCard project={device} to={`/audiophile/${device.id}`} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    </Layout>
)

export default Audiophile
