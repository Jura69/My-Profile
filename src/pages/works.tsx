import { Link as RouterLink } from 'react-router'
import { IoChevronForward } from 'react-icons/io5'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Reveal from '../../components/ui/reveal'
import SectionHeading from '../../components/ui/section-heading'
import { buttonClasses } from '../../components/ui/button-styles'
import FeaturedProjectCard from '../../components/works/featured-project-card'
import ProjectCard from '../../components/works/project-card'
import {
    featuredProjects,
    otherPersonalProjects,
    featuredEnterpriseProjects,
    enterpriseProjects
} from '../../components/works/works-data'

const Works = () => (
    <>
        <SEO
            title="My Projects & Works | Trương Tuấn Lộc Portfolio"
            description="Browse my portfolio of personal and enterprise projects. Includes Food Lover, TensorFlow Sign Language Detection, and 12 enterprise projects built at Creasia — from an AI agent platform to computer-vision shelf compliance and OCR systems."
            keywords="Portfolio Projects, Web Development, React, Node.js, Flutter, Machine Learning, TensorFlow, Enterprise Projects, Creasia, .NET, ERP, AI Agent Platform, Computer Vision, OCR"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' }
            ]}
        />

        <section className="w-full px-4 py-8">
            <div className="mx-auto max-w-[1100px]">
                <Reveal>
                    <SectionHeading as="h1">My Personal Projects 💻</SectionHeading>
                </Reveal>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {featuredProjects.map((project, i) => (
                        <Reveal key={project.id} delay={0.05 + i * 0.05} className="h-full">
                            <FeaturedProjectCard project={project} />
                        </Reveal>
                    ))}
                </div>

                {otherPersonalProjects.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {otherPersonalProjects.map((project, i) => (
                            <Reveal key={project.id} delay={0.05 + i * 0.05} className="h-full">
                                <ProjectCard project={project} />
                            </Reveal>
                        ))}
                    </div>
                )}

                <hr className="my-12 border-line" />

                <Reveal>
                    <SectionHeading as="h2">Enterprise Projects @ Creasia 💼</SectionHeading>
                </Reveal>

                {/* AI flagships lead the section as large cards; the rest stay compact. */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {featuredEnterpriseProjects.map((project, i) => (
                        <Reveal key={project.id} delay={0.05 + i * 0.05} className="h-full">
                            <FeaturedProjectCard project={project} />
                        </Reveal>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {enterpriseProjects.map((project, i) => (
                        <Reveal key={project.id} delay={0.05 + i * 0.04} className="h-full">
                            <ProjectCard project={project} />
                        </Reveal>
                    ))}
                </div>

                <Reveal>
                    <div className="mt-12 text-center">
                        <RouterLink to="/activities" className={buttonClasses('ghost', 'md')}>
                            Beyond code — my university activities <IoChevronForward aria-hidden="true" />
                        </RouterLink>
                    </div>
                </Reveal>
            </div>
        </section>
    </>
)

export default Works
