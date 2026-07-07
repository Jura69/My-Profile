/**
 * Parallax hill layers — soft rolling silhouettes anchored to the viewport
 * bottom. Fill colors come from CSS vars set by ambient-scene so they
 * darken with the day→night narrative: --hill-back, --hill-front, --hill-tree.
 */

export function HillsBackSvg() {
    return (
        <svg
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className="block h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                style={{ fill: 'var(--hill-back, #cfe3cf)' }}
                d="M0,140 C120,90 260,70 420,96 C580,122 660,58 830,66 C1000,74 1080,128 1230,110 C1330,98 1390,72 1440,84 L1440,220 L0,220 Z"
            />
        </svg>
    )
}

export function HillsFrontSvg() {
    return (
        <svg
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            className="block h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Front rolling hill */}
            <path
                style={{ fill: 'var(--hill-front, #9fc49f)' }}
                d="M0,120 C180,60 340,96 520,84 C700,72 800,120 980,104 C1160,88 1260,52 1440,92 L1440,180 L0,180 Z"
            />
            {/* Tree clusters — same triangle language as the footer silhouette */}
            <g style={{ fill: 'var(--hill-tree, #6a9c6a)' }}>
                <polygon points="120,118 138,64 156,118" />
                <polygon points="146,120 160,84 174,120" />
                <polygon points="98,122 114,88 130,122" />
                <polygon points="620,104 640,46 660,104" />
                <polygon points="650,106 664,72 678,106" />
                <polygon points="592,108 608,76 624,108" />
                <polygon points="1180,92 1200,38 1220,92" />
                <polygon points="1210,96 1226,58 1242,96" />
                <polygon points="1152,98 1168,66 1184,98" />
            </g>
        </svg>
    )
}
