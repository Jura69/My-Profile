import { AnimatePresence, motion } from 'motion/react'
import { useColorMode } from '@chakra-ui/react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import IconButton from '../ui/icon-button'

/**
 * Theme switch with icon morph. Reads/writes Chakra colorMode — the source of
 * truth during coexistence; `providers/chakra.tsx` mirrors it to the `.dark` class.
 */
export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    return (
        <IconButton
            aria-label="Toggle color theme"
            variant="solid"
            onClick={toggleColorMode}
            className={
                isDark
                    ? 'bg-ghibli-golden-dust text-ghibli-night-forest'
                    : 'bg-ghibli-lavender text-ghibli-night-forest'
            }
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={colorMode}
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
