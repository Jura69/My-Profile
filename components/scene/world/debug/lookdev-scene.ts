/**
 * Look-dev world assembly (spike only): one hero frame — sky, clouds, hills + path, backdrop wood,
 * grass, hero tree, spirit, one hanging lantern — plus a light rig driven by a preset, and named
 * camera views for the capture contract. Phase 2's world-controller replaces this; the object
 * modules it composes are the production ones.
 */
import * as THREE from 'three'
import { createSkyDome } from '../sky-dome'
import { createCloudCards } from '../cloud-cards'
import { createTerrain, heightAt } from '../terrain'
import { createForestBackdrop } from '../forest-backdrop'
import { createGrassField } from '../grass-field'
import { createHeroTree } from '../hero-tree'
import { createForestSpirit } from '../forest-spirit'
import { createPaperLantern } from '../lanterns'
import { paintUniforms } from '../painted-material'
import { resolvePreset, type PresetName, type SkySource } from './lookdev-presets'

export interface LookdevOptions {
    shadows: boolean
    profile: 'desktop' | 'mobile'
    skySource: SkySource
}

type View = { pos: [number, number, number]; target: [number, number, number]; fov: number }

const TREE_AT = new THREE.Vector3(8, 0, -14)
const SPIRIT_AT = new THREE.Vector3(4.4, 0, -11)
const VIEWS: Record<string, View> = {
    hero: { pos: [0, 1.5, 12], target: [2, 4.4, -12], fov: 38 },
    'hero-portrait': { pos: [3.2, 1.3, 9], target: [5.6, 5.2, -12], fov: 64 },
    spirit: { pos: [2.2, 1.3, -5.6], target: [4.4, 0.9, -11], fov: 30 },
    tree: { pos: [-7, 4, 16], target: [7, 5, -14], fov: 45 },
    wide: { pos: [0, 14, 44], target: [0, 4, -70], fov: 50 }
}

export function createLookdevWorld(renderer: THREE.WebGLRenderer, options: LookdevOptions) {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1200)
    const sky = createSkyDome()
    const clouds = createCloudCards()
    const terrain = createTerrain()
    const backdrop = createForestBackdrop(5, options.profile === 'mobile' ? 0.6 : 1)
    const grass = createGrassField({
        count: options.profile === 'mobile' ? 3500 : 7000,
        clearings: [
            [SPIRIT_AT.x, SPIRIT_AT.z, 1.5],
            [TREE_AT.x, TREE_AT.z, 2.8]
        ]
    })
    const tree = createHeroTree()
    const spirit = createForestSpirit()
    const lantern = createPaperLantern()

    TREE_AT.y = heightAt(TREE_AT.x, TREE_AT.z)
    tree.group.position.copy(TREE_AT)
    tree.group.rotation.y = -0.15
    SPIRIT_AT.y = heightAt(SPIRIT_AT.x, SPIRIT_AT.z)
    spirit.group.position.copy(SPIRIT_AT)
    spirit.group.scale.setScalar(1.5)
    spirit.group.rotation.y = Math.atan2(VIEWS.hero.pos[0] - SPIRIT_AT.x, VIEWS.hero.pos[2] - SPIRIT_AT.z)
    tree.group.updateMatrixWorld(true)
    lantern.group.position.copy(tree.group.localToWorld(tree.lanternAnchor.clone()))
    scene.add(sky.mesh, clouds.group, terrain.mesh, backdrop.mesh, grass.mesh, tree.group, spirit.group, lantern.group)

    const key = new THREE.DirectionalLight()
    const hemi = new THREE.HemisphereLight()
    scene.add(key, key.target, hemi)
    key.target.position.copy(TREE_AT)
    scene.fog = new THREE.FogExp2('#ffffff', 0.004)

    renderer.shadowMap.enabled = options.shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    key.castShadow = options.shadows
    key.shadow.mapSize.set(1024, 1024)
    Object.assign(key.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 90 })
    key.shadow.bias = -0.0008
    key.shadow.normalBias = 0.04

    let preset: PresetName = 'dawn'
    let view = 'hero'
    const applyPreset = (name: PresetName) => {
        preset = name
        const p = resolvePreset(name, options.skySource)
        const az = THREE.MathUtils.degToRad(p.key.azimuth),
            el = THREE.MathUtils.degToRad(p.key.elevation)
        const dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el))
        key.position.copy(TREE_AT).addScaledVector(dir, 50)
        key.color.set(p.key.color)
        key.intensity = p.key.intensity
        hemi.color.set(p.hemi.sky)
        hemi.groundColor.set(p.hemi.ground)
        hemi.intensity = p.hemi.intensity
        sky.setColors(p.sky)
        sky.setGlow(dir, p.glow.color, p.glow.strength)
        clouds.setPalette(p.clouds)
        ;(scene.fog as THREE.FogExp2).color.set(p.fog.color)
        ;(scene.fog as THREE.FogExp2).density = p.fog.density
        paintUniforms.uShadeTint.value.set(p.paint.shadeTint)
        paintUniforms.uShadeFloor.value = p.paint.shadeFloor
        paintUniforms.uRimColor.value.set(p.paint.rim)
        paintUniforms.uRimStrength.value = p.paint.rimStrength
        spirit.setGlow(p.practicals)
        lantern.setGlow(p.practicals)
    }

    const setView = (name: string) => {
        view = name
        const aspect = camera.aspect
        const v = VIEWS[name === 'hero' && aspect < 0.8 ? 'hero-portrait' : name]
        camera.position.set(...v.pos)
        camera.fov = v.fov
        camera.lookAt(...v.target)
        camera.updateProjectionMatrix()
    }

    applyPreset('dawn')

    return {
        scene,
        camera,
        views: Object.keys(VIEWS).filter(v => v !== 'hero-portrait'),
        applyPreset,
        setView,
        /** Kill both practicals' receiver lights; emissive surfaces stay lit (ownership check). */
        setPracticalLights(enabled: boolean) {
            spirit.setLightEnabled(enabled)
            lantern.setLightEnabled(enabled)
        },
        resize(width: number, height: number) {
            camera.aspect = width / height
            setView(view)
        },
        /** Elapsed-time update; `motion` 0 parks wind + rig (reduced motion). */
        update(t: number, motion = 1) {
            paintUniforms.uTime.value = t
            paintUniforms.uWind.value = motion
            spirit.update(t, motion)
        },
        state: () => ({ preset, view, shadows: options.shadows, profile: options.profile, sky: options.skySource }),
        dispose() {
            for (const part of [sky, clouds, terrain, backdrop, grass, tree, spirit, lantern]) part.dispose()
            key.dispose()
            hemi.dispose()
        }
    }
}

export type LookdevWorld = ReturnType<typeof createLookdevWorld>
