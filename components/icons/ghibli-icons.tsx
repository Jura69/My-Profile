import { type SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

/** Howl's Moving Castle — outline style */
export const GhibliCastle = ({ size = 24, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {/* Main tower */}
        <path d="M13 4L11 9V15H21V9L19 4H13Z" />
        {/* Flag */}
        <line x1="16" y1="4" x2="16" y2="1" />
        <path d="M16 1L19 2.5L16 4" fill="currentColor" opacity={0.3} />
        {/* Left turret */}
        <path d="M5 10L4 13V15H9V13L8 10H5Z" />
        {/* Right turret */}
        <path d="M23 8L22 11V15H27V11L26 8H23Z" />
        {/* Main body */}
        <path d="M3 15H29V27C29 28 28 29 27 29H5C4 29 3 28 3 27V15Z" />
        {/* Windows */}
        <circle cx="9" cy="21" r="1.8" />
        <circle cx="16" cy="20" r="2.2" />
        <circle cx="23" cy="21" r="1.8" />
        {/* Door */}
        <path d="M14 29V24.5C14 23.5 14.7 23 16 23C17.3 23 18 23.5 18 24.5V29" />
        {/* Smoke */}
        <path d="M7 10C6.5 8 7.5 6 8 5" strokeDasharray="1.5 1.5" opacity={0.5} />
    </svg>
)

/** Cat Bus — outline style */
export const GhibliCatBus = ({ size = 24, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {/* Body */}
        <ellipse cx="14" cy="17" rx="12" ry="6" />
        {/* Head */}
        <path d="M24 12C24 12 26 10 28 11C30 12 29 16 27 17" />
        {/* Ears */}
        <path d="M25 10L24 6" />
        <path d="M28 10L30 7" />
        {/* Eyes */}
        <circle cx="25.5" cy="13" r="1" />
        <circle cx="28" cy="13.5" r="1" />
        {/* Grin */}
        <path d="M24 16C25.5 17.5 28 16 28 16" />
        {/* Legs */}
        <line x1="6" y1="22" x2="6" y2="26" />
        <line x1="11" y1="22.5" x2="11" y2="26" />
        <line x1="18" y1="22.5" x2="18" y2="26" />
        <line x1="23" y1="22" x2="23" y2="26" />
        {/* Paws */}
        <ellipse cx="6" cy="26.5" rx="1.5" ry="0.8" fill="currentColor" opacity={0.2} />
        <ellipse cx="11" cy="26.5" rx="1.5" ry="0.8" fill="currentColor" opacity={0.2} />
        <ellipse cx="18" cy="26.5" rx="1.5" ry="0.8" fill="currentColor" opacity={0.2} />
        <ellipse cx="23" cy="26.5" rx="1.5" ry="0.8" fill="currentColor" opacity={0.2} />
        {/* Tail */}
        <path d="M2 15C1 12 1.5 8 3 6" />
        {/* Windows */}
        <rect x="6" y="14" width="4" height="3" rx="1" />
        <rect x="12" y="14" width="4" height="3" rx="1" />
    </svg>
)

/** Kodama tree spirit — outline style */
export const GhibliKodama = ({ size = 24, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {/* Head */}
        <ellipse cx="16" cy="11" rx="7" ry="8" />
        {/* Head bobble */}
        <ellipse cx="16" cy="2.5" rx="1.5" ry="2" />
        {/* Eyes — triangular holes */}
        <path d="M12 10L13.5 7.5L15 10Z" />
        <path d="M17 10L18.5 7.5L20 10Z" />
        {/* Mouth */}
        <ellipse cx="16" cy="13" rx="1.5" ry="1.8" />
        {/* Body */}
        <path d="M12 18C12 15 13.5 14 16 14C18.5 14 20 15 20 18V25C20 26.5 18.5 28 16 28C13.5 28 12 26.5 12 25V18Z" />
        {/* Arms */}
        <path d="M12 20C10 19 8 20 7 21" />
        <path d="M20 20C22 19 24 20 25 21" />
        {/* Feet */}
        <ellipse cx="14" cy="28.5" rx="2" ry="1" />
        <ellipse cx="18" cy="28.5" rx="2" ry="1" />
    </svg>
)

/** Soot Sprite — outline style with star eyes */
export const GhibliSootSprite = ({ size = 24, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {/* Fuzzy body */}
        <circle cx="16" cy="16" r="9" />
        {/* Fuzz spikes */}
        <line x1="16" y1="6" x2="16" y2="3" />
        <line x1="22" y1="8" x2="24.5" y2="5.5" />
        <line x1="25" y1="14" x2="28" y2="13" />
        <line x1="10" y1="8" x2="7.5" y2="5.5" />
        <line x1="7" y1="14" x2="4" y2="13" />
        <line x1="22" y1="24" x2="24.5" y2="26.5" />
        <line x1="10" y1="24" x2="7.5" y2="26.5" />
        <line x1="16" y1="26" x2="16" y2="29" />
        {/* Star eyes */}
        <path d="M12 14L12.8 11.5L13.5 14L16 14.8L13.5 15.5L12.8 18L12 15.5L9.5 14.8Z" fill="currentColor" />
        <path d="M19 14L19.8 11.5L20.5 14L23 14.8L20.5 15.5L19.8 18L19 15.5L16.5 14.8Z" fill="currentColor" />
        {/* Tiny feet */}
        <ellipse cx="13.5" cy="25" rx="1.5" ry="0.8" />
        <ellipse cx="18.5" cy="25" rx="1.5" ry="0.8" />
    </svg>
)

/** Floating leaf — outline style */
export const GhibliLeaf = ({ size = 24, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 3C22 3 28 8 28 16C28 24 19 29 11 29C11 29 16 24 16 16C16 8 22 3 22 3Z" />
        {/* Center vein */}
        <path d="M22 3C22 3 17 8 16 16C15 24 11 29 11 29" />
        {/* Side veins */}
        <path d="M20 9C18 11 17 14 16.5 16" opacity={0.6} />
        <path d="M24 14C21 16 18 19 17 21" opacity={0.6} />
        <path d="M14 22C13 24 12 26 11.5 28" opacity={0.6} />
    </svg>
)

/** Magic sparkle — outline style */
export const GhibliSparkle = ({ size = 24, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {/* Main 4-point star */}
        <path d="M16 3L18 12L27 16L18 20L16 29L14 20L5 16L14 12Z" />
        {/* Small accent stars */}
        <path d="M25 4L26 7L29 8L26 9L25 12L24 9L21 8L24 7Z" fill="currentColor" opacity={0.3} />
        <path d="M7 22L7.5 24L10 25L7.5 26L7 28L6.5 26L4 25L6.5 24Z" fill="currentColor" opacity={0.25} />
    </svg>
)
