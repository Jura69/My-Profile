import {
    Container,
    Badge,
    Link,
    List,
    ListItem,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { DetailTitle, Meta, MetaRed } from '../../../components/detail-components'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <Layout title="E-commerce Microservices Platform">
        <SEO
            title="E-commerce Microservices Platform | Trương Tuấn Lộc"
            description="A full-stack e-commerce platform built with microservices architecture. Features include a Node.js/Express backend with MongoDB & Redis, a React storefront, and supporting services for email, notifications (RabbitMQ), and media uploads."
            keywords="E-commerce, Microservices, Full-stack, Node.js, React, Express.js, MongoDB, Redis, RabbitMQ, REST API, Scalable Architecture"
            image="/images/works/ecommerce.webp"
        />
        <ProjectSchema
            project={{
                title: 'E-commerce Microservices Platform',
                description: 'Full-stack e-commerce platform with microservices architecture',
                year: '2024',
                github: 'https://github.com/Jura69/E-com-NodeBE',
                image: 'https://my-profile-jura69.vercel.app/images/works/ecommerce.webp',
                stack: 'Node.js, Express.js, React, MongoDB, Redis, RabbitMQ'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'E-commerce Platform', url: 'https://my-profile-jura69.vercel.app/works/ecommerce' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works">
                E-commerce Microservices Platform <Badge>2024</Badge>
            </DetailTitle>
            <P>
                A full-stack e-commerce platform built with a microservices architecture, spanning multiple repositories. The system is designed for scalability, modularity, and real-world production patterns — including event-driven communication, caching, and background workers.
            </P>
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Backend API</Meta>
                    <Link href="https://github.com/Jura69/E-com-NodeBE">
                        E-com-NodeBE <ExternalLinkIcon mx="2px" />
                    </Link>
                </ListItem>
                <ListItem>
                    <Meta>Frontend</Meta>
                    <Link href="https://github.com/Jura69/E-com-FE">
                        E-com-FE <ExternalLinkIcon mx="2px" />
                    </Link>
                </ListItem>
                <ListItem>
                    <Meta>Platform</Meta>
                    <span>Microservices — Backend API, React Storefront, Email & Notification Services</span>
                </ListItem>
                <ListItem>
                    <Meta>Stack</Meta>
                    <span>Node.js, Express, React, MongoDB, Redis, RabbitMQ, Docker</span>
                </ListItem>
                <ListItem>
                    <MetaRed>Status</MetaRed>
                    <span>Under development</span>
                </ListItem>
            </List>
        </Container>

        <P>
            The platform follows a microservices approach across separate repositories: the core backend handles products, carts, orders, authentication (JWT), and role-based access; RabbitMQ drives asynchronous email and notification services; Redis provides caching and distributed locking (e.g. for inventory). The React storefront connects through RESTful APIs. Designed for horizontal scaling and production-ready patterns including rate limiting, error handling, and database optimization.
        </P>
    </Layout>
)

export default Work
