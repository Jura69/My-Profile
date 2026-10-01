/** Footer with forest silhouette divider — Tailwind rebuild of the legacy Chakra footer. */
import { SprigLeaf } from '../icons/kit-ornaments'
export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="mt-8 text-center">
            <div className="mb-3 text-ghibli-forest-green opacity-35 dark:text-[#4a6741]">
                <svg
                    viewBox="0 0 400 40"
                    className="mx-auto block h-10 w-full max-w-[400px]"
                    preserveAspectRatio="xMidYMax meet"
                    aria-hidden="true"
                >
                    {/* Trees - left group */}
                    <polygon points="30,40 40,8 50,40" fill="currentColor" />
                    <polygon points="45,40 55,14 65,40" fill="currentColor" />
                    <polygon points="20,40 32,18 44,40" fill="currentColor" />
                    {/* Trees - center group */}
                    <polygon points="150,40 162,5 174,40" fill="currentColor" />
                    <polygon points="165,40 175,12 185,40" fill="currentColor" />
                    <polygon points="180,40 195,2 210,40" fill="currentColor" />
                    <polygon points="205,40 215,10 225,40" fill="currentColor" />
                    <polygon points="140,40 155,15 170,40" fill="currentColor" />
                    {/* Trees - right group */}
                    <polygon points="330,40 342,10 354,40" fill="currentColor" />
                    <polygon points="350,40 360,6 370,40" fill="currentColor" />
                    <polygon points="360,40 372,16 384,40" fill="currentColor" />
                    {/* Ground line */}
                    <rect x="0" y="38" width="400" height="2" fill="currentColor" rx="1" />
                </svg>
            </div>
            <p className="font-rounded text-sm text-ink-muted opacity-50">
                <SprigLeaf className="inline-block align-[-0.3em] text-accent" /> &copy; {year} Jura69. All Rights
                Reserved. <SprigLeaf className="inline-block align-[-0.3em] text-accent -scale-x-100" />
            </p>
        </footer>
    )
}
