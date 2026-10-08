import { useEffect, useRef, useState, type ReactNode, type SyntheticEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import { useTheme, type Mode } from '../../providers/use-theme'
import { cn } from '../../lib/cn'
import { useHydrated } from '../../lib/use-hydrated'
import type { IconComponent } from '../icons/kit-icon-base'

type BannerPage = 'works' | 'audiophile' | 'activities' | '404'

const WIDTHS = [800, 1600, 2400]
/** Keep in sync with the `duration-200` class on the incoming image. */
const FADE_MS = 200

const fileFor = (page: BannerPage, mode: Mode, w: number) =>
    `/images/banners/${page}-${mode === 'dark' ? 'night' : 'day'}-${w}.webp`

const srcSetFor = (page: BannerPage, mode: Mode) => WIDTHS.map(w => `${fileFor(page, mode, w)} ${w}w`).join(', ')

interface PageBannerProps {
    page: BannerPage
    alt: string
    sizes?: string
    className?: string
    /** Extra classes for the <img>, e.g. object-position to keep the subject in frame on mobile. */
    imgClassName?: string
    /** Page <h1>, overlaid bottom-left on a dark scrim (white text ≥ 3.6:1 at p5 on every banner). */
    title?: ReactNode
    /** Decorative kit ornament after the title. */
    ornament?: IconComponent
}

/**
 * Gouache day/night banner that follows the theme without a blank frame or layout shift.
 * The frame has a fixed aspect ratio; the shown image stays mounted while the other
 * theme's image loads on top, decodes, then fades in (instant swap under reduced motion).
 * Images are keyed by mode so the incoming <img> becomes the shown one without remounting.
 * Rendered outside <Reveal> on purpose: it is the page's LCP candidate.
 */
export default function PageBanner({
    page,
    alt,
    sizes = '(min-width:1100px) 1100px, 100vw',
    className,
    imgClassName,
    title,
    ornament: Ornament
}: PageBannerProps) {
    const { mode: themeMode } = useTheme()
    // The prerendered <img> is the day banner (the server has no theme); a dark visitor's night
    // banner fades in once hydrated — switching earlier would leave a stale src (React does not
    // patch attributes during hydration).
    const mode: Mode = useHydrated() ? themeMode : 'light'
    const reduceMotion = useReducedMotion()
    const [shown, setShown] = useState<Mode>(mode)
    // Mode whose incoming image is decoded and fading in; stale once the user toggles back.
    const [fading, setFading] = useState<Mode | null>(null)
    const latestMode = useRef(mode)
    latestMode.current = mode
    const preloaded = useRef(false)
    const swapTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
    const incoming = mode !== shown ? mode : null

    // Toggled back mid-fade: drop the stale fade so a later incoming image starts hidden again.
    if (fading && fading !== incoming) setFading(null)

    useEffect(() => () => clearTimeout(swapTimer.current), [])

    // After the first paint, warm the cache with the other theme so a toggle swaps quickly.
    const preloadOtherTheme = () => {
        if (preloaded.current) return
        preloaded.current = true
        const run = () => {
            const img = new Image()
            img.sizes = sizes
            img.srcset = srcSetFor(page, shown === 'dark' ? 'light' : 'dark')
        }
        if ('requestIdleCallback' in window) window.requestIdleCallback(run)
        else setTimeout(run, 1500)
    }

    const finishSwap = (target: Mode) => {
        setFading(null)
        if (latestMode.current === target) setShown(target)
    }

    // Decode first so the swap never shows a half-painted frame. The fade starts two frames
    // later (so opacity-0 is committed and the transition actually runs, even when cache-hot)
    // and ends on a timer rather than transitionend, which never fires if the img unmounts.
    const revealIncoming = (target: Mode) => (e: SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget
        img.decode()
            .catch(() => {})
            .then(() => {
                if (!img.isConnected || latestMode.current !== target) return
                if (reduceMotion) return setShown(target)
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                        if (!img.isConnected || latestMode.current !== target) return
                        setFading(target)
                        clearTimeout(swapTimer.current)
                        swapTimer.current = setTimeout(() => finishSwap(target), FADE_MS + 40)
                    })
                )
            })
    }

    return (
        <div
            className={cn(
                'relative aspect-[2/1] overflow-hidden rounded-2xl border border-line bg-surface-sunken sm:aspect-[3/1]',
                className
            )}
        >
            {(incoming ? [shown, incoming] : [shown]).map(m => {
                const isIncoming = m === incoming
                return (
                    <img
                        key={m}
                        src={fileFor(page, m, 1600)}
                        srcSet={srcSetFor(page, m)}
                        sizes={sizes}
                        alt={isIncoming ? '' : alt}
                        aria-hidden={isIncoming || undefined}
                        width={1600}
                        height={533}
                        decoding="async"
                        fetchPriority={isIncoming ? undefined : 'high'}
                        onLoad={isIncoming ? revealIncoming(m) : preloadOtherTheme}
                        className={cn(
                            'absolute inset-0 h-full w-full object-cover',
                            isIncoming && 'opacity-0 transition-opacity duration-200 ease-out',
                            isIncoming && fading === m && 'opacity-100',
                            imgClassName
                        )}
                    />
                )
            })}
            {title && (
                <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/65 via-black/25 via-50% to-transparent p-5 sm:p-8">
                    <h1 className="font-rounded text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_12px_rgb(0_0_0/0.45)] sm:text-4xl md:text-5xl">
                        {title}
                        {Ornament && <Ornament className="ml-3 inline-block size-[0.9em] align-[-0.12em]" />}
                    </h1>
                </div>
            )}
        </div>
    )
}
