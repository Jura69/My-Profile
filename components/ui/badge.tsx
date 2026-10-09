import { cn } from '../../lib/cn'

export type BadgeTone = 'accent' | 'frontend' | 'backend' | 'ai' | 'tools' | 'neutral'

const toneClasses: Record<BadgeTone, string> = {
    accent: 'bg-accent-soft text-accent',
    frontend: 'bg-skill-frontend/15 text-skill-frontend-ink',
    backend: 'bg-skill-backend/15 text-skill-backend-ink',
    ai: 'bg-skill-ai/15 text-skill-ai-ink',
    tools: 'bg-skill-tools/15 text-skill-tools-ink',
    neutral: 'bg-ink/10 text-ink-muted'
}

export type BadgeSize = 'sm' | 'md'

/** sm: inline label (legacy). md: the 26px pill used for tech tags and stack facts. */
const sizeClasses: Record<BadgeSize, string> = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold',
    md: 'h-[26px] px-2.5 text-xs font-bold'
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone
    size?: BadgeSize
    children: React.ReactNode
}

/** Small pill label — tones map to the skill palette from the design tokens. */
export default function Badge({ tone = 'accent', size = 'sm', className, children, ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full',
                sizeClasses[size],
                toneClasses[tone],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}
