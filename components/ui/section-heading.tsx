import { cn } from '../../lib/cn'
import type { IconComponent } from '../icons/kit-icon-base'
import { DividerVine } from '../icons/kit-dividers'

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3'
    children: React.ReactNode
    /** Decorative kit ornament rendered after the text (replaces the old trailing emoji). */
    ornament?: IconComponent
    /** Centers the brush divider under the heading (for headings inside a text-center block). */
    align?: 'start' | 'center'
}

/** Section title + hand-drawn vine divider underneath (sibling, so heading text stays clean). */
export default function SectionHeading({
    as: Tag = 'h3',
    className,
    children,
    ornament: Ornament,
    align = 'start',
    ...props
}: SectionHeadingProps) {
    return (
        <>
            <Tag
                className={cn('mt-3 mb-1 font-rounded text-xl font-bold tracking-tight text-ink', className)}
                {...props}
            >
                {children}
                {Ornament && <Ornament className="ml-2 inline-block size-[1.15em] align-[-0.2em] text-accent" />}
            </Tag>
            <DividerVine className={cn('mb-4 block h-3.5 w-32 text-accent', align === 'center' && 'mx-auto')} />
        </>
    )
}
