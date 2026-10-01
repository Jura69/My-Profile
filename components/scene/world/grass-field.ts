/**
 * Instanced grass blades around the hero clearing. Each blade takes the ground's value-mass colour
 * (slightly lifted) and an up-facing normal, so the field shades as painted masses with the meadow
 * rather than sparkling per blade. Wind: vertex sway with a 5.2 s period, ≈2.5° at the tip, phase by
 * world x/z so the field ripples as one wave. `uWind = 0` holds it still (reduced motion / paused).
 */
import * as THREE from 'three'
import { createPaintedMaterial, NORMAL_UP_GLSL, WIND_GLSL, type PaintHook } from './painted-material'
import { groundColor, heightAt, pathMask } from './terrain'
import { seeded } from './kits/kit-geometry'

const BLADE_HEIGHT = 0.34

/** One tapered blade, 2 segments (4 tris), pivot at the root, slight forward curl; colour ramps
 *  darker at the root → lighter at the tip so a dense field reads as a lit top surface. */
function bladeGeometry(): THREE.BufferGeometry {
    const rows = 2
    const positions: number[] = []
    const colors: number[] = []
    const indices: number[] = []
    for (let i = 0; i <= rows; i++) {
        const t = i / rows
        const w = 0.05 * (1 - t * 0.94)
        const curl = t * t * 0.1
        const shade = 0.78 + t * 0.32
        positions.push(-w, t * BLADE_HEIGHT, curl, w, t * BLADE_HEIGHT, curl)
        colors.push(shade, shade, shade, shade, shade, shade)
    }
    for (let i = 0; i < rows; i++) {
        const a = i * 2
        indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    g.setAttribute(
        'normal',
        new THREE.Float32BufferAttribute(new Array(positions.length / 3).fill([0, 1, 0]).flat(), 3)
    )
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    g.setIndex(indices)
    return g
}

const GRASS_HOOK: PaintHook = {
    key: 'grass',
    fragmentNormal: NORMAL_UP_GLSL,
    vertexPars: WIND_GLSL,
    vertexBody: /* glsl */ `
        vec3 rootWorld = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        float bend = transformed.y / ${BLADE_HEIGHT.toFixed(2)};
        float sway = paintWind(rootWorld, 5.2) * 0.044 + paintWind(rootWorld * 3.1, 2.3) * 0.012;
        transformed.x += sway * bend * bend * ${BLADE_HEIGHT.toFixed(2)} * 2.0;
        transformed.z += sway * bend * bend * ${BLADE_HEIGHT.toFixed(2)};
    `
}

export interface GrassOptions {
    count: number
    /** Planting rectangle [minX, maxX, minZ, maxZ] in world metres. */
    bounds?: [number, number, number, number]
    /** Bare circles [x, z, radius] kept clear (spirit, tree roots) so hero objects stay readable. */
    clearings?: Array<[number, number, number]>
    seed?: number
}

export function createGrassField({ count, bounds = [-18, 22, -26, 5], clearings = [], seed = 3 }: GrassOptions) {
    const random = seeded(seed)
    const geometry = bladeGeometry()
    const material = createPaintedMaterial({
        side: THREE.DoubleSide,
        vertexColors: true,
        rim: 0,
        hook: GRASS_HOOK
    })
    const mesh = new THREE.InstancedMesh(geometry, material, count)
    const m = new THREE.Matrix4(),
        q = new THREE.Quaternion(),
        s = new THREE.Vector3(),
        p = new THREE.Vector3()
    const euler = new THREE.Euler()
    const color = new THREE.Color()
    const [minX, maxX, minZ, maxZ] = bounds
    let placed = 0
    for (let tries = 0; placed < count && tries < count * 4; tries++) {
        const x = minX + random() * (maxX - minX)
        const z = minZ + random() * (maxZ - minZ)
        // Thin out on the path and fade the field's density toward its edges.
        const edge = Math.min(x - minX, maxX - x, z - minZ, maxZ - z) / 4
        const onPath = pathMask(x, z)
        if (onPath < 0.5 || random() > onPath * Math.min(1, edge)) continue
        if (clearings.some(([cx, cz, r]) => Math.hypot(x - cx, z - cz) < r * (0.75 + random() * 0.5))) continue
        p.set(x, heightAt(x, z) - 0.02, z)
        euler.set((random() - 0.5) * 0.25, random() * Math.PI * 2, (random() - 0.5) * 0.25)
        q.setFromEuler(euler)
        const h = 0.55 + random() * 0.9
        s.set(1, h, 1)
        mesh.setMatrixAt(placed, m.compose(p, q, s))
        groundColor(x, z, color).offsetHSL((random() - 0.5) * 0.02, 0, 0.03 + random() * 0.04)
        mesh.setColorAt(placed, color)
        placed++
    }
    mesh.count = placed
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.frustumCulled = false

    return {
        mesh,
        dispose() {
            geometry.dispose()
            material.dispose()
            mesh.dispose()
        }
    }
}

export type GrassField = ReturnType<typeof createGrassField>
