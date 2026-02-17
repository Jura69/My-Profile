import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, Meta, MetaRed } from '../../../components/work'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
  <Layout title="Ecommerce Backend Shop Service">
    <SEO
      title="E-commerce Backend Microservices | Trương Tuấn Lộc"
      description="A scalable e-commerce backend service built with microservices architecture. Features Node.js, Express, MongoDB, Redis caching, JWT authentication, and RESTful API design."
      keywords="E-commerce Backend, Microservices, Node.js Backend, Express.js, MongoDB, Redis, REST API, Scalable Backend, Backend Development"
      image="/images/works/EcommerceBE.webp"
    />
    <ProjectSchema
      project={{
        title: 'Backend Ecommerce Shop Service',
        description: 'Scalable e-commerce backend with microservices architecture',
        year: '2024',
        github: 'https://github.com/Jura69/E-com-NodeBE',
        image: 'https://my-profile-jura69.vercel.app/images/works/EcommerceBE.webp',
        stack: 'Node.js, Express.js, MongoDB, Redis, Microservices'
      }}
    />
    <BreadcrumbSchema
      items={[
        { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
        { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
        { name: 'E-commerce Backend', url: 'https://my-profile-jura69.vercel.app/works/ecommerceBE' }
      ]}
    />
    <Container>
      <Title>
        Backend Ecommerce Shop Service <Badge>2024</Badge>
      </Title>
      <P>
        A scalable e-commerce backend service built with microservices architecture. Designed to handle high traffic and provide robust API endpoints for product management, user authentication, shopping cart, and order processing. Implements caching with Redis for optimal performance and uses MongoDB for flexible data storage.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Github</Meta>
          <Link href="https://github.com/Jura69/E-com-NodeBE">
            https://github.com/Jura69/E-com-NodeBE <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Backend Service to scale-up Microservice</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>NodeJS, ExpressJS, MongoDB, Redis</span>
        </ListItem>
        <ListItem>
          <MetaRed>Status</MetaRed>
          <span>Under development</span>
        </ListItem>
      </List>
    </Container>

    <P>
      This ongoing project focuses on building a production-ready backend service for e-commerce platforms. The microservices architecture ensures modularity and scalability, with key features including RESTful API design, JWT authentication, rate limiting, error handling, and database optimization. The system is designed to handle high concurrent requests and can scale horizontally as needed.
    </P>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../../components/chakra'
