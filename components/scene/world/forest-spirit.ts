/**
 * "Mầm Đèn" — the site's original forest spirit (silhouette C, chosen 2026-10-01).
 * Body plan: squat mossy pebble on three root nubs (support polygon under the centre of mass), two
 * low dot eyes facing +Z, one sprout stalk rising from the moss and arcing forward with a glowing seed
 * hanging at its tip. Head–front reads from the stalk direction; nothing about it borrows an owned
 * character. The seed owns its emissive surface AND its PointLight (decay 2) — receivers (body, moss,
 * ground) are lit by the light, never by the emissive. Rig = group transforms only:
 * body squash ≤ 6 %, stalk sway, seed pendulum, blink. All motion is elapsed-time based.
 */
import * as THREE from 'three'
import { createPaintedMaterial } from './painted-material'
import { lumpify, taperedTube } from './kits/kit-geometry'

const SEED_COLOR = '#f1d999'
const SEED_GLOW = '#e7c46d'
/** Candela at full night; inverse-square falloff over the ~3 m pool around the spirit. */
const SEED_LIGHT_INTENSITY = 2.4

function ellipsoid(r: [number, number, number], lump: number, freq: number, seed: number): THREE.BufferGeometry {
    const g = new THREE.SphereGeometry(1, 40, 24)
    lumpify(g, lump, freq, seed)
    g.scale(...r)
    return g
}

function leafGeometry(): THREE.BufferGeometry {
    const s = new THREE.Shape()
    s.moveTo(0, 0)
    s.bezierCurveTo(0.06, 0.05, 0.16, 0.05, 0.22, 0)
    s.bezierCurveTo(0.16, -0.04, 0.06, -0.04, 0, 0)
    return new THREE.ShapeGeometry(s, 8)
}

