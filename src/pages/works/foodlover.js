import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../../components/work'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'

const Work = () => (
  <Layout title="Nextjs Food App">
    <Container>
      <Title>
        Food Lover <Badge>2023</Badge>
      </Title>
      <P>
        Next.js Food App, built with Next.js, Node.js, and MongoDB, is a web application that allows users to search for food recipes and order meals online. It also helps stores manage orders, menus, and invoices efficiently.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Github</Meta>
          <Link href="https://github.com/Jura69/Nextjs-FoodOrder">
            https://github.com/Jura69/Nextjs-FoodOrder <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://jura-foodlover.vercel.app/">
            https://jura-foodlover.vercel.app/ <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Web application</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>NodeJS, Nextjs, MongoDB, AWS s3 cloudservices, Stripe payment</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/Food2.png" alt="Foodlover" />
      <WorkImage src="/images/works/Food3.png" alt="Foodlover" />
      <WorkImage src="/images/works/Food4.png" alt="Foodlover" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../../components/chakra'
