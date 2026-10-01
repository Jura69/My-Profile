/**
 * Geometry helpers for the painted forest world.
 *
 * Source: 3dviz-pro-max kit (`templates/kits/kit-core.js` → `seeded`; `nature/tree-round.js` → the
 * idea of a lobed crown placed on branch tips and a root flare). Changes: ported to TypeScript for
 * three 0.172, every `materialFor`/PBR/`castShadow` default dropped (the world uses painted
 * materials and opts into shadows per mesh), cylinder stacks replaced by one swept tapered tube.
 * The kit package states no licence; only the public-domain mulberry32 PRNG is copied verbatim,
 * everything else is re-authored here.
 */
import * as THREE from 'three'

/** Deterministic mulberry32 stream so the world composes identically on every load. */
export function seeded(seed: number): () => number {
    let state = seed | 0
    return () => {
        state = (state + 0x6d2b79f5) | 0
        let t = Math.imul(state ^ (state >>> 15), 1 | state)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/** Cheap smooth 3D value noise in [0,1] — CPU twin of the shader noise, used for jitter/colour masses. */
export function valueNoise3(x: number, y: number, z: number): number {
    const hash = (i: number, j: number, k: number) => {
        const s = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453
        return s - Math.floor(s)
    }
    const fx = Math.floor(x),
        fy = Math.floor(y),
        fz = Math.floor(z)
    const ux = x - fx,
        uy = y - fy,
        uz = z - fz
    const sx = ux * ux * (3 - 2 * ux),
        sy = uy * uy * (3 - 2 * uy),
        sz = uz * uz * (3 - 2 * uz)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const plane = (k: number) =>
        lerp(
            lerp(hash(fx, fy, fz + k), hash(fx + 1, fy, fz + k), sx),
            lerp(hash(fx, fy + 1, fz + k), hash(fx + 1, fy + 1, fz + k), sx),
            sy
        )
    return lerp(plane(0), plane(1), sz)
}

/**
 * Tube swept along a curve with a per-station radius — one continuous skin for trunks, branches,
 * roots and stalks (the kit stacked cylinders + collars; a sweep has no visible joins).
 * `radius(t)` is evaluated at t∈[0,1]; the far end is capped so tips never show a hole.
 */
export function taperedTube(
    curve: THREE.Curve<THREE.Vector3>,
    radius: (t: number) => number,
    segments = 16,
    radial = 8
): THREE.BufferGeometry {
    const frames = curve.computeFrenetFrames(segments, false)
    const positions: number[] = []
    const normals: number[] = []
    const indices: number[] = []
    const p = new THREE.Vector3(),
        n = new THREE.Vector3()
    for (let i = 0; i <= segments; i++) {
        const t = i / segments
        curve.getPointAt(t, p)
        const r = radius(t)
        for (let j = 0; j <= radial; j++) {
            const a = (j / radial) * Math.PI * 2
            n.copy(frames.normals[i]).multiplyScalar(Math.cos(a)).addScaledVector(frames.binormals[i], Math.sin(a))
            positions.push(p.x + n.x * r, p.y + n.y * r, p.z + n.z * r)
            normals.push(n.x, n.y, n.z)
        }
    }
    for (let i = 0; i < segments; i++) {
        for (let j = 0; j < radial; j++) {
            const a = i * (radial + 1) + j,
                b = a + radial + 1
            indices.push(a, a + 1, b, b, a + 1, b + 1) // CCW seen from outside: (a+1−a)×(b−a) ∥ +normal
        }
    }
    // Tip cap: a single fan to the end point.
    curve.getPointAt(1, p)
    const tip = positions.length / 3
    const tangent = curve.getTangentAt(1)
    positions.push(p.x, p.y, p.z)
    normals.push(tangent.x, tangent.y, tangent.z)
    const ring = segments * (radial + 1)
    for (let j = 0; j < radial; j++) indices.push(ring + j, ring + j + 1, tip)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    geometry.setIndex(indices)
    return geometry
}

/** Push every vertex along its normal by `amount × (noise − 0.5)` — breaks the CG-perfect blob. */
export function lumpify(geometry: THREE.BufferGeometry, amount: number, frequency: number, seed = 0): void {
    const pos = geometry.getAttribute('position') as THREE.BufferAttribute
    const nor = geometry.getAttribute('normal') as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i),
            y = pos.getY(i),
            z = pos.getZ(i)
        const k = (valueNoise3(x * frequency + seed, y * frequency, z * frequency) - 0.5) * amount
        pos.setXYZ(i, x + nor.getX(i) * k, y + nor.getY(i) * k, z + nor.getZ(i) * k)
    }
    pos.needsUpdate = true
}

/**
 * Bend vertex normals toward "away from `center`" — the painted-foliage trick: a crown of many
 * lobes shades as one soft mass (3–5 value bands) instead of a pile of faceted balls.
 * `blend` 0 keeps the lobe's own normal, 1 is fully spherical.
 */
export function sphericalNormals(geometry: THREE.BufferGeometry, center: THREE.Vector3, blend: number): void {
    const pos = geometry.getAttribute('position') as THREE.BufferAttribute
    const nor = geometry.getAttribute('normal') as THREE.BufferAttribute
    const v = new THREE.Vector3(),
        n = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).sub(center).normalize()
        n.fromBufferAttribute(nor, i).lerp(v, blend).normalize()
        nor.setXYZ(i, n.x, n.y, n.z)
    }
    nor.needsUpdate = true
}

/** Fill a `color` attribute with one colour (so merged parts can carry per-part hue jitter). */
export function paintVertexColor(geometry: THREE.BufferGeometry, color: THREE.Color): THREE.BufferGeometry {
    const count = geometry.getAttribute('position').count
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) data.set([color.r, color.g, color.b], i * 3)
    geometry.setAttribute('color', new THREE.BufferAttribute(data, 3))
    return geometry
}
