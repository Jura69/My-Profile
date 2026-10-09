import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailLink } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('ecommerce')

const Work = () => (
    <>
        <SEO
            title="E-commerce Microservices Platform | Trương Tuấn Lộc"
            description="A full-stack e-commerce platform built with microservices architecture. Features include a Node.js/Express backend with MongoDB & Redis, a React storefront, and supporting services for email, notifications (RabbitMQ), and media uploads."
            keywords="E-commerce, Microservices, Full-stack, Node.js, React, Express.js, MongoDB, Redis, RabbitMQ, REST API, Scalable Architecture"
            image="/images/og/ecommerce.jpg"
        />
        <ProjectSchema
            project={{
                title: 'E-commerce Microservices Platform',
                description: 'Full-stack e-commerce platform with microservices architecture',
                year: project.year,
                github: 'https://github.com/Jura69/E-com-NodeBE',
                image: 'https://jura69.vercel.app/images/works/ecommerce.webp',
                stack: 'Node.js, Express.js, React, MongoDB, Redis, RabbitMQ'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'E-commerce Platform', url: 'https://jura69.vercel.app/works/ecommerce' }
            ]}
        />
        <PageHeader
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Works', to: '/works' },
                { label: 'E-commerce Microservices Platform' }
            ]}
            title="E-commerce Microservices Platform"
            eyebrow={`Personal project · ${project.year}`}
            lead={project.description}
            media={{ kind: 'cover', project }}
        />
        <DetailBody
            factsTitle="Project facts"
            facts={[
                { label: 'Year', value: project.year },
                { label: 'Built at', value: 'Personal project' },
                {
                    label: 'Backend API',
                    value: <DetailLink href="https://github.com/Jura69/E-com-NodeBE">E-com-NodeBE</DetailLink>
                },
                {
                    label: 'Frontend',
                    value: <DetailLink href="https://github.com/Jura69/E-com-FE">E-com-FE</DetailLink>
                },
                {
                    label: 'Platform',
                    value: 'Microservices — Backend API, React Storefront, Email & Notification Services'
                },
                {
                    label: 'Stack',
                    value: 'Node.js, Express, React, MongoDB, Redis, RabbitMQ, Docker',
                    badges: ['Node.js', 'Express', 'React', 'MongoDB', 'Redis', 'RabbitMQ', 'Docker']
                },
                { label: 'Status', value: 'Under development', tone: 'neutral' }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    A full-stack e-commerce platform built with a microservices architecture, spanning multiple
                    repositories. The system is designed for scalability, modularity, and real-world production patterns
                    — including event-driven communication, caching, and background workers.
                </DetailProse>
            </Reveal>
            <Reveal>
                <DetailProse>
                    The platform follows a microservices approach across separate repositories: the core backend handles
                    products, carts, orders, authentication (JWT), and role-based access; RabbitMQ drives asynchronous
                    email and notification services; Redis provides caching and distributed locking (e.g. for
                    inventory). The React storefront connects through RESTful APIs. Designed for horizontal scaling and
                    production-ready patterns including rate limiting, error handling, and database optimization.
                </DetailProse>
            </Reveal>
        </DetailBody>
        <DetailPager
            items={projectsInCategory(project.category)}
            currentId={project.id}
            basePath="/works"
            allLabel="All projects"
        />
    </>
)

export default Work
