import { Mail } from '../icons/kit-icons-interface'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import { ButtonLink } from '../ui/button'
import { buttonClasses } from '../ui/button-styles'
import { hobbies, socialIcon, socialLinks } from './home-data'
import { LeafHeart, PaperLantern } from '../icons/kit-ornaments'
import SpiritStill from '../ui/spirit-still'

/**
 * Scene 5 — night. Things-I-love pills and the contact block. Sits at the
 * bottom of the page, so the ambient scene's fireflies (scroll-driven
 * --night-a) are lit here; no per-section wiring needed. The page ends on Mầm Đèn
 * dozing by its lantern — the day is over.
 */
export default function NightContact() {
    return (
        <section data-section="contact" className="w-full px-4 py-16 md:py-20">
            <div className="mx-auto max-w-[1100px] text-center">
                <Reveal>
                    <SectionHeading as="h2" className="inline-block" align="center" ornament={LeafHeart}>
                        Things I Love
                    </SectionHeading>
                </Reveal>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                    {hobbies.map((hobby, i) => {
                        const Icon = hobby.icon
                        return (
                            <Reveal key={hobby.label} delay={i * 0.06}>
                                <span
                                    className="inline-flex items-center gap-2 rounded-full border bg-surface-elevated/70 py-2 pr-5 pl-2.5 text-sm font-semibold text-ink backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5"
                                    style={{ borderColor: `${hobby.color}66` }}
                                >
                                    {/* Tint pulled toward --ink so the pastel keeps contrast in both themes */}
                                    <span
                                        className="grid size-8 place-items-center rounded-full text-lg"
                                        style={{
                                            backgroundColor: `${hobby.color}2e`,
                                            color: `color-mix(in srgb, ${hobby.color} 62%, var(--ink))`
                                        }}
                                    >
                                        <Icon aria-hidden="true" />
                                    </span>
                                    {hobby.label}
                                </span>
                            </Reveal>
                        )
                    })}
                </div>

                <div className="mt-14">
                    <Reveal>
                        <SectionHeading as="h2" className="inline-block" align="center" ornament={PaperLantern}>
                            Contact &amp; Social
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
                            <Mail aria-hidden="true" /> Get in touch
                        </a>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="relative mx-auto mt-12 size-36 md:size-44">
                            <SpiritStill pose="sleepy" className="size-full" />
                            <span
                                aria-hidden="true"
                                className="absolute top-[24%] left-[16%] font-rounded font-bold text-ink-muted select-none"
                            >
                                <span className="ml-3 block text-lg leading-none">z</span>
                                <span className="block text-sm leading-none">z</span>
                            </span>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
