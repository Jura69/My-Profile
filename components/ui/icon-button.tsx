import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { iconButtonClasses, type IconButtonVariant } from './icon-button-styles'

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
            className={iconButtonClasses(variant, className)}
            whileTap={{ scale: 0.9 }}
            {...props}
        >
            {children}
        </motion.button>
    )
})

export default IconButton
