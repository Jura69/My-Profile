import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Reveal from '../../components/ui/reveal'
import PageBanner from '../../components/ui/page-banner'
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
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://my-profile-jura69.vercel.app/audiophile' }
            ]}
        />

        <section className="w-full px-4 py-8">
            <div className="mx-auto max-w-[1100px]">
                <PageBanner
                    page="audiophile"
                    alt="Painted window view over a river valley with a record player and headphones"
                    title="My Audio Devices"
                    ornament={Headphones}
                    className="mb-8"
                    imgClassName="object-[75%_50%]"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {audioGear.map((device, i) => (
                        <Reveal key={device.id} delay={0.05 + i * 0.05} className="h-full">
                            <ProjectCard project={device} to={`/audiophile/${device.id}`} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    </>
)

export default Audiophile
