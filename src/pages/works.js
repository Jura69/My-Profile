import { Container, Heading, SimpleGrid} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { WorkGridItem } from '../../components/grid-item'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'

import thumbFoodlover from '../../public/images/works/Food1.png'
import thumbTicketapp from '../../public/images/works/Ticket1.jpeg'
import thumbTensorflow from '../../public/images/works/Tensorflow.jpg'
import thumbEcommerce from '../../public/images/works/EcommerceBE.png'

const Works = () => (
  <Layout title="Works">
    <SEO
      title="My Projects & Works | Trương Tuấn Lộc Portfolio"
      description="Browse my portfolio of web development projects including Food Lover (Next.js food ordering app), Flutter Ticket Booking App, TensorFlow Sign Language Detection, and E-commerce Backend Service."
      keywords="Portfolio Projects, Web Development Projects, React Projects, Node.js Projects, Flutter Apps, Machine Learning, TensorFlow, E-commerce Backend, Full-stack Projects"
    />
    <BreadcrumbSchema
      items={[
        { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
        { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' }
      ]}
    />
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
      My Personal Projects
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
            Backend Ecommerce Service using Node.js, Express, MongoDB, and more.
        </WorkGridItem>
        </Section>
      </SimpleGrid>
    
    </Container>
  </Layout>
)

export default Works
export { getStaticProps } from '../../components/chakra'
