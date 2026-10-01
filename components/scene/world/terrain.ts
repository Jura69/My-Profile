/**
 * Ground heightfield for the painted forest: a gentle foreground meadow, a dirt path that leads the
 * eye to the hero tree, and two hill masses crossing at different heights so the horizon is never one
 * straight line. Colour is per-vertex in four green value masses (painted grouping, not per-blade
 * detail) + the path. `heightAt` is the single height authority for everything planted on the ground.
 */
import * as THREE from 'three'
import { createPaintedMaterial } from './painted-material'
import { valueNoise3 } from './kits/kit-geometry'

interface Hill {
    x: number
    z: number
    radius: number
    height: number
}

/** Two crossing masses behind the hero (left lower + nearer, right taller + farther) and a knoll under the tree. */
const HILLS: Hill[] = [
    { x: -70, z: -120, radius: 70, height: 13 },
    { x: 60, z: -175, radius: 95, height: 21 },
    { x: -190, z: -210, radius: 90, height: 30 },
    { x: 7, z: -13, radius: 9, height: 0.9 }
]

/** Path control points, foreground → hero tree → off toward the left hill. */
const PATH: Array<[number, number]> = [
    [-2, 14],
    [0.5, 4],
    [3, -4],
    [2, -12],
    [-4, -22],
    [-14, -36],
    [-28, -60]
]

function distanceToPath(x: number, z: number): number {
    let best = Infinity
    for (let i = 0; i < PATH.length - 1; i++) {
        const [ax, az] = PATH[i],
            [bx, bz] = PATH[i + 1]
        const dx = bx - ax,
            dz = bz - az
        const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz)))
        best = Math.min(best, Math.hypot(x - (ax + dx * t), z - (az + dz * t)))
    }
    return best
}

/** World-space ground height (metres). Hills are smooth bumps; the meadow rolls ≤ 0.5 m. */
export function heightAt(x: number, z: number): number {
    let h = (valueNoise3(x * 0.045, 0, z * 0.045) - 0.5) * 1.0
    for (const hill of HILLS) {
        const d = Math.hypot(x - hill.x, z - hill.z) / hill.radius
        h += hill.height * Math.exp(-d * d * 2.2)
    }
    return h
}

/** 0 on the path centre → 1 in grass; noisy edge so it reads as worn earth, not a decal. */
export function pathMask(x: number, z: number): number {
    const width = 1.1 + Math.max(0, -z) * 0.012
    const edge = (valueNoise3(x * 0.8, 3, z * 0.8) - 0.5) * 0.6
    return THREE.MathUtils.smoothstep(distanceToPath(x, z) + edge, width * 0.6, width * 1.25)
}

const GREENS = ['#4f8a5a', '#5e9a64', '#76ad6e', '#93bf7c'].map(c => new THREE.Color(c))
const PATH_COLOR = new THREE.Color('#cdb88f')

/** Ground colour at a point — exported so grass blades pick up the same value masses. */
export function groundColor(x: number, z: number, target: THREE.Color): THREE.Color {
    const n = valueNoise3(x * 0.06, 11, z * 0.06) * 0.7 + valueNoise3(x * 0.21, 5, z * 0.21) * 0.3
    const band = Math.min(GREENS.length - 1, Math.floor(THREE.MathUtils.smoothstep(n, 0.25, 0.75) * GREENS.length))
    return target.copy(GREENS[band]).lerp(PATH_COLOR, 1 - pathMask(x, z))
}

export function createTerrain({ size = 520, segments = 96 } = {}) {
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments)
    geometry.rotateX(-Math.PI / 2)
    geometry.translate(0, 0, -size / 2 + 60)
    const pos = geometry.getAttribute('position') as THREE.BufferAttribute
    const colors = new Float32Array(pos.count * 3)
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i),
            z = pos.getZ(i)
        pos.setY(i, heightAt(x, z) - (1 - pathMask(x, z)) * 0.05)
        groundColor(x, z, c)
        colors.set([c.r, c.g, c.b], i * 3)
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.computeVertexNormals()
    const material = createPaintedMaterial({ vertexColors: true, rim: 0 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = true
    return {
        mesh,
        dispose() {
            geometry.dispose()
            material.dispose()
        }
    }
}

export type Terrain = ReturnType<typeof createTerrain>
