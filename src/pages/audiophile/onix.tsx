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
    <Layout title="Shanling Onix Alpha XI1">
        <SEO
            title="Shanling Onix XI1 Review | Trương Tuấn Lộc"
            description="Review of the Shanling ONIX XI1 DAC/AMP featuring dual Cirrus Logic CS43198, 500mW output, and OLED display. A compact powerhouse for audiophiles on the go."
            keywords="Shanling Onix XI1, USB DAC AMP, Cirrus Logic CS43198, Balanced Output, 4.4mm, Portable DAC, Audiophile"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://my-profile-jura69.vercel.app/audiophile' },
                { name: 'Shanling Onix XI1', url: 'https://my-profile-jura69.vercel.app/audiophile/onix' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/audiophile" parentLabel="Audiophile">
                Shanling Onix XI1
            </DetailTitle>

            <Section delay={0.1}>
                <P>
                    The Shanling ONIX XI1 is a high-end DAC/AMP featuring a dual Cirrus Logic CS43198 DAC chipset, supporting PCM 32-bit/768kHz and DSD256 for clean, detailed, and natural sound. Powered by dual SGM8262 amplifiers, it delivers up to 500mW@32Ω via the balanced 4.4mm output, driving a wide range of headphones with ease. Its compact design includes a 0.87" OLED display and physical controls for convenient operation. With both 3.5mm and 4.4mm outputs, Eddict Player App support, and optimized low power consumption, the XI1 is a perfect choice for audiophiles on the go.
                </P>
            </Section>

            <Section delay={0.2}>
                <DetailImage src="/images/audiophile/onix-2.jpg" alt="onix" />
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
                            <Meta>Dimensions</Meta>
                            <span>62.5*23*14.6mm</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Weight</Meta>
                            <span>37.8g</span>
                        </ListItem>
                        <ListItem>
                            <Meta>DAC</Meta>
                            <span>CS43198 * 2</span>
                        </ListItem>
                        <ListItem>
                            <Meta>3.5mm Output</Meta>
                            <span>300mW@32Ω</span>
                        </ListItem>
                        <ListItem>
                            <Meta>4.4mm Output</Meta>
                            <span>500mW@32Ω</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Frequency response</Meta>
                            <span>20Hz-80kHz (-3dB)</span>
                        </ListItem>
                        <ListItem>
                            <Meta>SNR</Meta>
                            <span>133dB</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Screen</Meta>
                            <span>0.87 inches OLED</span>
                        </ListItem>
                    </List>
                </Box>
            </Section>
        </Container>
    </Layout>
)

export default Audios
