import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '../../lib/cn'

export type IconButtonVariant = 'solid' | 'outline' | 'ghost'

const variantClasses: Record<IconButtonVariant, string> = {
    solid: 'bg-accent text-surface',
    outline: 'border-2 border-line text-ink hover:border-accent hover:text-accent',
    ghost: 'text-ink hover:bg-accent/10'
}

interface IconButtonProps extends HTMLMotionProps<'button'> {
    /** Required for accessibility — icon-only buttons have no visible label. */
    'aria-label': string
    variant?: IconButtonVariant
}

/**
 * Square icon-only button with press feedback.
 * Forwards ref so it works as a Radix `asChild` trigger.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    { variant = 'outline', className, children, ...props },
    ref
) {
    return (
        <motion.button
            ref={ref}
            className={cn(
                'grid size-10 cursor-pointer place-items-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                variantClasses[variant],
                className
            )}
            whileTap={{ scale: 0.9 }}
            {...props}
        >
            {children}
        </motion.button>
    )
})

export default IconButton
