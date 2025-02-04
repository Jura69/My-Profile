import {
    Container,
    ListItem,
    List,
} from '@chakra-ui/react'
import { Title, Meta, ActivitiesImage } from '../../../components/activities'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'

const activities = () => (
    <Layout title="YTC NTU">
        <Container>
            <Title>
                YTC Nha Trang University
            </Title>
            <P>
            Designed media publications and event promotional materials. Captured event photography to document and promote activities.
            </P>
            <br />
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Title</Meta>
                    <span>The member of Digital design & Technical department </span>
                </ListItem>
            </List>

            <ActivitiesImage src="/images/activities/Ytc2.jpg" alt="YTC" />
            <ActivitiesImage src="/images/activities/Ytc3.jpg" alt="YTC" />
            <ActivitiesImage src="/images/activities/Ytc4.jpg" alt="YTC" />
        </Container>
    </Layout>
)

export default activities
export { getServerSideProps } from '../../../components/chakra'
