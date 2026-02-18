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

            <Section delay={0.1}>
                <P>
                    The FIIO KA11 is a specialized HiFi USB adapter that connects to phones, tablets, and computers. Inside are high-performance DAC and headphone amplifiers that work together to bring a higher-quality listening experience.
                </P>
            </Section>

            <Section delay={0.2}>
                <DetailImage src="/images/audiophile/ka11-2.webp" alt="FiiO KA11" />
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
                            <Meta>DAC</Meta>
                            <span>CS43131</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Op-amp</Meta>
                            <span>SGM8262</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Max supported formats</Meta>
                            <span>384kHz/32bit, DSD256</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Input</Meta>
                            <span>Type-C or Lightning</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Output</Meta>
                            <span>3.5mm headphone jack</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Dimensions</Meta>
                            <span>About 44.5 x 9.7 x 10.5 mm</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Cable length</Meta>
                            <span>About 65.5 mm</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Weight</Meta>
                            <span>About 18.5 g</span>
                        </ListItem>
                    </List>
                </Box>
            </Section>
        </Container>
    </Layout>
)

export default Audios
