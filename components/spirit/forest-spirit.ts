/**
 * "Mầm Đèn" — the site's original forest spirit (silhouette C, chosen 2026-10-01).
 * Body plan: squat mossy pebble on four root nubs (support polygon under the centre of mass), two
 * low dot eyes facing +Z, one sprout stalk rising from the moss and arcing forward with a glowing seed
 * hanging at its tip (`seed-lantern.ts` owns the glow, light, pool and pendulum). Rig = group transforms:
 * breathing squash ≤ 6 %, stalk sway, leaf flutter, blink, a gaze that follows the pointer (or glances
 * around / up at its lantern when idle), plus a pointer `react()` hop that decays over ~1.2 s.
 * On top sits the expression layer (`spirit-expression.ts`): a theme-switch reaction, or a fixed pose for stills.
 * All motion is elapsed-time based; `motion` 0 freezes the rest pose (reduced motion).
 */
import * as THREE from 'three'
import { createPaintedMaterial } from './painted-material'
import { lumpify, taperedTube } from './kit-geometry'
import { createSeedLantern } from './seed-lantern'
import { createSpiritEyes } from './spirit-eyes'
import { idleGlance, NEUTRAL_POSE, themeReaction, type SpiritPose } from './spirit-expression'
/** Close-up hero framing: a strong rim reads as a CG outline, so the spirit keeps it faint. */
const SPIRIT_RIM = 0.3
const REACT_SECONDS = 1.2
/** Pointer gaze wins for this long after the last move, then the idle glances take over. */
const POINTER_HOLD_SECONDS = 2.5

