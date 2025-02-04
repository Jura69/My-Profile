import {
    Container,
    List,
    ListItem,
  } from '@chakra-ui/react'
  import { Title, Meta, AudioImage } from '../../../components/audiophile'
  import P from '../../../components/paragraph'
  import Layout from '../../../components/layouts/article'
  
  const audios = () => (
    <Layout title="Fiio Ka11">
      <Container>
        <Title>
            Fiio Ka11 
        </Title>
        <P>
        The FIIO KA11 is a specialized HiFi USB adapter that connects to phones, tablets, and computers. Inside are high-performance DAC and headphone amplifiers that work together to bring a higher-quality listening experience.
        </P>
        <br />
        <AudioImage src="/images/audiophile/ka11-2.jpg" alt="EA1000" />
        <List ml={4} my={4}>
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
  
        
      </Container>
    </Layout>
  )
  
  export default audios
  export { getServerSideProps } from '../../../components/chakra'
  