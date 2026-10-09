import { useRef } from 'react'
import { Download } from '../icons/kit-icons-interface'
import Container from '../ui/container'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import { buttonClasses } from '../ui/button-styles'
import { experiences, splitPeriod } from './home-data'
import JourneyCard from './journey-card'
import JourneyTrail, { JOURNEY_NODE_ATTR } from './journey-trail'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/**
 * Scene 5 — dusk. Work history as a forest trail: a meandering path runs down
 * a narrow lane (left edge on phones) and a seed lantern walks it with the
 * reader, lighting each milestone it reaches (JourneyTrail). Desktop reads
 * left→right as period | trail | card, so the cards keep the full width;
 * cards glide in from the right, periods from the left. The full CV sits in the header row.
 * overflow-x-clip: cards wait 32px to the right of their slot until revealed, which must not
 * widen the page.
 */
export default function ExperienceDusk() {
    const listRef = useRef<HTMLDivElement>(null)

    return (
        <section data-section="journey" className="w-full overflow-x-clip py-16 md:py-24">
            <Container size="page">
                <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                        <SectionHeading as="h2" eyebrow="04 · Dusk">
                            My journey
                        </SectionHeading>
                        <a
                            href="/files/CV.pdf"
                            download="TuanLoc_CV.pdf"
                            className={buttonClasses('outline', 'md', 'h-11 bg-surface-elevated')}
                        >
                            <Download aria-hidden="true" /> Full CV (PDF)
                        </a>
                    </div>
                </Reveal>

                {/* Trail container: the SVG sits under the list (later positioned siblings paint on top) */}
                <div ref={listRef} className="relative mt-10">
                    <JourneyTrail containerRef={listRef} />
                    <ol className="relative list-none space-y-12 md:space-y-14">
                        {experiences.map(entry => {
                            const Icon = entry.icon
                            const { when, note } = splitPeriod(entry.period)
                            return (
                                <li
                                    key={entry.company}
                                    className="relative grid grid-cols-[44px_1fr] gap-x-3 md:grid-cols-[220px_88px_minmax(0,1fr)] md:gap-x-0"
                                >
                                    {/* Milestone marker — lit by the trail once the lantern reaches it */}
                                    <div className="relative z-10 col-start-1 row-start-1 flex justify-center pt-4 md:col-start-2">
                                        <span
                                            {...{ [JOURNEY_NODE_ATTR]: '' }}
                                            data-lit="false"
                                            className="grid size-11 place-items-center rounded-full border-2 bg-surface-elevated text-xl shadow-paper transition-[background-color,box-shadow,transform] duration-500 ease-out data-[lit=true]:scale-110 data-[lit=true]:bg-[color-mix(in_srgb,var(--node)_22%,var(--surface-elevated))] data-[lit=true]:shadow-[0_0_0_7px_color-mix(in_srgb,var(--node)_18%,transparent),0_0_22px_color-mix(in_srgb,var(--color-ghibli-golden-dust)_55%,transparent)]"
                                            style={
                                                {
                                                    '--node': entry.color,
                                                    borderColor: entry.color
                                                } as React.CSSProperties
                                            }
                                        >
                                            <Icon aria-hidden="true" style={{ color: entry.color }} />
                                        </span>
                                    </div>

                                    <Reveal
                                        className="col-start-2 row-start-1 min-w-0 md:col-start-3 md:pl-2"
                                        x={32}
                                        y={12}
                                        duration={0.8}
                                        ease={EASE_OUT}
                                    >
                                        <JourneyCard entry={entry} />
                                    </Reveal>

                                    {/* Period on the near side of the trail (desktop; phones show it inside the card) */}
                                    <Reveal
                                        className="hidden pt-5 pr-5 text-right md:col-start-1 md:row-start-1 md:block"
                                        x={-16}
                                        y={0}
                                        duration={0.8}
                                        delay={0.15}
                                        ease={EASE_OUT}
                                    >
                                        {/* Duplicate of the card's own period, so screen readers skip it */}
                                        <div aria-hidden="true">
                                            {/* Each end of the range stays on one line; a narrow column breaks after the dash */}
                                            <p className="font-rounded text-lg leading-snug font-bold text-ink">
                                                {when.split(' – ').map((part, k) => (
                                                    <span key={part} className="whitespace-nowrap">
                                                        {k > 0 && ' – '}
                                                        {part}
                                                    </span>
                                                ))}
                                            </p>
                                            {note && <p className="mt-1 text-sm text-ink-muted">{note}</p>}
                                        </div>
                                    </Reveal>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </Container>
        </section>
    )
}
