import { Link as RouterLink } from 'react-router'
import { IoChevronForward } from 'react-icons/io5'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import { buttonClasses } from '../ui/button-styles'

/** Small headline stat — factual, drawn from the bio + works listing.
 *  Project count is a deliberate floor, not the exact works-data total, so the
 *  pill stays honest without needing a sync every time a new project lands. */
const stats = [
    { value: '2+ yrs', label: 'Experience' },
    { value: '15+', label: 'Projects' },
    { value: 'AI Agents', label: 'Focus' }
]

/**
 * Scene 2 — morning. Circular profile photo beside bio prose (65ch,
 * left-aligned, no justify/indent) with a row of stat pills and the works CTA.
 * The photo stacks above the text on mobile. Entrance reveals fire once.
 */
export default function AboutMorning() {
    return (
        <section data-section="about" className="w-full px-4 py-16 md:py-20">
            <div className="mx-auto max-w-[1100px]">
                <Reveal>
                    <SectionHeading as="h2">About Me 🌿</SectionHeading>
                </Reveal>

                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
                    <Reveal delay={0.05} className="shrink-0">
                        <img
                            src="/images/loc.webp"
                            alt="Profile photo of Trương Tuấn Lộc"
                            width={160}
                            height={160}
                            loading="lazy"
                            className="h-36 w-36 rounded-full border-2 border-line object-cover shadow-sm ring-4 ring-accent/15 md:h-40 md:w-40"
                        />
                    </Reveal>

                    <div>
                        <Reveal delay={0.1}>
                            <p className="max-w-[65ch] font-rounded text-base leading-relaxed text-ink-muted">
                                Full-stack developer building enterprise AI agent platforms at CREASIA — multi-channel
                                assistants with agent orchestration, custom skills and tools, and deep LLM integration.
                                Over two years of experience across Node.js backend services and React/C# full-stack
                                development, shipping applied-AI products such as computer-vision shelf compliance and
                                Vietnamese ID-card OCR. Hands-on with prompt and context engineering, LLM evaluation,
                                and machine learning with TensorFlow — passionate about turning modern AI capabilities
                                into efficient, user-friendly solutions.
                            </p>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <div className="mt-8 flex flex-wrap gap-3">
                                {stats.map(stat => (
                                    <div
                                        key={stat.label}
                                        className="flex items-baseline gap-2 rounded-full border border-line bg-surface-elevated/70 px-5 py-2.5 backdrop-blur-sm"
                                    >
                                        <span className="font-rounded text-xl font-bold text-accent">{stat.value}</span>
                                        <span className="font-rounded text-sm text-ink-muted">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <RouterLink to="/works" className={`${buttonClasses('solid', 'md')} mt-8`}>
                                My Personal Projects <IoChevronForward aria-hidden="true" />
                            </RouterLink>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
