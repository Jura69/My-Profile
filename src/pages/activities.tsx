import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Container from '../../components/ui/container'
import PageHeader from '../../components/ui/page-header'
import Reveal from '../../components/ui/reveal'
import ProjectCard from '../../components/works/project-card'
import { activities } from '../../components/works/works-data'
import { Campfire } from '../../components/icons/kit-icons-topics'

const Activities = () => (
    <>
        <SEO
            title="Activities & Clubs | Trương Tuấn Lộc Portfolio"
            description="Explore my extracurricular activities including YTC NTU - Social Media, Design and Event Management Club at Nha Trang University."
            keywords="Activities, Extracurricular, YTC NTU, Nha Trang University, Design Club, Event Management, Social Media"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Activities', url: 'https://jura69.vercel.app/activities' }
            ]}
        />

        <PageHeader
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Activities' }]}
            eyebrow="Beyond code"
            title="My activities"
            ornament={Campfire}
            media={{ kind: 'banner', page: 'activities', alt: 'Painted hillside festival ground with bunting and a wooden stage' }}
            lead="Clubs and events from my years at Nha Trang University."
        />

        <section aria-label="Activities" className="w-full pt-10 pb-16 md:pb-24">
            <Container size="page">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {activities.map((activity, i) => (
                        <Reveal key={activity.id} delay={0.05 + i * 0.05} className="h-full">
                            <ProjectCard project={activity} to={`/activities/${activity.id}`} />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    </>
)

export default Activities
