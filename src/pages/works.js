import { Container, Heading, SimpleGrid} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { WorkGridItem } from '../../components/grid-item'

import thumbFoodlover from '../../public/images/works/Food1.png'
import thumbTicketapp from '../../public/images/works/Ticket1.jpeg'
import thumbTensorflow from '../../public/images/works/Tensorflow.jpg'
import thumbEcommerce from '../../public/images/works/EcommerceBE.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
      My Persional Projects
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
        <WorkGridItem id="foodlover" title="Foodlover" thumbnail={thumbFoodlover} href={`/works/foodlover`}> 
            A web application that allows users to search for food recipes and order food online, built with Nextjs, MongoDB.
        </WorkGridItem>
        </Section>

        <Section>
        <WorkGridItem id="ticketapp" title="Flutter Ticket App" thumbnail={thumbTicketapp} href={`/works/ticketapp`}> 
            A Flutter app that allows users to buy tickets for movies, built with Flutter.
        </WorkGridItem>
        </Section>

        <Section>
        <WorkGridItem id="tensorflow" title="Tensorflow SignLanguage" thumbnail={thumbTensorflow} href={`/works/tensorflow`}> 
            A python app using Tensorflow, machine learning to detect sign language.
        </WorkGridItem>
        </Section>

        <Section>
        <WorkGridItem id="ecommerceBE" title="Ecommerce Backend Shop" thumbnail={thumbEcommerce} href={`/works/ecommerceBE`}> 
            Backend Emcommerce Service using Nodejs, Express, MongoDB, ...
        </WorkGridItem>
        </Section>
      </SimpleGrid>
    
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../../components/chakra'
