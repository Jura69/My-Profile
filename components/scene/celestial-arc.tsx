import { memo } from 'react'
import SunSvg from './svg/sun'
import MoonSvg from './svg/moon'

/**
 * Sun and moon carriers. Position/scale/opacity along the day→night arc are
 * written directly to these elements by ambient-scene via gsap.quickSetter —
 * this component renders static markup only (zero re-render on scroll).
 */
const CelestialArc = memo(function CelestialArc() {
    return (
        <>
            <div data-scene="sun" className="absolute h-[88px] w-[88px] will-change-transform">
                <SunSvg />
            </div>
            <div data-scene="moon" className="absolute h-[72px] w-[72px] opacity-0 will-change-transform">
                <MoonSvg />
            </div>
        </>
    )
})

export default CelestialArc
