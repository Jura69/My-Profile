import Layout from '../../components/layouts/article'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Reveal from '../../components/ui/reveal'
import SectionHeading from '../../components/ui/section-heading'
import ProjectCard from '../../components/works/project-card'
import { activities } from '../../components/works/works-data'

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

        <section className="w-full px-4 py-8">
            <div className="mx-auto max-w-[1100px]">
                <Reveal>
                    <SectionHeading as="h1">My Activities 🌿</SectionHeading>
                </Reveal>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {activities.map((activity, i) => (
                        <Reveal key={activity.id} delay={0.05 + i * 0.05} className="h-full">
                            <ProjectCard project={activity} to={`/activities/${activity.id}`} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    </Layout>
)

export default Activities
