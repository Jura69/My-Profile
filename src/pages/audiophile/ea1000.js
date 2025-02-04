import {
  Container,
  List,
  ListItem,
} from '@chakra-ui/react'
import { Title, Meta, AudioImage } from '../../../components/audiophile'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'

const audios = () => (
  <Layout title="EA1000 fermat">
    <Container>
      <Title>
        Simgot EA1000 Fermat 
      </Title>
      <P>
      Upgraded from the EA2000, the EA1000 utilizes cutting-edge technology, including the vibrant SDPGD technology, powerful DMDC dynamic driver, and the hybrid 1DD+1PR architecture that delivers a more complete and precise high-quality sound, greatly enhancing your listening experience.
      </P>
      <br />
      <AudioImage src="/images/audiophile/ea1000-2.jpg" alt="EA1000" />
      <List ml={4} my={4}>
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

      
    </Container>
  </Layout>
)

export default audios
export { getServerSideProps } from '../../../components/chakra'
