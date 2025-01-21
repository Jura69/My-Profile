import { Container, Heading} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'


const Projects = () => (
  <Layout title="Projects">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        My Projects
      </Heading>

    
    </Container>
  </Layout>
)

export default Projects
export { getServerSideProps } from '../../components/chakra'
