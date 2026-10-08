import { Moon, Sun } from '../icons/kit-icons-interface'
import { useTheme } from '../../providers/use-theme'
import IconButton from '../ui/icon-button'

/** Both icons stay mounted and swap on the `.dark` class: a 200 ms crossfade + 30° turn. */
const iconClasses =
    'col-start-1 row-start-1 transition-[opacity,rotate] duration-200 ease-out motion-reduce:transition-none'

/**
 * Theme switch: kit sun/moon crossfade + 30° rotate (instant under reduced motion). Styled
 * purely from the `.dark` class on <html> (set pre-paint by index.html, then by ThemeProvider),
 * so the prerendered button is already right for dark visitors and hydration changes nothing.
 * Reads/writes the standalone ThemeProvider, which owns the class and localStorage persistence.
 */
export default function ThemeToggle() {
    const { toggle } = useTheme()

    return (
        <IconButton
            aria-label="Toggle color theme"
            variant="solid"
            onClick={toggle}
            className="bg-ghibli-lavender text-ghibli-night-forest dark:bg-ghibli-golden-dust"
        >
            <span className="grid place-items-center text-lg">
                <Moon className={`${iconClasses} dark:rotate-30 dark:opacity-0`} />
                <Sun className={`${iconClasses} -rotate-30 opacity-0 dark:rotate-0 dark:opacity-100`} />
            </span>
        </IconButton>
    )
}
