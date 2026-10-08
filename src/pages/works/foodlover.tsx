import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailLink, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

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
                year: '2023',
                github: 'https://github.com/Jura69/Nextjs-FoodOrder',
                image: 'https://my-profile-jura69.vercel.app/images/works/Food1.webp',
                stack: 'Next.js, Node.js, MongoDB, AWS S3, Stripe'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Food Lover', url: 'https://my-profile-jura69.vercel.app/works/foodlover' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2023">
                Food Lover
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    A full-stack food ordering and recipe discovery platform built with Next.js, Node.js, and MongoDB.
                    Users can browse recipes, place orders, and track deliveries. The platform includes a comprehensive
                    admin dashboard for restaurant owners to manage menus, orders, and invoices. Features secure payment
                    processing with Stripe integration and cloud storage with AWS S3.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        {
                            label: 'Github',
                            value: (
                                <DetailLink href="https://github.com/Jura69/Nextjs-FoodOrder">
                                    Nextjs-FoodOrder
                                </DetailLink>
                            )
                        },
                        { label: 'Platform', value: 'Web application' },
                        { label: 'Stack', value: 'NodeJS, Nextjs, MongoDB, AWS s3 cloudservices, Stripe payment' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/Food2.webp" alt="Foodlover" />
                <DetailImage src="/images/works/Food3.webp" alt="Foodlover" />
                <DetailImage src="/images/works/Food4.webp" alt="Foodlover" />
            </Reveal>
        </Container>
    </>
)

export default Work
