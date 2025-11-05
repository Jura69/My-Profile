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
  <Layout title="Flutter App">
    <SEO
      title="Flutter Ticket Booking App | Trương Tuấn Lộc"
      description="A modern mobile application for booking movie tickets, built with Flutter for cross-platform compatibility. Features seat selection, secure booking, and intuitive user interface."
      keywords="Flutter App, Ticket Booking App, Mobile App Development, Flutter Projects, Movie Ticket App, Cross-platform App"
      image="/images/works/Ticket1.jpeg"
    />
    <ProjectSchema
      project={{
        title: 'Flutter Ticket Booking App',
        description: 'A modern mobile application for booking movie tickets',
        year: '2024',
        github: 'https://github.com/Jura69/Flutter-TicketApp',
        image: 'https://my-profile-jura69.vercel.app/images/works/Ticket1.jpeg',
        stack: 'Flutter, Node.js, Express, MongoDB'
      }}
    />
    <BreadcrumbSchema
      items={[
        { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
        { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
        { name: 'Flutter Ticket App', url: 'https://my-profile-jura69.vercel.app/works/ticketapp' }
      ]}
    />
    <Container>
      <Title>
        Flutter Ticket Booking App <Badge>2024</Badge>
      </Title>
      <P>
        A modern mobile application for booking movie tickets, built with Flutter for cross-platform compatibility. Features include browsing available movies, selecting seats, and secure ticket booking with a clean, intuitive user interface.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Github</Meta>
          <Link href="https://github.com/Jura69/Flutter-TicketApp">
          https://github.com/Jura69/Flutter-TicketApp <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Android, iOS</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Flutter, Nodejs Express, MongoDB</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/Ticket2.png" alt="Ticket" />
      <WorkImage src="/images/works/Ticket3.png" alt="Ticket" />
      
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../../components/chakra'
