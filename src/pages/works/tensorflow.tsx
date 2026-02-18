import {
    Container,
    Badge,
    Link,
    List,
    ListItem,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { DetailTitle, DetailImage, Meta } from '../../../components/detail-components'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <Layout title="Tensorflow SignLanguage Detect">
        <SEO
            title="TensorFlow Sign Language Detection | Trương Tuấn Lộc"
            description="A machine learning application using TensorFlow and computer vision to detect and interpret sign language gestures in real-time. Making communication more accessible."
            keywords="TensorFlow, Machine Learning, Sign Language Detection, Computer Vision, AI Project, Python, Deep Learning"
            image="/images/works/Tensorflow.jpg"
        />
        <ProjectSchema
            project={{
                title: 'TensorFlow Sign Language Detection',
                description: 'Machine learning app for real-time sign language detection',
                year: '2024',
                github: 'https://github.com/Jura69/TensorflowProject',
                image: 'https://my-profile-jura69.vercel.app/images/works/Tensorflow.jpg',
                stack: 'Python, TensorFlow, Machine Learning, Computer Vision'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'TensorFlow SignLanguage', url: 'https://my-profile-jura69.vercel.app/works/tensorflow' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works">
                Tensorflow SignLanguage Detect <Badge>2024</Badge>
            </DetailTitle>
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

            <DetailImage src="/images/works/Tensorflow1.webp" alt="Tensorflow" />
        </Container>
    </Layout>
)

export default Work
