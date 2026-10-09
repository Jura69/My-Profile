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
            title="Shanling Onix XI1 Review | Trương Tuấn Lộc"
            description="Review of the Shanling ONIX XI1 DAC/AMP featuring dual Cirrus Logic CS43198, 500mW output, and OLED display. A compact powerhouse for audiophiles on the go."
            keywords="Shanling Onix XI1, USB DAC AMP, Cirrus Logic CS43198, Balanced Output, 4.4mm, Portable DAC, Audiophile"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://jura69.vercel.app/audiophile' },
                { name: 'Shanling Onix XI1', url: 'https://jura69.vercel.app/audiophile/onix' }
            ]}
        />
        <PageHeader
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Audiophile', to: '/audiophile' },
                { label: 'Shanling Onix XI1' }
            ]}
            eyebrow="Audiophile"
            title="Shanling Onix XI1"
        />
        <DetailBody
            factsTitle="Specifications"
            facts={[
                { label: 'Dimensions', value: '62.5*23*14.6mm' },
                { label: 'Weight', value: '37.8g' },
                { label: 'DAC', value: 'CS43198 * 2' },
                { label: '3.5mm Output', value: '300mW@32Ω' },
                { label: '4.4mm Output', value: '500mW@32Ω' },
                { label: 'Frequency response', value: '20Hz-80kHz (-3dB)' },
                { label: 'SNR', value: '133dB' },
                { label: 'Screen', value: '0.87 inches OLED' }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    The Shanling ONIX XI1 is a high-end DAC/AMP featuring a dual Cirrus Logic CS43198 DAC chipset,
                    supporting PCM 32-bit/768kHz and DSD256 for clean, detailed, and natural sound. Powered by dual
                    SGM8262 amplifiers, it delivers up to 500mW@32Ω via the balanced 4.4mm output, driving a wide range
                    of headphones with ease. Its compact design includes a 0.87" OLED display and physical controls for
                    convenient operation. With both 3.5mm and 4.4mm outputs, Eddict Player App support, and optimized
                    low power consumption, the XI1 is a perfect choice for audiophiles on the go.
                </DetailProse>
            </Reveal>

            <DetailHeading>Photos</DetailHeading>
            <Reveal>
                <DetailImage src="/images/audiophile/onix-2.webp" alt="onix" />
            </Reveal>
        </DetailBody>
        <DetailPager
            items={audioGear}
            currentId="onix"
            basePath="/audiophile"
            allLabel="All devices"
            label="More devices"
        />
    </>
)

export default Audios
