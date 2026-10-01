/**
 * The moss island the spirit stands on: a lumpy earth disc with a mottled moss top, a few grass
 * tufts, two pebbles and a soft blob shadow under the feet. No shadow maps anywhere — the blob is a
 * radial-alpha plane, so the idle sway can never detach a cast shadow from its caster.
 * Top surface stays flat in the middle (spirit footprint, blob plane) and lumps toward the rim.
 */
import * as THREE from 'three'
import { createPaintedMaterial, NORMAL_UP_GLSL, WIND_GLSL } from './painted-material'
import { lumpify, seeded, valueNoise3 } from './kit-geometry'

const MOSS = ['#4a7c59', '#5e9a64', '#7eb77f'].map(c => new THREE.Color(c))
const EARTH = ['#5a4636', '#6d5640'].map(c => new THREE.Color(c))
/** Island top height at the centre — the spirit group sits here. */
export const ISLAND_TOP = 0.02

/** Lathe profile (radius, y): slight dome, rounded lip, tapering earth underside. */
const PROFILE: Array<[number, number]> = [
    [0, ISLAND_TOP],
    [0.5, 0.015],
    [0.9, -0.01],
    [1.0, -0.05],
    [1.03, -0.11],
    [0.95, -0.2],
    [0.7, -0.3],
    [0.35, -0.36],
    [0.001, -0.38]
]

function islandGeometry(): THREE.BufferGeometry {
    const geo = new THREE.LatheGeometry(
        PROFILE.map(([r, y]) => new THREE.Vector2(r, y)).reverse(), // bottom → top keeps faces outward
        48
    )
    const pos = geo.getAttribute('position') as THREE.BufferAttribute
    const colors = new Float32Array(pos.count * 3)
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i),
            y = pos.getY(i),
            z = pos.getZ(i)
        const r = Math.hypot(x, z)
        // Lumps grow with radius² so the centre stays a flat stage for the spirit + blob shadow.
        const lump = (valueNoise3(x * 3.1, y * 3.1, z * 3.1) - 0.5) * 0.09 * Math.min(1, r * r)
        pos.setXYZ(i, x * (1 + lump), y + lump * 0.4, z * (1 + lump))
        const n = valueNoise3(x * 2.4 + 7, 0, z * 2.4)
        if (y > -0.07) {
            c.copy(MOSS[0]).lerp(MOSS[1], THREE.MathUtils.smoothstep(n, 0.25, 0.5))
            c.lerp(MOSS[2], THREE.MathUtils.smoothstep(n, 0.62, 0.8) * 0.8)
        } else {
            c.copy(EARTH[0]).lerp(EARTH[1], n)
        }
        colors.set([c.r, c.g, c.b], i * 3)
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    // Keep the lathe's analytic normals: lumps are small, and recomputing would split the seam.
    return geo
}

/** One merged mesh of grass tufts: each blade is a bent triangle, darker at the root. */
function tuftGeometry(rand: () => number): THREE.BufferGeometry {
    const positions: number[] = []
    const colors: number[] = []
    const root = new THREE.Color('#3d6a4b'),
        tip = new THREE.Color('#8cc08a')
    for (let t = 0; t < 7; t++) {
        // Spread round the rim, skipping the front-centre so the spirit's feet stay clear.
        const a = (t / 7) * Math.PI * 2 + 0.4 + rand() * 0.4
        const r = 0.68 + rand() * 0.22
        const cx = Math.sin(a) * r,
            cz = Math.cos(a) * r
        for (let b = 0; b < 6; b++) {
            const yaw = rand() * Math.PI
            const h = 0.12 + rand() * 0.1
            const w = 0.03
            const lean = (rand() - 0.5) * 0.12
            const dx = Math.cos(yaw),
                dz = Math.sin(yaw)
            const ox = cx + (rand() - 0.5) * 0.08,
                oz = cz + (rand() - 0.5) * 0.08
            positions.push(ox - dx * w, 0, oz - dz * w, ox + dx * w, 0, oz + dz * w)
            positions.push(ox + lean, h, oz + lean * 0.5)
            for (const col of [root, root, tip]) colors.push(col.r, col.g, col.b)
        }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
}

/** Blades shade like the moss mass beneath them and sway gently (uWind 0 under reduced motion). */
const GRASS_HOOK = {
    key: 'spirit-grass',
    vertexPars: WIND_GLSL,
    vertexBody: 'transformed.x += paintWind(position, 3.4) * position.y * 0.25;',
    fragmentNormal: NORMAL_UP_GLSL
}

/** Radial alpha falloff, premultiplied-friendly: colour fixed, only alpha fades. */
function blobShadow(): THREE.Mesh {
    const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uColor: { value: new THREE.Color('#3b3f63') }, uOpacity: { value: 0.32 } },
        vertexShader:
            'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        // colorspace_fragment: uColor is stored linear, so encode to the sRGB output like built-in materials
        fragmentShader: /* glsl */ `
uniform vec3 uColor; uniform float uOpacity; varying vec2 vUv;
void main() {
    float d = length(vUv - 0.5) * 2.0;
    gl_FragColor = vec4(uColor, uOpacity * (1.0 - smoothstep(0.25, 1.0, d)));
    #include <colorspace_fragment>
}`
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 1.05), material)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.y = ISLAND_TOP + 0.008
    mesh.renderOrder = 1
    return mesh
}

export function createMossIsland() {
    const group = new THREE.Group()
    group.scale.set(0.85, 1, 0.85) // horizontal only: the spirit stays the hero, top height unchanged
    const rand = seeded(11)
    const meshes: THREE.Mesh[] = []
    const add = (mesh: THREE.Mesh) => (group.add(mesh), meshes.push(mesh), mesh)

    add(new THREE.Mesh(islandGeometry(), createPaintedMaterial({ vertexColors: true, rim: 0 })))
    add(
        new THREE.Mesh(
            tuftGeometry(rand),
            createPaintedMaterial({ vertexColors: true, side: THREE.DoubleSide, rim: 0, hook: GRASS_HOOK })
        )
    )
    for (const [x, z, s, color] of [
        [0.78, 0.42, 0.07, '#b4c2b9'],
        [-0.62, 0.55, 0.05, '#a3b4ad']
    ] as const) {
        const geo = new THREE.SphereGeometry(1, 16, 10)
        lumpify(geo, 0.18, 2.5, x * 10)
        const pebble = add(new THREE.Mesh(geo, createPaintedMaterial({ color, rim: 0.3 })))
        pebble.scale.set(s * 1.3, s * 0.7, s)
        pebble.position.set(x, ISLAND_TOP + s * 0.35, z)
    }
    add(blobShadow())

    return {
        group,
        dispose() {
            for (const m of meshes) {
                m.geometry.dispose()
                ;(m.material as THREE.Material).dispose()
            }
        }
    }
}
