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
        Ticket Booking App to buy tickets for movies, built with Flutter.
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
