import { IoChevronForward } from 'react-icons/io5'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import Badge from '../ui/badge'
import { buttonClasses } from '../ui/button-styles'
import { usePinnedIntro } from '../scene/use-pinned-intro'
import { experiences, type ExperienceEntry } from './home-data'

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
    const Icon = entry.icon
    return (
        <div className="rounded-2xl border border-line bg-surface-elevated/80 p-5 backdrop-blur-sm">
            <h3 className="flex items-center gap-2 font-rounded text-base font-bold text-ink">
                <Icon className="shrink-0 text-xl" style={{ color: entry.color }} aria-hidden="true" />
                {entry.company}
            </h3>
            <p className="mt-1 text-sm font-semibold" style={{ color: entry.color }}>
                {entry.role}
            </p>
            <span
                className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: `${entry.color}22`, color: entry.color }}
            >
                {entry.period}
            </span>
            {entry.summary && (
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{entry.summary}</p>
            )}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                {entry.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                ))}
            </ul>
            {entry.badges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {entry.badges.map(badge => (
                        <Badge key={badge} tone={entry.tone}>
                            {badge}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}

/**
 * Scene 4 — dusk. Work experience as a left-rail timeline. The heading is the
 * homepage's single pinned moment: it holds for ~half a viewport while the
 * first cards scroll in (disabled on touch / reduced-motion via usePinnedIntro).
 */
export default function ExperienceDusk() {
    const pinRef = usePinnedIntro<HTMLDivElement>()

    return (
        <section data-section="work" className="w-full px-4 py-16 md:py-20">
            <div className="mx-auto max-w-[1100px]">
                <div ref={pinRef}>
                    <SectionHeading as="h2">Work Experience 🌳</SectionHeading>
                </div>

                <div className="relative mt-8">
                    {/* Rail line */}
                    <span aria-hidden="true" className="absolute top-2 bottom-2 left-[10px] w-px bg-line" />
                    <ol className="list-none space-y-8">
                        {experiences.map((entry, i) => (
                            <li key={entry.company} className="relative pl-10">
                                <span
                                    aria-hidden="true"
                                    className="absolute top-1.5 left-0 grid h-5 w-5 place-items-center rounded-full ring-4 ring-surface"
                                    style={{ backgroundColor: entry.color }}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-surface-elevated" />
                                </span>
                                <Reveal delay={i * 0.05}>
                                    <ExperienceCard entry={entry} />
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </div>

                <Reveal delay={0.1}>
                    <div className="mt-10 text-center">
                        <a
                            href="/files/CV.pdf"
                            download="TuanLoc_CV.pdf"
                            className={buttonClasses('solid', 'lg')}
                        >
                            Download Full CV <IoChevronForward aria-hidden="true" />
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