function ellipsoid(r: [number, number, number], lump: number, freq: number, seed: number): THREE.BufferGeometry {
    const g = new THREE.SphereGeometry(1, 48, 28)
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
    const paint = (color: string, extra: Parameters<typeof createPaintedMaterial>[0] = {}) =>
        createPaintedMaterial({ color, rim: SPIRIT_RIM, ...extra })

    // --- body: pebble + moss cap (squash pivot at the ground) ----------------------------------
    const body = add(group, new THREE.Group())
    const stoneGeo = ellipsoid([0.5, 0.31, 0.43], 0.035, 3.2, 1)
    const pos = stoneGeo.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) if (pos.getY(i) < -0.19) pos.setY(i, -0.19 + (pos.getY(i) + 0.19) * 0.25)
    stoneGeo.computeVertexNormals()
    add(body, new THREE.Mesh(stoneGeo, paint('#b4c2b9'))).position.y = 0.25
    const moss = add(body, new THREE.Mesh(ellipsoid([0.47, 0.25, 0.41], 0.09, 8.5, 4), paint('#5e9a64')))
    moss.position.y = 0.47 // cap sits inside the pebble outline (no mushroom brim); eyes stay on bare stone

    // --- eyes (low on the front, like the silhouette) ------------------------------------------
    const eyes = createSpiritEyes(body)

    // --- root nubs (three in front as drawn, one behind): the support polygon ----------------
    const rootMat = paint('#6f8a80')
    for (const [x, z] of [
        [-0.25, 0.12],
        [0, 0.22],
        [0.25, 0.12],
        [0, -0.2]
    ] as const) {
        const nub = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 10), rootMat))
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
            taperedTube(stalkCurve, t => 0.03 - t * 0.013, 32, 10),
            paint('#3d6a4b')
        )
    )
    const leaf = add(stalkPivot, new THREE.Mesh(leafGeometry(), paint('#7eb77f', { side: THREE.DoubleSide })))
    leaf.position.copy(stalkCurve.getPointAt(0.32))
    leaf.rotation.set(0.3, 0.4, 2.7)

    const lantern = createSeedLantern(SPIRIT_RIM)
    lantern.group.position.copy(stalkCurve.getPointAt(1))
    stalkPivot.add(lantern.group)
    group.add(lantern.pool)

    let reactAt = -Infinity
    let lastT = 0,
        prevStalk = 0,
        prevYaw = 0
    let pointerAt = -Infinity
    const pointer = [0, 0]
    const gaze = [0, 0]
    let themeAt = -Infinity,
        toNight = false
    let fixedPose: SpiritPose | null = null
    const live: SpiritPose = { ...NEUTRAL_POSE }

    return {
        group,
        /** 0 = day (seed is a soft golden fruit), 1 = night (seed is a lantern lighting the island). */
        setGlow(amount: number) {
            lantern.setGlow(amount)
        },
        /** Start the pointer reaction at elapsed time `t`: hop + squash, seed swings hard, blink. */
        react(t: number) {
            reactAt = t
            lantern.kick()
        },
        /** Theme switched at elapsed time `t`: play the day/night reaction (lantern nudged awake at night). */
        themeShift(t: number, night: boolean) {
            themeAt = t
            toNight = night
            if (night) lantern.kick(0.35)
        },
        /** Hold a fixed expression (stills); null returns to the live rig. */
        setPose(pose: SpiritPose | null) {
            fixedPose = pose
        },
        /** Pointer direction relative to the hero cell, each axis −1..1 (+y = up). */
        lookAt(x: number, y: number, t: number) {
            if (!Number.isFinite(x) || !Number.isFinite(y)) return
            pointer[0] = THREE.MathUtils.clamp(x, -1, 1)
            pointer[1] = THREE.MathUtils.clamp(y, -1, 1)
            pointerAt = t
        },
        /** Pose at elapsed time `t` (seconds); `motion` 0 freezes in the rest pose. */
        update(t: number, motion = 1) {
            const gap = t - lastT
            const dt = THREE.MathUtils.clamp(gap, 0, 0.1)
            lastT = t
            // After a pause (offscreen, hidden tab, still frame) re-sync instead of reading the jump as motion.
            const resync = gap > 0.1 || gap < 0
            const since = t - reactAt
            const k = motion > 0 ? THREE.MathUtils.clamp(1 - since / REACT_SECONDS, 0, 1) : 0
            // Guard on k: before the first react `since` is Infinity and sin(Infinity) is NaN.
            const bounce = k > 0 ? Math.sin(since * Math.PI * 2 * 2.2) * k : 0
            const hop = k > 0 && since < 0.35 ? Math.sin((since / 0.35) * Math.PI) * 0.08 * k : 0

            const pose = fixedPose ?? (motion > 0 ? themeReaction(t - themeAt, toNight, live) : NEUTRAL_POSE)
            const breathe = (1 + Math.sin((t * Math.PI * 2) / 3.2)) * 0.5 * motion
            const squash = breathe * 0.05 + bounce * 0.07 + pose.droop * 0.06
            body.scale.set(1 + squash * 0.5, 1 - squash, 1 + squash * 0.5)
            body.position.y = hop
            // Droop bows the sprout forward and sags the lantern down to its side (nodding off).
            stalkPivot.rotation.z = Math.sin((t * Math.PI * 2) / 4.1) * 0.06 * motion + bounce * 0.12 - pose.droop * 0.3
            stalkPivot.rotation.x = Math.sin((t * Math.PI * 2) / 5.3) * 0.04 * motion + pose.droop * 0.18
            leaf.rotation.z = 2.7 + (Math.sin(t * 3.3) * 0.06 + Math.sin(t * 7.9) * 0.02) * motion + bounce * 0.2

            // Gaze: ease toward the pointer (recent) or the idle glance for this ~3 s slot.
            const [rx, ry] =
                motion === 0 ? [0, 0] : t - pointerAt < POINTER_HOLD_SECONDS ? pointer : idleGlance(Math.floor(t / 3.2))
            const tx = THREE.MathUtils.lerp(rx, pose.gaze[0], pose.gazeWeight),
                ty = THREE.MathUtils.lerp(ry, pose.gaze[1], pose.gazeWeight)
            const ease = motion === 0 ? 1 : 1 - Math.exp(-dt * 5)
            gaze[0] += (tx - gaze[0]) * ease
            gaze[1] += (ty - gaze[1]) * ease
            body.rotation.set(-gaze[1] * 0.06, gaze[0] * 0.32, pose.tilt)
            const blink = motion > 0 && (t % 4.6 < 0.13 || (k > 0 && since < 0.18)) ? 0.12 : 1
            eyes.update(gaze[0], gaze[1], blink < 1 ? Math.min(blink, pose.eyes) : pose.eyes)
            lantern.setFlare(pose.flare)

            // The lantern lags whatever swings it: stalk sway + body turning.
            const stalkSpeed =
                !resync && dt > 0 ? (stalkPivot.rotation.z - prevStalk + (body.rotation.y - prevYaw) * 0.6) / dt : 0
            prevStalk = stalkPivot.rotation.z
            prevYaw = body.rotation.y
            lantern.update(t, dt, motion, stalkSpeed)
        },
        dispose() {
            for (const d of new Set(disposables)) d.dispose()
            eyes.dispose()
            lantern.dispose()
        }
    }
}

export type ForestSpirit = ReturnType<typeof createForestSpirit>
