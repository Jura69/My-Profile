import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailLink, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="TensorFlow Sign Language Detection | Trương Tuấn Lộc"
            description="A machine learning application using TensorFlow and computer vision to detect and interpret sign language gestures in real-time. Making communication more accessible."
            keywords="TensorFlow, Machine Learning, Sign Language Detection, Computer Vision, AI Project, Python, Deep Learning"
            image="/images/works/Tensorflow.webp"
        />
        <ProjectSchema
            project={{
                title: 'TensorFlow Sign Language Detection',
                description: 'Machine learning app for real-time sign language detection',
                year: '2024',
                github: 'https://github.com/Jura69/TensorflowProject',
                image: 'https://my-profile-jura69.vercel.app/images/works/Tensorflow.webp',
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
            <DetailTitle parentPath="/works" parentLabel="Works" year="2024">
                Tensorflow SignLanguage Detect
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    A machine learning application that uses TensorFlow and computer vision to detect and interpret sign
                    language gestures in real-time. The model is trained on sign language datasets to recognize various
                    hand signs and convert them to text, making communication more accessible for the hearing-impaired
                    community.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        {
                            label: 'Github',
                            value: (
                                <DetailLink href="https://github.com/Jura69/TensorflowProject">
                                    https://github.com/Jura69/TensorflowProject
                                </DetailLink>
                            )
                        },
                        { label: 'Platform', value: 'Python application' },
                        { label: 'Stack', value: 'Python, Tensorflow, Machine learning' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/Tensorflow1.webp" alt="Tensorflow" />
            </Reveal>
        </Container>
    </>
)

export default Work
