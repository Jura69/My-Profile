import { cn } from '../../lib/cn'

type StillPose = 'puzzled' | 'sleepy'

/** Square render size of each pose's WebP (2× its largest CSS size); see scripts/render-spirit-stills.mjs. */
const RENDER_PX: Record<StillPose, number> = { puzzled: 480, sleepy: 384 }

/**
 * A posed Mầm Đèn still rendered from the hero's 3D scene (no three.js at runtime). Day and night
 * renders swap with the theme class; the hidden one is lazy and display:none, so it is not fetched
 * until the theme flips. Decorative only.
 */
export default function SpiritStill({ pose, className }: { pose: StillPose; className?: string }) {
    const px = RENDER_PX[pose]
    const img = (light: 'day' | 'night', visibility: string) => (
        <img
            src={`/images/spirit/spirit-${pose}-${light}.webp`}
            alt=""
            width={px}
            height={px}
            loading="lazy"
            decoding="async"
            className={cn('h-full w-full', visibility)}
        />
    )
    return (
        <span aria-hidden="true" className={cn('block select-none', className)}>
            {img('day', 'dark:hidden')}
            {img('night', 'hidden dark:block')}
        </span>
    )
}
