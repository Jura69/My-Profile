/**
 * Hero framing for the spirit stage: a low three-quarter view from the front-left so the sprout
 * arc reads in profile to the right, spirit + island filling ~80 % of the square cell.
 * The 2D `SpiritIllustration` is laid out to match this frame — retune both together.
 */
import * as THREE from 'three'

const FRAME = { fov: 28, azimuth: -14, elevation: 11, distance: 4.7, target: new THREE.Vector3(0.04, 0.5, 0) }

export function createHeroCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(FRAME.fov, 1, 0.1, 30)
    const az = THREE.MathUtils.degToRad(FRAME.azimuth),
        el = THREE.MathUtils.degToRad(FRAME.elevation)
    camera.position
        .set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el))
        .multiplyScalar(FRAME.distance)
        .add(FRAME.target)
    camera.lookAt(FRAME.target)
    return camera
}
