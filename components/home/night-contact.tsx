import { Mail } from '../icons/kit-icons-interface'
import Card from '../ui/card'
import Chip from '../ui/chip'
import Container from '../ui/container'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import { buttonClasses } from '../ui/button-styles'
import SpiritStill from '../ui/spirit-still'
import { hobbies, socialIcon, socialLinks } from './home-data'

/**
 * Scene 6 — night. "Say hello": the contact card (every social link as a labelled row, plus the
 * page's closing solid CTA) beside the things-I-love card. Sits at the bottom of the page, so the
 * ambient scene's fireflies are lit here. The page ends on Mầm Đèn dozing — the day is over.
 */
export default function NightContact() {
    return (
        <section data-section="contact" className="w-full py-16 md:py-24">
            <Container size="page">
                <Reveal>
                    <SectionHeading as="h2" eyebrow="05 · Night">
                        Say hello
                    </SectionHeading>
                </Reveal>

                <div className="mt-10 flex flex-wrap gap-6">
                    <Reveal className="min-w-0 grow-[999] basis-[28rem]">
                        <Card className="h-full p-7">
                            <h3 className="font-rounded text-xl font-extrabold text-ink">Contact &amp; social</h3>
                            <ul className="mt-4 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-2 p-0">
                                {socialLinks.map(link => {
                                    const Icon = socialIcon[link.icon]
                                    const external = link.href.startsWith('http')
                                    return (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                                className="flex min-h-[52px] items-center gap-3 rounded-xl py-1.5 pr-3 pl-1.5 transition-colors hover:bg-accent-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-accent-soft text-lg text-accent"
                                                >
                                                    <Icon />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block font-rounded text-[13px] text-ink-muted">
                                                        {link.name}
                                                        <span className="sr-only">: </span>
                                                    </span>
                                                    <span className="block font-rounded text-[15px] font-bold [overflow-wrap:anywhere] text-ink">
                                                        {link.label}
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                            <a href="mailto:Loctruongtuan@gmail.com" className={buttonClasses('solid', 'lg', 'mt-6')}>
                                <Mail aria-hidden="true" /> Get in touch
                            </a>
                        </Card>
                    </Reveal>

                    <Reveal delay={0.08} className="min-w-0 grow basis-80">
                        <Card className="flex h-full flex-col p-7">
                            <h3 className="font-rounded text-xl font-extrabold text-ink">Things I love</h3>
                            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                                {hobbies.map(hobby => (
                                    <Chip key={hobby.label} icon={hobby.icon} color={hobby.color}>
                                        {hobby.label}
                                    </Chip>
                                ))}
                            </ul>
                            <div className="relative mx-auto mt-auto size-40 pt-4">
                                <SpiritStill pose="sleepy" className="size-full" />
                                <span
                                    aria-hidden="true"
                                    className="absolute top-[34%] left-[14%] font-rounded font-bold text-ink-muted select-none"
                                >
                                    <span className="ml-3 block text-lg leading-none">z</span>
                                    <span className="block text-sm leading-none">z</span>
                                </span>
                            </div>
                        </Card>
                    </Reveal>
                </div>
            </Container>
        </section>
    )
}
