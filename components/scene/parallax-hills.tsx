import { memo } from 'react'
import { HillsBackSvg, HillsFrontSvg } from './svg/hills'

/**
 * Hill layers anchored to the viewport bottom. ambient-scene translates each
 * layer at a different rate on scroll (front faster than back) for depth.
 * Static markup only — zero re-render on scroll.
 */
const ParallaxHills = memo(function ParallaxHills() {
    return (
        <>
            <div data-scene="hills-back" className="absolute inset-x-0 bottom-0 h-[24vh] will-change-transform">
                <HillsBackSvg />
            </div>
            <div data-scene="hills-front" className="absolute inset-x-0 bottom-0 h-[17vh] will-change-transform">
                <HillsFrontSvg />
            </div>
        </>
    )
})

export default ParallaxHills
