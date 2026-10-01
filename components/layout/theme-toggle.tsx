import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Moon, Sun } from '../icons/kit-icons-interface'
import { useTheme } from '../../providers/use-theme'
import IconButton from '../ui/icon-button'

/**
 * Theme switch: kit sun/moon crossfade + 30° rotate (instant under reduced motion). Reads/writes the standalone ThemeProvider, which
 * owns the `.dark` class on <html> and localStorage persistence.
 */
export default function ThemeToggle() {
    const { mode, toggle } = useTheme()
    const isDark = mode === 'dark'
    // MotionConfig reducedMotion="user" keeps opacity tweens, so gate the crossfade explicitly.
    const reduceMotion = useReducedMotion()

    return (
        <IconButton
            aria-label="Toggle color theme"
            variant="solid"
            onClick={toggle}
            className={
                isDark
                    ? 'bg-ghibli-golden-dust text-ghibli-night-forest'
                    : 'bg-ghibli-lavender text-ghibli-night-forest'
            }
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={mode}
                    className="grid place-items-center text-lg"
                    initial={reduceMotion ? false : { opacity: 0, rotate: -30 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: 30 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                    {isDark ? <Sun /> : <Moon />}
                </motion.span>
            </AnimatePresence>
        </IconButton>
    )
}
