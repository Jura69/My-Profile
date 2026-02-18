import {
    Container,
    List,
    ListItem,
    Heading,
    Box,
} from '@chakra-ui/react'
import { DetailTitle, Meta, DetailImage } from '../../../components/detail-components'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'
import Section from '../../../components/section'
import SEO from '../../../components/seo'
import { BreadcrumbSchema } from '../../../components/json-ld'

const Audios = () => (
    <Layout title="Moondrop SSP">
        <SEO
            title="Moondrop SSP Review | Trương Tuấn Lộc"
            description="Review of the Moondrop SSP IEM featuring beryllium-coated dome diaphragm, patented anti-blocking filter, and precise frequency response control."
            keywords="Moondrop SSP, IEM Review, Audiophile, In-ear Monitor, Budget IEM, Beryllium Diaphragm"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://my-profile-jura69.vercel.app/audiophile' },
                { name: 'Moondrop SSP', url: 'https://my-profile-jura69.vercel.app/audiophile/moondropSSP' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/audiophile" parentLabel="Audiophile">
                Moondrop SSP
            </DetailTitle>

            <Section delay={0.1}>
                <P>
                    Unlike some other IEMs on the market. MOONDROP implements acoustical damper and filter into one package in order to make precise control of frequency response.
                </P>
            </Section>

            <Section delay={0.2}>
                <DetailImage src="/images/audiophile/ssp-2.jpg" alt="SSP" />
            </Section>

            <Section delay={0.3}>
                <Heading as="h4" fontSize={16} mb={3}>
                    Specifications
                </Heading>
                <Box
                    borderRadius="lg"
                    p={4}
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                >
                    <List spacing={2}>
                        <ListItem>
                            <Meta>Diaphragm</Meta>
                            <span>Beryllium-Coated Dome + PU Suspension Ring</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Sensitivity</Meta>
                            <span>112dB/Vrms@1kHz</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Impedance</Meta>
                            <span>16Ω@1kHz</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Headphone jack</Meta>
                            <span>0.78mm 2-pin</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Frequency response</Meta>
                            <span>20-20000Hz (IEC60318-4)</span>
                        </ListItem>
                        <ListItem>
                            <Meta>THD</Meta>
                            <span>≤1% @1kHz</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Housing Material</Meta>
                            <span>Amorphous Metal Alloy Housing</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Coil</Meta>
                            <span>0.035mm-CCAW (Daikoku)</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Magnet</Meta>
                            <span>N52-Neodymium High Density Magnetic Circuit</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Acoustic Filter</Meta>
                            <span>Patented Anti-blocking Filter</span>
                        </ListItem>
                    </List>
                </Box>
            </Section>
        </Container>
    </Layout>
)

export default Audios
