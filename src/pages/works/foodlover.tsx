import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage, DetailLink } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'
import { findProject, projectsInCategory } from '../../../components/works/works-data'

const project = findProject('foodlover')

const Work = () => (
    <>
        <SEO
            title="Food Lover - Next.js Food Ordering Platform | Trương Tuấn Lộc"
            description="A full-stack food ordering and recipe discovery platform built with Next.js, Node.js, and MongoDB. Features Stripe payment integration, AWS S3 storage, and comprehensive admin dashboard."
            keywords="Next.js Food App, Food Ordering Platform, React Food App, Node.js Backend, MongoDB, Stripe Payment, AWS S3, Full-stack Project"
            image="/images/og/foodlover.jpg"
        />
        <ProjectSchema
            project={{
                title: 'Food Lover',
                description: 'A full-stack food ordering and recipe discovery platform',
                year: project.year,
                github: 'https://github.com/Jura69/Nextjs-FoodOrder',
                image: 'https://jura69.vercel.app/images/works/Food1.webp',
                stack: 'Next.js, Node.js, MongoDB, AWS S3, Stripe'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Works', url: 'https://jura69.vercel.app/works' },
                { name: 'Food Lover', url: 'https://jura69.vercel.app/works/foodlover' }
            ]}
        />
        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Works', to: '/works' }, { label: 'Food Lover' }]}
            title="Food Lover"
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
                    label: 'Github',
                    value: <DetailLink href="https://github.com/Jura69/Nextjs-FoodOrder">Nextjs-FoodOrder</DetailLink>
                },
                { label: 'Platform', value: 'Web application' },
                {
                    label: 'Stack',
                    value: 'NodeJS, Nextjs, MongoDB, AWS s3 cloudservices, Stripe payment',
                    badges: ['NodeJS', 'Nextjs', 'MongoDB', 'AWS s3 cloudservices', 'Stripe payment']
                }
            ]}
        >
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    A full-stack food ordering and recipe discovery platform built with Next.js, Node.js, and MongoDB.
                    Users can browse recipes, place orders, and track deliveries. The platform includes a comprehensive
                    admin dashboard for restaurant owners to manage menus, orders, and invoices. Features secure payment
                    processing with Stripe integration and cloud storage with AWS S3.
                </DetailProse>
            </Reveal>

            <DetailHeading>Screens</DetailHeading>
            <Reveal>
                <DetailImage src="/images/works/Food2.webp" alt="Foodlover" />
                <DetailImage src="/images/works/Food3.webp" alt="Foodlover" />
                <DetailImage src="/images/works/Food4.webp" alt="Foodlover" />
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
