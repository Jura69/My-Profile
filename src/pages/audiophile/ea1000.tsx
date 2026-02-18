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
    <Layout title="EA1000 fermat">
        <SEO
            title="Simgot EA1000 Fermat Review | Trương Tuấn Lộc"
            description="In-depth review of the Simgot EA1000 Fermat IEM featuring SDPGD technology, DMDC dynamic driver, and hybrid 1DD+1PR architecture. Includes pairing recommendations and tips."
            keywords="Simgot EA1000, IEM Review, Audiophile, In-ear Monitor, DMDC Driver, Hi-Fi Audio, Earphone Review"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://my-profile-jura69.vercel.app/audiophile' },
                { name: 'EA1000 Fermat', url: 'https://my-profile-jura69.vercel.app/audiophile/ea1000' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/audiophile" parentLabel="Audiophile">
                Simgot EA1000 Fermat
            </DetailTitle>

            <Section delay={0.1}>
                <P>
                    Upgraded from the EA2000, the EA1000 utilizes cutting-edge technology, including the vibrant SDPGD technology, powerful DMDC dynamic driver, and the hybrid 1DD+1PR architecture that delivers a more complete and precise high-quality sound, greatly enhancing your listening experience.
                </P>
            </Section>

            <Section delay={0.2}>
                <DetailImage src="/images/audiophile/ea1000-2.jpg" alt="EA1000" />
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
                            <Meta>Driver</Meta>
                            <span>2nd generation DMDC™10mm dual-magnet dual-cavity dynamic</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Diaphragm</Meta>
                            <span>sputter deposition purple-gold diaphragm</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Sensitivity</Meta>
                            <span>127dB/Vrms(@1kHz)</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Impedance</Meta>
                            <span>16Ω±15%(@1kHz)</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Headphone jack</Meta>
                            <span>0.78mm 2-pin</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Frequency response</Meta>
                            <span>10Hz-50kHz</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Effective frequency response</Meta>
                            <span>20Hz-20kHz</span>
                        </ListItem>
                    </List>
                </Box>
            </Section>

            <Section delay={0.4}>
                <Heading as="h4" fontSize={16} mb={3} mt={6}>
                    My Review
                </Heading>
                <P>
                    After spending some time with the Simgot EA1000, I feel compelled to share my thoughts. The EA1000 leans towards a bright sound signature, with detailed treble that may come off as sharp for those sensitive to higher frequencies. The midrange is neutral with a natural timbre, but it tends to favor the upper mids, making it more suitable for female vocals and instrumental music. Male vocals sound decent but not perfect.
                </P>
                <Box mt={4}>
                    <P>
                        The bass is tuned in a technical manner—tight and just powerful enough, with a relatively quick response time. Overall, the bass of the EA1000 may not satisfy bassheads or those who enjoy heavy remix tracks.
                    </P>
                </Box>
                <Box mt={4}>
                    <P>
                        In terms of technical performance, the soundstage, imaging, and layering are impressive, leaving little to criticize. Before diving into pairing suggestions, I recommend using the pre-installed red and silver nozzle, as I find the other two nozzles less appealing.
                    </P>
                </Box>
                <Box mt={4}>
                    <P>
                        To enhance the sound quality of the EA1000, my first suggestion is to change the ear tips. Personally, I'm not a fan of the stock tips, as they can be uncomfortable and tend to push the midrange and treble forward. This results in a sharper treble that can become fatiguing over extended listening sessions. Many users may want to reduce the treble and add some bass for a more enjoyable experience.
                        The ear tips I recommend for boosting bass include Final Type E (the best among the bunch), followed by DDHiFi ST35 and Tanchjim T-APB T300 Bass Ver.
                    </P>
                </Box>
                <Box mt={4}>
                    <P>
                        Once you've found the right tips, it's time to consider pairing options. Currently, I believe the Colorfly CDA-M1 is the best dongle to pair with the EA1000 based on my personal taste and music preferences. However, since the CDA-M1 is somewhat hard to find in Vietnam, you might want to explore other options like Lotoo Paw S1, xDuoo Link2 Bal/Bal Max, or HiBy FC4. To be sure, it's best to listen to these options before making a purchase. The options mentioned above are chosen with a "wallet-friendly" approach in mind. If budget allows, feel free to go for high-end dongles like FC6, RU7, or W4 for an even better experience.
                    </P>
                </Box>
                <Box mt={4}>
                    <P>
                        If you have a higher budget, consider pairing the EA1000 with one of Shanling's music players, either the M3 Ultra or M6 Ultra. The combination of the EA1000 with the M6 Ultra is truly enjoyable.
                        These are some of my suggestions for those who have, are, or will be purchasing the EA1000 for music enjoyment. Of course, these opinions are personal, and I still encourage everyone to experience the products firsthand to make the best choice. Thank you for reading!
                    </P>
                </Box>
            </Section>
        </Container>
    </Layout>
)

export default Audios
