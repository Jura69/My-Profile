import {
  Container,
  List,
  ListItem,
} from '@chakra-ui/react'
import { Title, Meta, AudioImage } from '../../../components/audiophile'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'

const audios = () => (
  <Layout title="Shanling Onix Alpha XI1">
    <Container>
      <Title>
        Shanling Onix XI1 
      </Title>
      <P>
      The Shanling ONIX XI1 is a high-end DAC/AMP featuring a dual Cirrus Logic CS43198 DAC chipset, supporting PCM 32-bit/768kHz and DSD256 for clean, detailed, and natural sound. Powered by dual SGM8262 amplifiers, it delivers up to 500mW@32Ω via the balanced 4.4mm output, driving a wide range of headphones with ease. Its compact design includes a 0.87” OLED display and physical controls for convenient operation. With both 3.5mm and 4.4mm outputs, Eddict Player App support, and optimized low power consumption, the XI1 is a perfect choice for audiophiles on the go.
      </P>
      <br />
      <AudioImage src="/images/audiophile/onix-2.jpg" alt="onix" />
      <List ml={4} my={4}>
      <ListItem>
          <Meta>Dimensions</Meta>
          <span>64 x 32 x 14 mm</span> 
        </ListItem>
        <ListItem>
          <Meta>Weight</Meta>
          <span>38g</span> 
        </ListItem>
        <ListItem>
          <Meta>Hi-Res Support</Meta>
          <span>32bit / 768kHz & DSD256</span> 
        </ListItem>
        <ListItem>
          <Meta>Gain</Meta>
          <span>Low & High Gain</span> 
        </ListItem>
        <ListItem>
          <Meta>Display</Meta>
          <span>0.87-Inch Monochromatic</span> 
        </ListItem>
        <ListItem>
          <Meta>Controls</Meta>
          <span>3 Hardware Multifunctional Buttons</span> 
        </ListItem>
        <ListItem>
          <Meta>Input</Meta>
          <span>Standard USB-C Connector</span> 
        </ListItem>
        <ListItem>
          <Meta>Compatibility</Meta>
          <span>Android & iOS Devices, Windows & Mac Computers</span> 
        </ListItem>
      </List>

      
    </Container>
  </Layout>
)

export default audios
export { getServerSideProps } from '../../../components/chakra'
