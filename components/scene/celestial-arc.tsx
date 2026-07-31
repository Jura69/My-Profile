import { memo } from 'react'
import MoonSvg from './svg/moon'

/**
 * Moon carrier. Position/scale/opacity along the night arc are written
 * directly to this element's inline style by ambient-scene on scroll —
 * this component renders static markup only (zero re-render on scroll).
 */
const CelestialArc = memo(function CelestialArc() {
    return (
        <div data-scene="moon" className="absolute h-[72px] w-[72px] opacity-0 will-change-transform">
            <MoonSvg />
        </div>
    )
})

export default CelestialArc
