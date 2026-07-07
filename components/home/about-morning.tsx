import { Link as RouterLink } from 'react-router'
import { IoChevronForward } from 'react-icons/io5'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import { buttonClasses } from '../ui/button-styles'

/** Small headline stat — factual, drawn from the bio + works listing. */
const stats = [
    { value: '1+ yr', label: 'Experience' },
    { value: '10+', label: 'Projects' },
    { value: 'AI/ML', label: 'Focus' }
]

/**
 * Scene 2 — morning. Bio prose (65ch, left-aligned, no justify/indent) with a
 * row of stat pills and the works CTA. Entrance reveals fire once.
 */
export default function AboutMorning() {
    return (
        <section data-section="about" className="w-full px-4 py-16 md:py-20">
            <div className="mx-auto max-w-[1100px]">
                <Reveal>
                    <SectionHeading as="h2">About Me 🌿</SectionHeading>
                </Reveal>

                <Reveal delay={0.05}>
                    <p className="max-w-[65ch] font-rounded text-base leading-relaxed text-ink-muted">
                        Full-stack developer with expertise in building scalable web applications and
                        backend services. Currently working as a React and C# developer at CREASIA, with
                        over 1+ year of experience in Node.js backend development. Passionate about AI/ML
                        technologies and creating efficient, user-friendly solutions. Skilled in both
                        frontend and backend development, with hands-on experience in Machine Learning,
                        TensorFlow, and prompt engineering.
                    </p>
                </Reveal>

                <Reveal delay={0.1}>
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

                <Reveal delay={0.15}>
                    <RouterLink to="/works" className={`${buttonClasses('solid', 'md')} mt-8`}>
                        My Personal Projects <IoChevronForward aria-hidden="true" />
                    </RouterLink>
                </Reveal>
            </div>
        </section>
    )
}
