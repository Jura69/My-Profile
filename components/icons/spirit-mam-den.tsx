import { useId } from 'react'

/**
 * Mầm Đèn — the site's original forest spirit: a mossy pebble on root nubs, with a
 * curled sprout stalk carrying a seed lantern in front. Two renderings share one path set
 * (viewBox 0 0 200 200, ground at y≈185):
 *  - `SpiritIllustration`: full-colour art on a moss island; hero placeholder/fallback for
 *    the 3D stage, framed like its camera so the swap does not jump.
 *  - `SpiritIcon`: navbar logo, same art cropped tight with sub-pixel detail dropped.
 * Colours are palette literals (moss, stone, golden-dust, ink) so the art reads the same in
 * both themes; only the lantern glow brightens in dark mode.
 */

type PartsProps = {
    /** Unique gradient id — the illustration can mount twice (Suspense + error fallback). */
    glowId: string
    /** Stroke width of the sprout stalk; the icon needs it thicker to survive at 40 px. */
    stalkWidth: number
    /** Eye highlights and seed cap are < 2 px at icon size, so the icon drops them. */
    detail: boolean
}

/**
 * Moss island in cell coordinates, matched to the 3D stage's camera (measured from captures): top
 * ellipse centred under the feet, earth lip visible below, tufts and pebbles toward the rim.
 */
const MossIsland = () => (
    <>
        <ellipse cx="98" cy="157" rx="74" ry="23" fill="#6d5640" />
        <ellipse cx="98" cy="148" rx="74" ry="21" fill="#5e9a64" />
        <ellipse cx="80" cy="152" rx="40" ry="10" fill="#7eb77f" opacity=".35" />
        <path
            d="M34 152 l3 -11 l2 11 M40 153 l4 -9 l1 9 M150 150 l3 -10 l2 10 M157 149 l4 -12 l1 12 M66 163 l2 -9 l2 9"
            stroke="#3d6a4b"
            strokeWidth="2"
            fill="none"
        />
        <ellipse cx="148" cy="157" rx="6" ry="3.5" fill="#b4c2b9" />
        <ellipse cx="52" cy="160" rx="4.5" ry="2.5" fill="#a3b4ad" />
        {/* Blob shadow under the feet */}
        <ellipse cx="97" cy="141" rx="45" ry="7" fill="#3b3f63" opacity=".3" />
    </>
)

const SpiritParts = ({ glowId, stalkWidth, detail }: PartsProps) => (
    <>
        <defs>
            <radialGradient id={glowId}>
                <stop offset="0" stopColor="#f1d999" stopOpacity=".9" />
                <stop offset="1" stopColor="#e7c46d" stopOpacity="0" />
            </radialGradient>
        </defs>
        {/* Sprout stalk + leaf */}
        <path
            d="M104 104 C98 70 110 42 136 34 C152 30 162 40 160 50"
            stroke="#3d6a4b"
            strokeWidth={stalkWidth}
            fill="none"
            strokeLinecap="round"
        />
        <path d="M112 64 C96 52 86 56 82 62 C93 68 104 68 112 64 Z" fill="#7eb77f" />
        {/* Seed lantern: soft glow (brighter at night), cap, seed */}
        <circle
            cx="160"
            cy="64"
            r={detail ? 26 : 20}
            fill={`url(#${glowId})`}
            className="opacity-70 dark:opacity-100"
        />
        {detail && <path d="M153 52 L167 52 L165 56 L155 56 Z" fill="#6d5640" />}
        <ellipse cx="160" cy="66" rx="10" ry="12" fill="#e7c46d" />
        {/* Root nubs */}
        <ellipse cx="66" cy="180" rx="10" ry="6" fill="#6f8a80" />
        <ellipse cx="100" cy="183" rx="10" ry="6" fill="#6f8a80" />
        <ellipse cx="134" cy="180" rx="10" ry="6" fill="#6f8a80" />
        {/* Pebble body + moss cap */}
        <path d="M50 175 C40 150 50 110 100 104 C150 110 160 150 150 175 C120 184 80 184 50 175 Z" fill="#a3b4ad" />
        <path
            d="M56 130 C58 110 88 100 102 101 C128 101 146 114 146 130 C136 124 126 132 116 126 C106 134 96 124 86 130 C76 134 66 124 56 130 Z"
            fill="#5e9a64"
        />
        {/* Eyes */}
        <circle cx="84" cy="152" r="6" fill="#2d2a24" />
        <circle cx="116" cy="152" r="6" fill="#2d2a24" />
        {detail && (
            <>
                <circle cx="86" cy="150" r="2" fill="#fff" />
                <circle cx="118" cy="150" r="2" fill="#fff" />
            </>
        )}
    </>
)

/** Full-colour spirit on its moss island; fills its box (use inside the sized hero cell). */
export const SpiritIllustration = ({ className }: { className?: string }) => {
    const glowId = useId()
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={className ?? 'h-full w-full'}
            aria-hidden="true"
            focusable="false"
        >
            <MossIsland />
            {/* Spirit art is authored at ground y≈185; scale/shift it onto the island like the 3D frame */}
            <g transform="translate(18 -4) scale(0.8)">
                <SpiritParts glowId={glowId} stalkWidth={5} detail />
            </g>
        </svg>
    )
}

/** Navbar logo: tight crop of the same art, 40 px by default. */
export const SpiritIcon = ({ size = 40 }: { size?: number }) => {
    const glowId = useId()
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="28 28 160 160"
            width={size}
            height={size}
            aria-hidden="true"
            focusable="false"
        >
            <SpiritParts glowId={glowId} stalkWidth={8} detail={false} />
        </svg>
    )
}
