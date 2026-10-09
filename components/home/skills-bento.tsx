import Card from '../ui/card'
import Chip from '../ui/chip'
import Container from '../ui/container'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'
import type { BadgeTone } from '../ui/badge'
import { skillGroups, type SkillGroup } from './home-data'

const toneDot: Record<BadgeTone, string> = {
    frontend: 'bg-skill-frontend',
    backend: 'bg-skill-backend',
    ai: 'bg-skill-ai',
    tools: 'bg-skill-tools',
    accent: 'bg-accent',
    neutral: 'bg-ink-muted'
}

function GroupCard({ group }: { group: SkillGroup }) {
    return (
        <Card className="h-full p-6">
            <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2.5 font-rounded text-lg font-extrabold text-ink">
                    <span aria-hidden="true" className={`size-3 rounded-full ${toneDot[group.tone]}`} />
                    {group.title}
                </h3>
                <span className="font-rounded text-[13px] font-bold text-ink-muted">{group.skills.length} skills</span>
            </div>
            <ul className="mt-[18px] flex list-none flex-wrap gap-2 p-0">
                {group.skills.map(skill => (
                    <Chip key={skill.label} icon={skill.icon} color={skill.color}>
                        {skill.label}
                    </Chip>
                ))}
            </ul>
        </Card>
    )
}

/**
 * Scene 4 — afternoon. Skills as four equal paper cards (2 columns from md), each with its tone dot,
 * a count and one chip per skill. Cards reveal with a short stagger.
 */
export default function SkillsBento() {
    return (
        <section data-section="skills" className="w-full py-16 md:py-24">
            <Container size="page">
                <Reveal>
                    <SectionHeading as="h2" eyebrow="03 · Afternoon">
                        Skills &amp; technologies
                    </SectionHeading>
                </Reveal>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {skillGroups.map((group, i) => (
                        <Reveal key={group.title} delay={i * 0.06}>
                            <GroupCard group={group} />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    )
}
