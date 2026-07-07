import { motion, type HTMLMotionProps } from 'motion/react'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles'

const pressMotion = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 }
}

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: ButtonVariant
    size?: ButtonSize
}

export default function Button({ variant = 'solid', size = 'md', className, children, ...props }: ButtonProps) {
    return (
        <motion.button className={buttonClasses(variant, size, className)} {...pressMotion} {...props}>
            {children}
        </motion.button>
    )
}

interface ButtonLinkProps extends HTMLMotionProps<'a'> {
    variant?: ButtonVariant
    size?: ButtonSize
}

/** Anchor styled as a button — for external links and downloads. */
export function ButtonLink({ variant = 'solid', size = 'md', className, children, ...props }: ButtonLinkProps) {
    return (
        <motion.a className={buttonClasses(variant, size, className)} {...pressMotion} {...props}>
            {children}
        </motion.a>
    )
}
