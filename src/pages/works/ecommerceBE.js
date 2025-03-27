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
        Backend Ecommerce Shop Service<Badge>2024</Badge>
      </Title>
      <P>
        An E-commerce backend service to scale-up Microservice, built with NodeJS, ExpressJS, MongoDB, Redis.
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
      This is a personal project that I am working on to build a scalable backend service for E-commerce. The project is built with NodeJS, ExpressJS, MongoDB, and Redis. The goal is to create a microservice architecture that can handle a large number of requests and scale up easily, allowing for future expansion and growth.
    </P>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../../components/chakra'
