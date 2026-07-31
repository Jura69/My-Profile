import {
    IoLogoGithub,
    IoLogoLinkedin,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoGoogle,
    IoMailOutline
} from 'react-icons/io5'
import type { IconType } from 'react-icons'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import { ButtonLink } from '../ui/button'
import { buttonClasses } from '../ui/button-styles'
import { hobbies, socialLinks, type SocialLink } from './home-data'

const socialIcon: Record<SocialLink['icon'], IconType> = {
    github: IoLogoGithub,
    linkedin: IoLogoLinkedin,
    facebook: IoLogoFacebook,
    instagram: IoLogoInstagram,
    google: IoLogoGoogle
}

/**
 * Scene 5 — night. Things-I-love pills and the contact block. Sits at the
 * bottom of the page, so the ambient scene's fireflies (scroll-driven
 * --night-a) are lit here; no per-section wiring needed.
 */
export default function NightContact() {
    return (
        <section data-section="contact" className="w-full px-4 py-16 md:py-20">
            <div className="mx-auto max-w-[1100px] text-center">
                <Reveal>
                    <SectionHeading as="h2" className="inline-block">
                        Things I Love <span className="text-ghibli-soft-pink">♥</span>
                    </SectionHeading>
                </Reveal>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                    {hobbies.map((hobby, i) => (
                        <Reveal key={hobby.label} delay={i * 0.06}>
                            <span
                                className="inline-flex items-center gap-2 rounded-full border bg-surface-elevated/70 px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5"
                                style={{ borderColor: `${hobby.color}55` }}
                            >
                                <span className="text-lg">{hobby.emoji}</span>
                                {hobby.label}
                            </span>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-14">
                    <Reveal>
                        <SectionHeading as="h2" className="inline-block">
                            Contact &amp; Social 🌸
                        </SectionHeading>
                    </Reveal>

                    <Reveal delay={0.05}>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {socialLinks.map(link => {
                                const Icon = socialIcon[link.icon]
                                const external = link.href.startsWith('http')
                                return (
                                    <ButtonLink
                                        key={link.label}
                                        href={link.href}
                                        variant="ghost"
                                        size="sm"
                                        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                    >
                                        <Icon aria-hidden="true" /> {link.label}
                                    </ButtonLink>
                                )
                            })}
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <a href="mailto:Loctruongtuan@gmail.com" className={`${buttonClasses('solid', 'lg')} mt-8`}>
                            <IoMailOutline aria-hidden="true" /> Get in touch
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
