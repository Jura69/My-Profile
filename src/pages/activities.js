import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { ActivitiesGridItem } from '../../components/grid-item'

import thumbYTC from '../../public/images/activities/Ytc1.jpeg'

const Activities = () => (
  <Layout title="Activities">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        My Activities
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <ActivitiesGridItem id="ytc" title="YTC NTU" thumbnail={thumbYTC} href={`/activities/ytc`}>
            Social Media, Design and Event Management Club at Nha Trang University.
          </ActivitiesGridItem>
        </Section>
      </SimpleGrid>

    </Container>
  </Layout>
)

export default Activities
export { getServerSideProps } from '../../components/chakra'
