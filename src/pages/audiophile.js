import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { AudioGridItem } from '../../components/grid-item'

import thumbEA1000 from '../../public/images/audiophile/ea1000.webp'
import thumbSSP from '../../public/images/audiophile/ssp.jpg'
import thumbOnix from '../../public/images/audiophile/onix.jpg'
import thumbFiioka11 from '../../public/images/audiophile/ka11.jpg'

const Audiophile = () => (
  <Layout title="Audiophile">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        My Audio Devices
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <AudioGridItem id="ea1000" title="Simgot EA1000 fermat" thumbnail={thumbEA1000} href={`/audiophile/ea1000`}>

          </AudioGridItem>
        </Section>
        <Section>
          <AudioGridItem id="moondropSSP" title="Moondrop SSP" thumbnail={thumbSSP} href={`/audiophile/moondropSSP`}>

          </AudioGridItem>
        </Section>
        <Section>
          <AudioGridItem id="onix" title="Onix Alpha XI1" thumbnail={thumbOnix} href={`/audiophile/onix`}>

          </AudioGridItem>
        </Section>
        <Section>
          <AudioGridItem id="fiioka11" title="Fiio Ka11" thumbnail={thumbFiioka11} href={`/audiophile/fiioka11`}>

          </AudioGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Audiophile
export { getServerSideProps } from '../../components/chakra'
