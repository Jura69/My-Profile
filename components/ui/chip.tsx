import type { IconType } from 'react-icons'
import type { IconComponent } from '../icons/kit-icon-base'
import { cn } from '../../lib/cn'

interface ChipProps {
    children: React.ReactNode
    /** Glyph before the label (brand logo or kit icon); a color dot is shown without one. */
    icon?: IconComponent | IconType
    /** Tint for the icon or dot. The icon is pulled toward --ink so pastels read in both themes. */
    color?: string
    className?: string
}

/**
 * 36px solid pill for skills and hobbies (one chip style site-wide). No blur: paper on paper.
 * Renders an <li>, so place it directly inside a <ul>.
 */
export default function Chip({ children, icon: Icon, color = 'var(--accent)', className }: ChipProps) {
    return (
        <li
            className={cn(
                'inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-3.5 font-rounded text-sm font-semibold text-ink',
                className
            )}
        >
            {Icon ? (
                <Icon
                    aria-hidden="true"
                    className="shrink-0 text-base"
                    style={{ color: `color-mix(in srgb, ${color} 75%, var(--ink))` }}
                />
            ) : (
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
            )}
            {children}
        </li>
    )
}
