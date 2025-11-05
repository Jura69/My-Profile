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

const Work = () => (
  <Layout title="Ecommerce Backend Shop Service">
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
