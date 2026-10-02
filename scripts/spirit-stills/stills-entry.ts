/**
 * Renders one Mầm Đèn still with the hero's own scene (`spirit-scene.ts`): same geometry, painted
 * materials, light rig and camera, posed through the expression layer and drawn once in the rest pose.
 * Query: shot=still|og, pose=<STILL_POSES key>, night=0..1 (light-rig mix), size=<px> (still only).
 * Sets `window.__stillReady` once the frame is on the canvas (fonts loaded too for the OG card).
 */
import * as THREE from 'three'
import { createSpiritScene } from '../../components/spirit/spirit-scene'
import { paintUniforms } from '../../components/spirit/painted-material'
import { STILL_POSES, type StillPoseName } from '../../components/spirit/spirit-expression'

declare global {
    interface Window {
        __stillReady?: boolean
        __stillError?: string
    }
}

async function render() {
    const params = new URLSearchParams(location.search)
    const shot = params.get('shot') === 'og' ? 'og' : 'still'
    const poseName = (params.get('pose') ?? 'greeting') as StillPoseName
    const pose = STILL_POSES[poseName]
    if (!pose) throw new Error(`unknown pose "${poseName}"`)
    const night = THREE.MathUtils.clamp(Number(params.get('night') ?? 0), 0, 1)
    const size = shot === 'og' ? 560 : Number(params.get('size') ?? 512)

    document.body.classList.toggle('og', shot === 'og')
    const host = document.querySelector<HTMLElement>(shot === 'og' ? '#og .spirit' : '#still')
    if (!host) throw new Error('missing host element')

    const world = createSpiritScene()
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(1)
    renderer.setSize(size, size)
    host.appendChild(renderer.domElement)

    paintUniforms.uWind.value = 0
    world.setNight(night)
    world.setPose(pose)
    world.animate(0, 0, 1)
    renderer.render(world.scene, world.camera)
    await document.fonts.ready
}

render().then(
    () => (window.__stillReady = true),
    (error: unknown) => (window.__stillError = String(error))
)
