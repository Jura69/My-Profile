import Layout from '../../components/layouts/article'
import SEO from '../../components/seo'
import { PersonSchema, WebsiteSchema, ProfilePageSchema } from '../../components/json-ld'
import HeroDawn from '../../components/home/hero-dawn'
import AboutMorning from '../../components/home/about-morning'
import SkillsBento from '../../components/home/skills-bento'
import ExperienceDusk from '../../components/home/experience-dusk'
import NightContact from '../../components/home/night-contact'

/**
 * Homepage — a day→night scroll narrative composed of five scenes over the
 * fixed ambient scene: dawn hero, morning about, midday skills, dusk
 * experience, night contact. Sections are full-bleed (the sky breathes at the
 * margins); each owns an inner ~1100px column.
 */
export default function Home() {
    return (
        <Layout>
            <SEO
                title="Trương Tuấn Lộc (Jura69) – Full-stack Developer"
                description="Full-stack developer with 2+ years of experience in React, Node.js, and C#. Currently at CREASIA, building scalable web applications and backend services."
                keywords="Trương Tuấn Lộc, Jura69, Full-stack Developer, React Developer, Node.js Developer, C# Developer, Web Development, Backend Developer, Frontend Developer, Portfolio, CREASIA, Nha Trang University, Vietnam Developer"
                type="profile"
            />
            <PersonSchema />
            <WebsiteSchema />
            <ProfilePageSchema />

            <HeroDawn />
            <AboutMorning />
            <SkillsBento />
            <ExperienceDusk />
            <NightContact />
        </Layout>
    )
}
