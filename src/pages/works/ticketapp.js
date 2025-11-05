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
  <Layout title="Flutter App">
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