export function createForestSpirit() {
    const group = new THREE.Group()
    const disposables: Array<{ dispose(): void }> = []
    const add = <T extends THREE.Object3D>(parent: THREE.Object3D, obj: T): T => {
        parent.add(obj)
        if (obj instanceof THREE.Mesh) disposables.push(obj.geometry, obj.material as THREE.Material)
        return obj
    }

    // --- body: pebble + moss cap (squash pivot at the ground) ----------------------------------
    const body = add(group, new THREE.Group())
    const stoneGeo = ellipsoid([0.5, 0.31, 0.43], 0.05, 3.2, 1)
    const pos = stoneGeo.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) if (pos.getY(i) < -0.19) pos.setY(i, -0.19 + (pos.getY(i) + 0.19) * 0.25)
    stoneGeo.computeVertexNormals()
    const stone = add(body, new THREE.Mesh(stoneGeo, createPaintedMaterial({ color: '#b4c2b9' })))
    stone.position.y = 0.25
    const moss = add(
        body,
        new THREE.Mesh(ellipsoid([0.5, 0.29, 0.43], 0.09, 8.5, 4), createPaintedMaterial({ color: '#5e9a64' }))
    )
    moss.position.y = 0.42 // cap covers the top ~35 % of the pebble, eyes stay on bare stone

    // --- eyes (low on the front, like the silhouette), blink by scaling Y ----------------------
    const ink = new THREE.MeshBasicMaterial({ color: '#2d2a24' })
    const shine = new THREE.MeshBasicMaterial({ color: '#ffffff' })
    const eyes: THREE.Group[] = []
    for (const side of [-1, 1]) {
        const eye = add(body, new THREE.Group())
        eye.position.set(side * 0.12, 0.2, 0.405)
        const pupil = add(eye, new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), ink))
        pupil.scale.set(1, 1.15, 0.5)
        add(eye, new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), shine)).position.set(0.014, 0.02, 0.02)
        eyes.push(eye)
    }

    // --- root nubs (three in front as drawn, one behind): the support polygon ----------------
    const rootMat = createPaintedMaterial({ color: '#6f8a80' })
    for (const [x, z] of [
        [-0.25, 0.12],
        [0, 0.22],
        [0.25, 0.12],
        [0, -0.2]
    ] as const) {
        const nub = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), rootMat))
        nub.position.set(x, 0.04, z)
        nub.scale.set(1.25, 0.55, 1)
    }

    // --- sprout stalk + leaf + seed lantern ----------------------------------------------------
    const stalkPivot = add(body, new THREE.Group())
    stalkPivot.position.set(0, 0.68, -0.02)
    const stalkCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.04, 0),
        new THREE.Vector3(0.02, 0.35, 0.02),
        new THREE.Vector3(0.14, 0.62, 0.12),
        new THREE.Vector3(0.3, 0.66, 0.3),
        new THREE.Vector3(0.37, 0.55, 0.38)
    ])
    add(
        stalkPivot,
        new THREE.Mesh(
            taperedTube(stalkCurve, t => 0.03 - t * 0.013, 24, 7),
            createPaintedMaterial({ color: '#3d6a4b' })
        )
    )
    const leaf = add(
        stalkPivot,
        new THREE.Mesh(leafGeometry(), createPaintedMaterial({ color: '#7eb77f', side: THREE.DoubleSide }))
    )
    leaf.position.copy(stalkCurve.getPointAt(0.32))
    leaf.rotation.set(0.3, 0.4, 2.7)

    const seedGroup = add(stalkPivot, new THREE.Group())
    seedGroup.position.copy(stalkCurve.getPointAt(1))
    add(
        seedGroup,
        new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.035, 10), createPaintedMaterial({ color: '#6d5640' }))
    ).position.y = -0.02
    const seedMat = createPaintedMaterial({ color: SEED_COLOR, emissive: SEED_GLOW, emissiveIntensity: 0.25 })
    const seed = add(seedGroup, new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 14), seedMat))
    seed.position.y = -0.11
    seed.scale.set(1, 1.2, 1)
    const light = new THREE.PointLight('#f6d58e', 0, 6, 2)
    light.position.y = -0.11
    seedGroup.add(light)

    group.traverse(o => {
        if (o instanceof THREE.Mesh && o.material !== ink && o.material !== shine) o.castShadow = o.receiveShadow = true
    })

    let glow = 0
    let lightEnabled = true
    const applyGlow = () => {
        seedMat.emissiveIntensity = THREE.MathUtils.lerp(0.25, 2.4, glow)
        light.intensity = lightEnabled ? SEED_LIGHT_INTENSITY * glow : 0
    }

    return {
        group,
        light,
        /** 0 = day (seed is a soft golden fruit), 1 = night (seed is a lantern). */
        setGlow(amount: number) {
            glow = THREE.MathUtils.clamp(amount, 0, 1)
            applyGlow()
        },
        /** Lighting isolation check: kill the receiver light, keep the emissive. */
        setLightEnabled(enabled: boolean) {
            lightEnabled = enabled
            applyGlow()
        },
        /** Pose at elapsed time `t` (seconds); `motion` 0 freezes in the rest pose. */
        update(t: number, motion = 1) {
            const breathe = (1 + Math.sin((t * Math.PI * 2) / 3.2)) * 0.5 * motion
            body.scale.set(1 + breathe * 0.025, 1 - breathe * 0.05, 1 + breathe * 0.025)
            stalkPivot.rotation.z = Math.sin((t * Math.PI * 2) / 4.1) * 0.06 * motion
            stalkPivot.rotation.x = Math.sin((t * Math.PI * 2) / 5.3) * 0.04 * motion
            seedGroup.rotation.z = Math.sin((t * Math.PI * 2) / 2.6 + 1) * 0.12 * motion
            const blink = motion > 0 && t % 4.6 < 0.13 ? 0.12 : 1
            for (const eye of eyes) eye.scale.y = blink
        },
        dispose() {
            for (const d of new Set(disposables)) d.dispose()
            light.dispose()
        }
    }
}

export type ForestSpirit = ReturnType<typeof createForestSpirit>
