/**
 * Light rig for the hero spirit stage: one key (sun / moon), one hemisphere fill, the shared painted
 * uniforms and the seed lantern, all driven by a single `mix` value (0 = day, 1 = night) so a theme
 * switch is one lerp. Values start from the painted-forest look-dev presets (banner dawn / night),
 * retuned for a close-up hero on a transparent canvas over the SVG sky.
 */
import * as THREE from 'three'
import { paintUniforms } from './painted-material'
import type { ForestSpirit } from './forest-spirit'

interface RigPreset {
    key: { color: string; intensity: number; azimuth: number; elevation: number }
    hemi: { sky: string; ground: string; intensity: number }
    paint: { shadeTint: string; shadeFloor: number; rim: string; rimStrength: number; softness: number }
    /** Seed lantern: 0 = golden fruit, 1 = lit lantern with its PointLight. */
    glow: number
}

const DAY: RigPreset = {
    key: { color: '#fff2d8', intensity: 2.5, azimuth: 252, elevation: 50 },
    hemi: { sky: '#b3e2f5', ground: '#5d7f62', intensity: 1.3 },
    paint: { shadeTint: '#9d9ccf', shadeFloor: 0.28, rim: '#e7c46d', rimStrength: 0.22, softness: 0 },
    glow: 0
}

const NIGHT: RigPreset = {
    key: { color: '#8ea8e0', intensity: 0.42, azimuth: 130, elevation: 45 },
    hemi: { sky: '#4a6aa8', ground: '#1c2e2a', intensity: 1.1 },
    paint: { shadeTint: '#5a6aa0', shadeFloor: 0.25, rim: '#98d8c8', rimStrength: 0.18, softness: 0.1 },
    glow: 1
}

/** Azimuth: 0 = from −Z (behind), 90 = from +X, 180 = from the camera side. */
function keyDirection(azimuthDeg: number, elevationDeg: number, out: THREE.Vector3) {
    const az = THREE.MathUtils.degToRad(azimuthDeg),
        el = THREE.MathUtils.degToRad(elevationDeg)
    return out.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el))
}

export function createSpiritLighting(scene: THREE.Scene, spirit: ForestSpirit) {
    const key = new THREE.DirectionalLight()
    const hemi = new THREE.HemisphereLight()
    scene.add(key, key.target, hemi)

    const from = new THREE.Vector3(),
        to = new THREE.Vector3()
    const tmp = new THREE.Color()
    const lerpColor = (out: THREE.Color, a: string, b: string, k: number) => out.set(a).lerp(tmp.set(b), k)

    return {
        /** Apply the rig at `k` ∈ [0,1] between day and night. */
        apply(k: number) {
            const lerp = THREE.MathUtils.lerp
            lerpColor(key.color, DAY.key.color, NIGHT.key.color, k)
            key.intensity = lerp(DAY.key.intensity, NIGHT.key.intensity, k)
            keyDirection(DAY.key.azimuth, DAY.key.elevation, from)
            keyDirection(NIGHT.key.azimuth, NIGHT.key.elevation, to)
            key.position.copy(from.lerp(to, k).normalize().multiplyScalar(5))
            lerpColor(hemi.color, DAY.hemi.sky, NIGHT.hemi.sky, k)
            lerpColor(hemi.groundColor, DAY.hemi.ground, NIGHT.hemi.ground, k)
            hemi.intensity = lerp(DAY.hemi.intensity, NIGHT.hemi.intensity, k)
            lerpColor(paintUniforms.uShadeTint.value, DAY.paint.shadeTint, NIGHT.paint.shadeTint, k)
            paintUniforms.uShadeFloor.value = lerp(DAY.paint.shadeFloor, NIGHT.paint.shadeFloor, k)
            lerpColor(paintUniforms.uRimColor.value, DAY.paint.rim, NIGHT.paint.rim, k)
            paintUniforms.uRimStrength.value = lerp(DAY.paint.rimStrength, NIGHT.paint.rimStrength, k)
            paintUniforms.uBandSoftness.value = lerp(DAY.paint.softness, NIGHT.paint.softness, k)
            spirit.setGlow(lerp(DAY.glow, NIGHT.glow, k))
        }
    }
}
