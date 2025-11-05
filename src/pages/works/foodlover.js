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
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
  <Layout title="Nextjs Food App">
    <SEO
      title="Food Lover - Next.js Food Ordering Platform | Trương Tuấn Lộc"
      description="A full-stack food ordering and recipe discovery platform built with Next.js, Node.js, and MongoDB. Features Stripe payment integration, AWS S3 storage, and comprehensive admin dashboard."
      keywords="Next.js Food App, Food Ordering Platform, React Food App, Node.js Backend, MongoDB, Stripe Payment, AWS S3, Full-stack Project"
      image="/images/works/Food1.png"
    />
    <ProjectSchema
      project={{
        title: 'Food Lover',
        description: 'A full-stack food ordering and recipe discovery platform',
        year: '2023',
        github: 'https://github.com/Jura69/Nextjs-FoodOrder',
        image: 'https://my-profile-jura69.vercel.app/images/works/Food1.png',
        stack: 'Next.js, Node.js, MongoDB, AWS S3, Stripe'
      }}
    />
    <BreadcrumbSchema
      items={[
        { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
        { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
        { name: 'Food Lover', url: 'https://my-profile-jura69.vercel.app/works/foodlover' }
      ]}
    />
    <Container>
      <Title>
        Food Lover <Badge>2023</Badge>
      </Title>
      <P>
        A full-stack food ordering and recipe discovery platform built with Next.js, Node.js, and MongoDB. Users can browse recipes, place orders, and track deliveries. The platform includes a comprehensive admin dashboard for restaurant owners to manage menus, orders, and invoices. Features secure payment processing with Stripe integration and cloud storage with AWS S3.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Github</Meta>
          <Link href="https://github.com/Jura69/Nextjs-FoodOrder">
            https://github.com/Jura69/Nextjs-FoodOrder <ExternalLinkIcon mx="2px" />
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
