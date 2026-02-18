import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { CategoryGridItem } from '../../components/grid-item'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'

const enterpriseProjects = [
    { id: 'asset-management', title: 'Asset Management', thumbnail: '/images/works/asset-management-thumb.webp', description: 'Enterprise asset tracking & lifecycle management platform' },
    { id: 'bat-loyalty', title: 'BAT Loyalty Program', thumbnail: '/images/works/bat-loyalty-thumb.webp', description: 'Customer loyalty rewards & points management system' },
    { id: 'bat-psa', title: 'BAT PSA', thumbnail: '/images/works/bat-psa-thumb.webp', description: 'Admin dashboard for problem statement analysis with reporting' },
    { id: 'castrol-fleet', title: 'Castrol Fleet Management', thumbnail: '/images/works/castrol-fleet-thumb.webp', description: 'Vehicle fleet tracking with geolocation & maintenance scheduling' },
    { id: 'vending-ai-agent', title: 'Vending Management', thumbnail: '/images/works/vending-ai-agent-thumb.webp', description: 'Vending machine management platform with sales analytics & inventory tracking' },
    { id: 'warehouse-management', title: 'Warehouse Management', thumbnail: '/images/works/warehouse-management-thumb.webp', description: 'Inventory tracking with barcode scanning & order workflows' },
    { id: 'creasia-erp', title: 'Creasia ERP', thumbnail: '/images/works/creasia-erp-thumb.webp', description: 'Comprehensive ERP covering finance, HR, procurement & supply chain' },
]

const Works = () => (
    <Layout title="Works">
        <SEO
            title="My Projects & Works | Trương Tuấn Lộc Portfolio"
            description="Browse my portfolio of personal and enterprise web development projects. Includes Food Lover, Flutter Ticket App, TensorFlow Sign Language Detection, and 7 enterprise projects built at Creasia."
            keywords="Portfolio Projects, Web Development, React, Node.js, Flutter, Machine Learning, TensorFlow, Enterprise Projects, Creasia, .NET, ERP, Fleet Management"
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
                    <CategoryGridItem category="works" id="foodlover" title="Foodlover" thumbnail="/images/works/foodlover-thumb.webp">
                        A web application that allows users to search for food recipes and order food online, built with Nextjs, MongoDB.
                    </CategoryGridItem>
                </Section>

                <Section delay={0.3}>
                    <CategoryGridItem category="works" id="ticketapp" title="Flutter Ticket App" thumbnail="/images/works/ticketapp-thumb.webp">
                        A Flutter app that allows users to buy tickets for movies, built with Flutter.
                    </CategoryGridItem>
                </Section>

                <Section delay={0.4}>
                    <CategoryGridItem category="works" id="tensorflow" title="Tensorflow SignLanguage" thumbnail="/images/works/tensorflow-thumb.webp">
                        A python app using Tensorflow, machine learning to detect sign language.
                    </CategoryGridItem>
                </Section>

                <Section delay={0.5}>
                    <CategoryGridItem category="works" id="ecommerceBE" title="Ecommerce Backend Shop" thumbnail="/images/works/ecommerceBE-thumb.webp">
                        Backend Ecommerce Service using Node.js, Express, MongoDB, and more.
                    </CategoryGridItem>
                </Section>
            </SimpleGrid>

            <Divider my={6} />

            <Section delay={0.6}>
                <Heading as="h3" variant="section-title">
                    Enterprise Projects @ Creasia 💼
                </Heading>
            </Section>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                {enterpriseProjects.map((p, i) => (
                    <Section delay={0.7 + i * 0.1} key={p.id}>
                        <CategoryGridItem category="works" id={p.id} title={p.title} thumbnail={p.thumbnail}>
                            {p.description}
                        </CategoryGridItem>
                    </Section>
                ))}
            </SimpleGrid>
        </Container>
    </Layout>
)

export default Works
