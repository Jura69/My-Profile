import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { CategoryGridItem } from '../../components/grid-item'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'

const Activities = () => (
    <Layout title="Activities">
        <SEO
            title="Activities & Clubs | Trương Tuấn Lộc Portfolio"
            description="Explore my extracurricular activities including YTC NTU - Social Media, Design and Event Management Club at Nha Trang University."
            keywords="Activities, Extracurricular, YTC NTU, Nha Trang University, Design Club, Event Management, Social Media"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Activities', url: 'https://my-profile-jura69.vercel.app/activities' }
            ]}
        />
        <Container>
            <Section delay={0.1}>
                <Heading as="h3" variant="section-title">
                    My Activities 🌿
                </Heading>
            </Section>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section delay={0.2}>
                    <CategoryGridItem category="activities" id="ytc" title="YTC NTU" thumbnail="/images/activities/Ytc1.jpeg">
                        Social Media, Design and Event Management Club at Nha Trang University.
                    </CategoryGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
)

export default Activities
