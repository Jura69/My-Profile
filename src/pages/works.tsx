import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { WorkGridItem } from '../../components/grid-item'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'

const Works = () => (
    <Layout title="Works">
        <SEO
            title="My Projects & Works | Trương Tuấn Lộc Portfolio"
            description="Browse my portfolio of web development projects including Food Lover (Next.js food ordering app), Flutter Ticket Booking App, TensorFlow Sign Language Detection, and E-commerce Backend Service."
            keywords="Portfolio Projects, Web Development Projects, React Projects, Node.js Projects, Flutter Apps, Machine Learning, TensorFlow, E-commerce Backend, Full-stack Projects"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' }
            ]}
        />
        <Container>
            <Heading as="h3" fontSize={20} mb={4}>
                My Personal Projects
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section>
                    <WorkGridItem id="foodlover" title="Foodlover" thumbnail="/images/works/Food1.webp">
                        A web application that allows users to search for food recipes and order food online, built with Nextjs, MongoDB.
                    </WorkGridItem>
                </Section>

                <Section>
                    <WorkGridItem id="ticketapp" title="Flutter Ticket App" thumbnail="/images/works/Ticket1.jpeg">
                        A Flutter app that allows users to buy tickets for movies, built with Flutter.
                    </WorkGridItem>
                </Section>

                <Section>
                    <WorkGridItem id="tensorflow" title="Tensorflow SignLanguage" thumbnail="/images/works/Tensorflow.jpg">
                        A python app using Tensorflow, machine learning to detect sign language.
                    </WorkGridItem>
                </Section>

                <Section>
                    <WorkGridItem id="ecommerceBE" title="Ecommerce Backend Shop" thumbnail="/images/works/EcommerceBE.webp">
                        Backend Ecommerce Service using Node.js, Express, MongoDB, and more.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
)

export default Works
