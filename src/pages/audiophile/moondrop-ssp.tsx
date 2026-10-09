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
            title="Moondrop SSP Review | Trương Tuấn Lộc"
            description="Review of the Moondrop SSP IEM featuring beryllium-coated dome diaphragm, patented anti-blocking filter, and precise frequency response control."
            keywords="Moondrop SSP, IEM Review, Audiophile, In-ear Monitor, Budget IEM, Beryllium Diaphragm"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://jura69.vercel.app/audiophile' },
                { name: 'Moondrop SSP', url: 'https://jura69.vercel.app/audiophile/moondrop-ssp' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Audiophile', to: '/audiophile' }, { label: 'Moondrop SSP' }]}
            eyebrow="Audiophile"
            title="Moondrop SSP"
        />
        <DetailBody
            factsTitle="Specifications"
            facts={[
                { label: 'Diaphragm', value: 'Beryllium-Coated Dome + PU Suspension Ring' },
                { label: 'Sensitivity', value: '112dB/Vrms@1kHz' },
                { label: 'Impedance', value: '16Ω@1kHz' },
                { label: 'Headphone jack', value: '0.78mm 2-pin' },
                { label: 'Frequency response', value: '20-20000Hz (IEC60318-4)' },
                { label: 'THD', value: '≤1% @1kHz' },
                { label: 'Housing Material', value: 'Amorphous Metal Alloy Housing' },
                { label: 'Coil', value: '0.035mm-CCAW (Daikoku)' },
                { label: 'Magnet', value: 'N52-Neodymium High Density Magnetic Circuit' },
                { label: 'Acoustic Filter', value: 'Patented Anti-blocking Filter' }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Unlike some other IEMs on the market. MOONDROP implements acoustical damper and filter into one
                    package in order to make precise control of frequency response.
                </DetailProse>
            </Reveal>

            <DetailHeading>Photos</DetailHeading>
            <Reveal>
                <DetailImage src="/images/audiophile/ssp-2.webp" alt="SSP" />
            </Reveal>
        </DetailBody>
        <DetailPager
            items={audioGear}
            currentId="moondrop-ssp"
            basePath="/audiophile"
            allLabel="All devices"
            label="More devices"
        />
    </>
)

export default Audios
