import Layout from '../../../components/layouts/article'
import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import {
    DetailTitle,
    DetailProse,
    DetailMeta,
    DetailImage
} from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { BreadcrumbSchema } from '../../../components/json-ld'

const Audios = () => (
    <Layout title="Fiio Ka11">
        <SEO
            title="FiiO KA11 Review | Trương Tuấn Lộc"
            description="Review of the FiiO KA11 USB DAC/AMP dongle featuring CS43131 DAC chip, SGM8262 op-amp, and support for 384kHz/32bit and DSD256."
            keywords="FiiO KA11, USB DAC, DAC AMP, Audiophile Dongle, CS43131, Hi-Fi Audio, Portable DAC"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://my-profile-jura69.vercel.app/audiophile' },
                { name: 'FiiO KA11', url: 'https://my-profile-jura69.vercel.app/audiophile/fiioka11' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/audiophile" parentLabel="Audiophile">
                Fiio Ka11
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    The FIIO KA11 is a specialized HiFi USB adapter that connects to phones, tablets, and computers. Inside are high-performance DAC and headphone amplifiers that work together to bring a higher-quality listening experience.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailImage src="/images/audiophile/ka11-2.webp" alt="FiiO KA11" />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailMeta
                    title="Specifications"
                    rows={[
                        { label: 'DAC', value: 'CS43131' },
                        { label: 'Op-amp', value: 'SGM8262' },
                        { label: 'Max supported formats', value: '384kHz/32bit, DSD256' },
                        { label: 'Input', value: 'Type-C or Lightning' },
                        { label: 'Output', value: '3.5mm headphone jack' },
                        { label: 'Dimensions', value: 'About 44.5 x 9.7 x 10.5 mm' },
                        { label: 'Cable length', value: 'About 65.5 mm' },
                        { label: 'Weight', value: 'About 18.5 g' }
                    ]}
                />
            </Reveal>
        </Container>
    </Layout>
)

export default Audios
