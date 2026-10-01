/**
 * Content of the hero spirit stage (CPU-side, no renderer): camera, Mầm Đèn on its floating moss
 * island, fireflies/pollen, and the day↔night light rig. `spirit-stage.ts` owns the WebGL lifecycle
 * and calls `animate` once per drawn frame. The island + spirit float as one root: a slow bob and a
 * faint rock, so the diorama reads as hanging in the sky rather than pinned to it.
 */
import * as THREE from 'three'
import { createForestSpirit } from './forest-spirit'
import { createMossIsland, ISLAND_TOP } from './moss-island'
import { createFireflies } from './fireflies'
import { paintUniforms } from './painted-material'
import { createSpiritLighting } from './spirit-lighting'
import { createHeroCamera } from './hero-camera'

export function createSpiritScene() {
    const scene = new THREE.Scene()
    const camera = createHeroCamera()
    const spirit = createForestSpirit()
    spirit.group.position.y = ISLAND_TOP
    const island = createMossIsland()
    const fireflies = createFireflies()
    const root = new THREE.Group()
    root.add(island.group, spirit.group)
    scene.add(root, fireflies.points)
    const lighting = createSpiritLighting(scene, spirit)
    let night = 0

    return {
        scene,
        camera,
        /** Day (0) ↔ night (1) mix for lights, paint uniforms, lantern and motes. */
        setNight(k: number) {
            night = k
            lighting.apply(k)
        },
        /** Pose everything at elapsed `t`; `motion` 0 = still rest pose (reduced motion). */
        animate(t: number, motion: number, pixelRatio: number) {
            paintUniforms.uTime.value = t
            root.position.y = Math.sin(t * 1.05) * 0.025 * motion
            root.rotation.set(Math.sin(t * 0.77 + 1) * 0.01 * motion, 0, Math.sin(t * 0.86) * 0.012 * motion)
            spirit.update(t, motion)
            fireflies.update(t, night, pixelRatio)
        },
        react(t: number) {
            spirit.react(t)
        },
        lookAt(x: number, y: number, t: number) {
            spirit.lookAt(x, y, t)
        },
        dispose() {
            spirit.dispose()
            island.dispose()
            fireflies.dispose()
        }
    }
}
