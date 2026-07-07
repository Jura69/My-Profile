import { motion } from 'motion/react'

interface RevealProps {
    children: React.ReactNode
    className?: string
    /** Seconds to wait before animating — use for stagger between siblings. */
    delay?: number
    /** Initial rise offset in px (contract: 12–16px). */
    y?: number
    once?: boolean
}

/**
 * Standard entrance reveal (fade + rise), fires when scrolled into view.
 * Honors reduced motion via the app-level `MotionConfig reducedMotion="user"`.
 */
export default function Reveal({ children, className, delay = 0, y = 14, once = true }: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    )
}
