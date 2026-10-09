import { cn } from '../../lib/cn'
import type { IconComponent } from '../icons/kit-icon-base'
import { DividerVine } from '../icons/kit-dividers'

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3'
    children: React.ReactNode
    /** Label above the heading: a chapter ("01 · Morning") or a kind ("Beyond code"). */
    eyebrow: React.ReactNode
    /** Decorative kit ornament rendered after the text. */
    ornament?: IconComponent
    /** Centers the block and its brush divider. */
    align?: 'start' | 'center'
}

/**
 * Section header: eyebrow, heading on the section scale, hand-drawn vine divider underneath
 * (a sibling, so the heading text stays clean). Left-aligned by default.
 */
export default function SectionHeading({
    as: Tag = 'h2',
    className,
    children,
    eyebrow,
    ornament: Ornament,
    align = 'start',
    ...props
}: SectionHeadingProps) {
    return (
        <div className={align === 'center' ? 'text-center' : undefined}>
            <p className="eyebrow">{eyebrow}</p>
            <Tag className={cn('mt-2 font-rounded text-section font-extrabold text-ink', className)} {...props}>
                {children}
                {Ornament && <Ornament className="ml-2 inline-block size-[0.9em] align-[-0.15em] text-accent" />}
            </Tag>
            <DividerVine className={cn('mt-3 block h-3.5 w-32 text-accent', align === 'center' && 'mx-auto')} />
        </div>
    )
}
