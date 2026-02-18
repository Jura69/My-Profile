import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { AudioGridItem } from '../../components/grid-item'

const Audiophile = () => (
    <Layout title="Audiophile">
        <Container>
            <Heading as="h3" fontSize={20} mb={4}>
                My Audio Devices
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section>
                    <AudioGridItem id="ea1000" title="Simgot EA1000 fermat" thumbnail="/images/audiophile/ea1000.webp">
                    </AudioGridItem>
                </Section>
                <Section>
                    <AudioGridItem id="moondropSSP" title="Moondrop SSP" thumbnail="/images/audiophile/ssp.jpg">
                    </AudioGridItem>
                </Section>
                <Section>
                    <AudioGridItem id="onix" title="Onix Alpha XI1" thumbnail="/images/audiophile/onix.jpg">
                    </AudioGridItem>
                </Section>
                <Section>
                    <AudioGridItem id="fiioka11" title="Fiio Ka11" thumbnail="/images/audiophile/ka11.jpg">
                    </AudioGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
)

export default Audiophile
