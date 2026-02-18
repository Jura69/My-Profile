import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { CategoryGridItem } from '../../components/grid-item'
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
            <Section delay={0.1}>
                <Heading as="h3" variant="section-title">
                    My Personal Projects 💻
                </Heading>
            </Section>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section delay={0.2}>
                    <CategoryGridItem category="works" id="foodlover" title="Foodlover" thumbnail="/images/works/Food1.webp">
                        A web application that allows users to search for food recipes and order food online, built with Nextjs, MongoDB.
                    </CategoryGridItem>
                </Section>

                <Section delay={0.3}>
                    <CategoryGridItem category="works" id="ticketapp" title="Flutter Ticket App" thumbnail="/images/works/Ticket1.jpeg">
                        A Flutter app that allows users to buy tickets for movies, built with Flutter.
                    </CategoryGridItem>
                </Section>

                <Section delay={0.4}>
                    <CategoryGridItem category="works" id="tensorflow" title="Tensorflow SignLanguage" thumbnail="/images/works/Tensorflow.jpg">
                        A python app using Tensorflow, machine learning to detect sign language.
                    </CategoryGridItem>
                </Section>

                <Section delay={0.5}>
                    <CategoryGridItem category="works" id="ecommerceBE" title="Ecommerce Backend Shop" thumbnail="/images/works/EcommerceBE.webp">
                        Backend Ecommerce Service using Node.js, Express, MongoDB, and more.
                    </CategoryGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
)

export default Works
