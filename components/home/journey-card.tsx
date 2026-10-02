import Badge from '../ui/badge'
import Card from '../ui/card'
import { SprigLeaf } from '../icons/kit-ornaments'
import { type ExperienceEntry, splitPeriod, techIconMap } from './home-data'

/**
 * One milestone of the journey: a paper card with the role in the entry's
 * accent, leaf-marked highlights and tech badges. The period chip is only
 * shown on phones — on desktop the period sits beside the trail instead.
 */
export default function JourneyCard({ entry }: { entry: ExperienceEntry }) {
    const { when, note } = splitPeriod(entry.period)
    return (
        <Card className="relative overflow-hidden p-5 md:p-6">
            {/* Accent wash along the top edge, in the milestone's colour */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, ${entry.color}, ${entry.color}00)` }}
            />
            <h3 className="font-rounded text-lg font-bold text-ink">{entry.company}</h3>
            <p className="mt-0.5 text-sm font-semibold" style={{ color: entry.color }}>
                {entry.role}
            </p>
            <p className="mt-2 text-xs font-semibold text-ink-muted md:hidden">
                {when}
                {note && <span className="font-normal"> · {note}</span>}
            </p>
            {entry.summary && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{entry.summary}</p>}
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                {entry.bullets.map(bullet => (
                    <li key={bullet} className="flex gap-2">
                        <SprigLeaf
                            aria-hidden="true"
                            className="mt-[0.2em] size-3.5 shrink-0"
                            style={{ color: entry.color }}
                        />
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>
            {entry.badges.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {entry.badges.map(badge => {
                        const tech = techIconMap[badge]
                        return (
                            <Badge key={badge} tone={entry.tone} className="gap-1.5 px-2.5 py-1">
                                {tech && (
                                    <tech.icon
                                        className="shrink-0 text-[10px]"
                                        style={{ color: tech.color }}
                                        aria-hidden="true"
                                    />
                                )}
                                {badge}
                            </Badge>
                        )
                    })}
                </div>
            )}
        </Card>
    )
}
