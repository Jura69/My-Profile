import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge only knows Tailwind's built-in font sizes; any other `text-{name}` is read as a
 * color and dropped next to `text-ink`. Register the type-scale tokens from global.css `@theme`
 * (`--text-*`) so `cn('text-section text-ink')` keeps both. Add new size tokens here too.
 */
const twMerge = extendTailwindMerge({
    extend: { theme: { text: ['display', 'page-title', 'section', 'lead'] } }
})

/** Merge class names with Tailwind-aware conflict resolution (later classes win). */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
