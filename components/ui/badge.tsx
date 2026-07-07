import { cn } from '../../lib/cn'

export type BadgeTone = 'accent' | 'frontend' | 'backend' | 'ai' | 'tools' | 'neutral'

const toneClasses: Record<BadgeTone, string> = {
    accent: 'bg-accent/15 text-accent',
    frontend: 'bg-skill-frontend/15 text-skill-frontend',
    backend: 'bg-skill-backend/15 text-skill-backend',
    ai: 'bg-skill-ai/15 text-skill-ai',
    tools: 'bg-skill-tools/15 text-skill-tools',
    neutral: 'bg-ink/10 text-ink-muted'
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone
    children: React.ReactNode
}

/** Small pill label — tones map to the skill palette from the design tokens. */
export default function Badge({ tone = 'accent', className, children, ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                toneClasses[tone],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}
