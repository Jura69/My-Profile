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
    <Layout title="Tensorflow SignLanguage Detect">
      <Container>
        <Title>
          Tensorflow SignLanguage Detect <Badge>2024</Badge>
        </Title>
        <P>
          A machine learning application that uses TensorFlow and computer vision to detect and interpret sign language gestures in real-time. The model is trained on sign language datasets to recognize various hand signs and convert them to text, making communication more accessible for the hearing-impaired community.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Github</Meta>
            <Link href="https://github.com/Jura69/TensorflowProject">
            https://github.com/Jura69/TensorflowProject <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Python application</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Python, Tensorflow, Machine learning</span>
          </ListItem>
        </List>
  
        <WorkImage src="/images/works/Tensorflow1.png" alt="Tensorflow" />
      </Container>
    </Layout>
  )
  
  export default Work
  export { getServerSideProps } from '../../../components/chakra'
  