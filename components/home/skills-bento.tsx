import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import type { BadgeTone } from '../ui/badge'
import { skillGroups, type SkillGroup } from './home-data'
import { SprigLeaf } from '../icons/kit-ornaments'

const toneText: Record<BadgeTone, string> = {
    frontend: 'text-skill-frontend-ink',
    backend: 'text-skill-backend-ink',
    ai: 'text-skill-ai-ink',
    tools: 'text-skill-tools-ink',
    accent: 'text-accent',
    neutral: 'text-ink-muted'
}

function GroupCard({ group }: { group: SkillGroup }) {
    return (
        <div className="h-full rounded-2xl border border-line bg-surface-elevated/70 p-5 backdrop-blur-sm">
            <h3 className={`mb-4 font-rounded text-sm font-bold tracking-wide uppercase ${toneText[group.tone]}`}>
                {group.title}
            </h3>
            <ul className="flex list-none flex-wrap gap-2">
                {group.skills.map(skill => {
                    const Icon = skill.icon
                    return (
                        <li
                            key={skill.label}
                            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-3 py-2 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent/40"
                        >
                            <Icon className="shrink-0 text-lg" style={{ color: skill.color }} aria-hidden="true" />
                            {skill.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

/**
 * Scene 3 — midday. Skills as a responsive bento (1 col mobile, 2 col sm,
 * 6-col bento on lg). Cards reveal with a 0.06s stagger; skill pills lift
 * subtly on hover (CSS only — no continuous animation, no 3D tilt).
 */
export default function SkillsBento() {
    return (
        <section data-section="skills" className="w-full px-4 py-16 md:py-20">
            <div className="mx-auto max-w-[1100px]">
                <Reveal>
                    <SectionHeading as="h2" ornament={SprigLeaf}>
                        Skills &amp; Technologies
                    </SectionHeading>
                </Reveal>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                    {skillGroups.map((group, i) => (
                        <Reveal key={group.title} delay={i * 0.06} className={group.span}>
                            <GroupCard group={group} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
