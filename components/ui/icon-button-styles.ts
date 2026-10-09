import { cn } from '../../lib/cn'

export type IconButtonVariant = 'solid' | 'outline' | 'ghost'

const baseClasses =
    'grid size-10 cursor-pointer place-items-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring'

/* Color + focus ring only — no wash/mask (the theme toggle overrides the solid fill). */
const variantClasses: Record<IconButtonVariant, string> = {
    solid: 'bg-accent text-on-accent',
    outline: 'border-2 border-line-strong text-ink hover:border-accent hover:text-accent',
    ghost: 'text-ink hover:bg-accent-soft'
}

/** The icon-button look for any element — e.g. an external `<a>`, which IconButton cannot be. */
export function iconButtonClasses(variant: IconButtonVariant = 'outline', className?: string) {
    return cn(baseClasses, variantClasses[variant], className)
}
