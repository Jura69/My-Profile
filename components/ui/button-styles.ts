import { cn } from '../../lib/cn'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const baseClasses =
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-rounded font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:pointer-events-none disabled:opacity-50'

/* solid: the accent fill + gouache wash live on the masked ::before (`.material-wash`,
   hover → accent-hover there), so the host stays transparent and its focus outline unclipped. */
const variantClasses: Record<ButtonVariant, string> = {
    solid: 'material-wash bg-transparent text-on-accent',
    outline: 'border-2 border-line-strong text-accent hover:border-accent',
    ghost: 'text-accent hover:bg-accent-soft'
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg'
}

/** Compose button classes for any element (e.g. router links styled as buttons). */
export function buttonClasses(variant: ButtonVariant = 'solid', size: ButtonSize = 'md', className?: string) {
    return cn(baseClasses, variantClasses[variant], sizeClasses[size], className)
}
