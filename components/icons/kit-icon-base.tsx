import type { ComponentType, CSSProperties, ReactNode } from 'react'

/** Props shared by every kit icon; compatible with how react-icons were used (className/style/aria-hidden). */
export type IconComponent = ComponentType<{
    className?: string
    style?: CSSProperties
    'aria-hidden'?: boolean | 'true' | 'false'
    size?: number | string
}>

type KitIconProps = {
    children: ReactNode
    viewBox?: string
    /** Width/height; follows font-size. Default 1.25em: kit art spans ~18/24 of the box (react-icons
     *  are near edge-to-edge), so 1.25em matches their optical size next to text and Si logos. */
    size?: number | string
    className?: string
    style?: CSSProperties
    'aria-hidden'?: boolean | 'true' | 'false'
}

/**
 * Shared SVG frame: currentColor stroke, round joins. Individual paths may override
 * fill/opacity (the soft 0.18 wash layer in the kit sources).
 */
export const KitIcon = ({
    children,
    viewBox = '0 0 24 24',
    size = '1.25em',
    className,
    style,
    'aria-hidden': ariaHidden = true
}: KitIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
        aria-hidden={ariaHidden}
        focusable="false"
    >
        {children}
    </svg>
)
