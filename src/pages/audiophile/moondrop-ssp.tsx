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
    <>
        <SEO
            title="Moondrop SSP Review | Trương Tuấn Lộc"
            description="Review of the Moondrop SSP IEM featuring beryllium-coated dome diaphragm, patented anti-blocking filter, and precise frequency response control."
            keywords="Moondrop SSP, IEM Review, Audiophile, In-ear Monitor, Budget IEM, Beryllium Diaphragm"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://my-profile-jura69.vercel.app/audiophile' },
                { name: 'Moondrop SSP', url: 'https://my-profile-jura69.vercel.app/audiophile/moondrop-ssp' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/audiophile" parentLabel="Audiophile">
                Moondrop SSP
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Unlike some other IEMs on the market. MOONDROP implements acoustical damper and filter into one package in order to make precise control of frequency response.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailImage src="/images/audiophile/ssp-2.jpg" alt="SSP" />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailMeta
                    title="Specifications"
                    rows={[
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
                />
            </Reveal>
        </Container>
    </>
)

export default Audios
