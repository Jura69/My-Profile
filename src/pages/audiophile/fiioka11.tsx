import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import { audioGear } from '../../../components/works/works-data'
import SEO from '../../../components/seo'
import { BreadcrumbSchema } from '../../../components/json-ld'

const Audios = () => (
    <>
        <SEO
            title="FiiO KA11 Review | Trương Tuấn Lộc"
            description="Review of the FiiO KA11 USB DAC/AMP dongle featuring CS43131 DAC chip, SGM8262 op-amp, and support for 384kHz/32bit and DSD256."
            keywords="FiiO KA11, USB DAC, DAC AMP, Audiophile Dongle, CS43131, Hi-Fi Audio, Portable DAC"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://jura69.vercel.app/audiophile' },
                { name: 'FiiO KA11', url: 'https://jura69.vercel.app/audiophile/fiioka11' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Audiophile', to: '/audiophile' }, { label: 'Fiio Ka11' }]}
            eyebrow="Audiophile"
            title="Fiio Ka11"
        />
        <DetailBody
            factsTitle="Specifications"
            facts={[
                { label: 'DAC', value: 'CS43131' },
                { label: 'Op-amp', value: 'SGM8262' },
                { label: 'Max supported formats', value: '384kHz/32bit, DSD256' },
                { label: 'Input', value: 'Type-C or Lightning' },
                { label: 'Output', value: '3.5mm headphone jack' },
                { label: 'Dimensions', value: 'About 44.5 x 9.7 x 10.5 mm' },
                { label: 'Cable length', value: 'About 65.5 mm' },
                { label: 'Weight', value: 'About 18.5 g' }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    The FIIO KA11 is a specialized HiFi USB adapter that connects to phones, tablets, and computers.
                    Inside are high-performance DAC and headphone amplifiers that work together to bring a
                    higher-quality listening experience.
                </DetailProse>
            </Reveal>

            <DetailHeading>Photos</DetailHeading>
            <Reveal>
                <DetailImage src="/images/audiophile/ka11-2.webp" alt="FiiO KA11" />
            </Reveal>
        </DetailBody>
        <DetailPager
            items={audioGear}
            currentId="fiioka11"
            basePath="/audiophile"
            allLabel="All devices"
            label="More devices"
        />
    </>
)

export default Audios
