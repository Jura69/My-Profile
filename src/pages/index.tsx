import SEO from '../../components/seo'
import { PersonSchema, WebsiteSchema, ProfilePageSchema } from '../../components/json-ld'
import HeroDawn from '../../components/home/hero-dawn'
import SelectedWork from '../../components/home/selected-work'
import AboutMorning from '../../components/home/about-morning'
import SkillsBento from '../../components/home/skills-bento'
import ExperienceDusk from '../../components/home/experience-dusk'
import NightContact from '../../components/home/night-contact'

/**
 * Homepage — a day→night scroll narrative over the fixed ambient scene: the dawn hero, then five
 * numbered chapters — 01 Morning selected work, 02 Noon about, 03 Afternoon skills, 04 Dusk
 * journey, 05 Night contact. Proof comes before biography. Sections are full-bleed (the sky
 * breathes at the margins); each owns a Container size="page" column.
 */
export default function Home() {
    return (
        <>
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
            <SelectedWork />
            <AboutMorning />
            <SkillsBento />
            <ExperienceDusk />
            <NightContact />
        </>
    )
}
