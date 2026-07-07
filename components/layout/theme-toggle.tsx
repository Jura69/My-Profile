import { AnimatePresence, motion } from 'motion/react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { useTheme } from '../../providers/theme'
import IconButton from '../ui/icon-button'

/**
 * Theme switch with icon morph. Reads/writes the standalone ThemeProvider, which
 * owns the `.dark` class on <html> and localStorage persistence.
 */
export default function ThemeToggle() {
    const { mode, toggle } = useTheme()
    const isDark = mode === 'dark'

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
                    initial={{ y: -16, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 16, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                >
                    {isDark ? <IoSunny /> : <IoMoon />}
                </motion.span>
            </AnimatePresence>
        </IconButton>
    )
}
