/**
 * The hero tree — focal landmark of the whole page. Original silhouette: a leaning trunk with a
 * flared root plate, a wide umbrella crown of eleven lumpy lobes (never a sphere), and one long low
 * branch reaching left over the spirit with its own small leaf cluster (and the lantern anchor).
 * Crown normals are bent toward the crown centre, so the foliage shades as 3–5 painted value masses.
 * Construction: swept tapered tubes (kit-geometry) + merged lumpified icospheres; ~11 m tall.
 */
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { createPaintedMaterial, WIND_GLSL, type PaintHook } from './painted-material'
import { lumpify, paintVertexColor, seeded, sphericalNormals, taperedTube } from './kits/kit-geometry'

type Lobe = [x: number, y: number, z: number, r: number]

const CROWN_CENTER = new THREE.Vector3(1.0, 8.6, 0)
const CROWN: Lobe[] = [
    [1.0, 9.5, 0, 2.6],
    [-1.6, 8.5, 0.6, 2.2],
    [3.4, 8.3, -0.4, 2.3],
    [0.6, 8.0, 2.0, 2.0],
    [1.4, 8.4, -2.2, 2.1],
    [-0.6, 10.0, -1.0, 1.9],
    [2.6, 10.1, 1.0, 1.8],
    [-2.9, 7.5, -0.6, 1.6],
    [4.7, 7.5, 0.8, 1.5]
]
const LOW_BRANCH_END = new THREE.Vector3(-4.3, 4.7, 1.3)
const LOW_CLUSTER: Lobe[] = [
    [-4.7, 5.1, 1.3, 1.3],
    [-3.6, 5.5, 0.7, 1.1]
]
const LEAF_COLORS = ['#5e9a64', '#4f8a5a', '#67a36a', '#4f8f7a', '#5a955f'].map(c => new THREE.Color(c))

const SWAY_HOOK: PaintHook = {
    key: 'canopy-sway',
    vertexPars: WIND_GLSL,
    vertexBody: /* glsl */ `
        vec3 swayWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
        float reach = smoothstep(4.0, 11.0, transformed.y);
        transformed.x += paintWind(swayWorld * 0.3, 6.2) * 0.12 * reach;
        transformed.z += paintWind(swayWorld * 0.3 + 1.7, 7.4) * 0.06 * reach;
    `
}

/** One leaf clump: a lumpy icosphere, scaled/flattened, carrying its own tone. */
function clump(x: number, y: number, z: number, r: number, tone: THREE.Color, seed: number): THREE.BufferGeometry {
    const g = new THREE.IcosahedronGeometry(1, 2)
    lumpify(g, 0.3, 2.3, seed)
    g.scale(r, r * 0.82, r)
    g.translate(x, y, z)
    return paintVertexColor(g, tone)
}

/** Each lobe = one core clump + 7 smaller clumps on its upper/outer surface: the scalloped,
 *  cauliflower edge of painted foliage instead of one smooth blob. */
function crownGeometry(lobes: Lobe[], center: THREE.Vector3, random: () => number): THREE.BufferGeometry {
    const parts: THREE.BufferGeometry[] = []
    const d = new THREE.Vector3()
    lobes.forEach(([x, y, z, r], i) => {
        const base = LEAF_COLORS[Math.floor(random() * LEAF_COLORS.length)]
        const tone = () => base.clone().offsetHSL((random() - 0.5) * 0.02, 0, (random() - 0.5) * 0.05)
        parts.push(clump(x, y, z, r * 0.92, tone(), i * 7.3))
        const outward = new THREE.Vector3(x, y, z).sub(center).setY(0).normalize()
        for (let k = 0; k < 7; k++) {
            d.set(random() - 0.5, random() * 0.9 - 0.15, random() - 0.5)
                .normalize()
                .addScaledVector(outward, 0.6)
                .normalize()
            const cr = r * (0.34 + random() * 0.14)
            parts.push(clump(x + d.x * r * 0.74, y + d.y * r * 0.62, z + d.z * r * 0.74, cr, tone(), i * 7.3 + k + 1))
        }
    })
    const merged = mergeGeometries(parts)!
    parts.forEach(p => p.dispose())
    sphericalNormals(merged, center, 0.5)
    return merged
}

function woodGeometry(random: () => number): { geometry: THREE.BufferGeometry; lowBranch: THREE.CatmullRomCurve3 } {
    const trunk = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.6, 0),
        new THREE.Vector3(0.15, 2.5, 0.05),
        new THREE.Vector3(0.55, 5.0, 0.1),
        new THREE.Vector3(1.0, 7.4, 0)
    ])
    const parts = [taperedTube(trunk, t => 0.55 * (1 - 0.55 * t) + 0.55 * Math.pow(1 - t, 7), 22, 16)]
    // Root plate: seven buttress roots splaying out and diving under the ground.
    for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 + random() * 0.4
        const reach = 1.7 + random() * 0.9
        const c = Math.cos(a),
            s = Math.sin(a)
        const root = new THREE.CatmullRomCurve3([
            new THREE.Vector3(c * 0.25, 1.1, s * 0.25),
            new THREE.Vector3(c * 0.95, 0.3, s * 0.95),
            new THREE.Vector3(c * reach, -0.35, s * reach)
        ])
        parts.push(taperedTube(root, t => 0.34 * (1 - t) + 0.04, 8, 6))
    }
    // Crown branches: trunk → toward each main lobe, bowed upward.
    const branchTargets = [1, 2, 3, 4, 7, 8]
    branchTargets.forEach((lobe, i) => {
        const start = trunk.getPointAt(0.62 + (i % 3) * 0.12)
        const [x, y, z] = CROWN[lobe]
        const end = new THREE.Vector3(x, y - 0.6, z).lerp(start, 0.18)
        const mid = start
            .clone()
            .lerp(end, 0.5)
            .add(new THREE.Vector3(0, 0.5, 0))
        parts.push(taperedTube(new THREE.CatmullRomCurve3([start, mid, end]), t => 0.2 * (1 - t) + 0.05, 10, 6))
    })
    // The long low branch the spirit sits under.
    const lowStart = trunk.getPointAt(0.42)
    const low = new THREE.CatmullRomCurve3([
        lowStart,
        new THREE.Vector3(-1.4, 4.3, 0.5),
        new THREE.Vector3(-3.0, 4.3, 1.0),
        LOW_BRANCH_END
    ])
    parts.push(taperedTube(low, t => 0.24 * (1 - t) + 0.05, 16, 7))
    const geometry = mergeGeometries(parts)!
    parts.forEach(p => p.dispose())
    return { geometry, lowBranch: low }
}

export function createHeroTree(seed = 11) {
    const random = seeded(seed)
    const group = new THREE.Group()
    const { geometry: woodGeo, lowBranch } = woodGeometry(random)
    const woodMat = createPaintedMaterial({ color: '#7a6149' })
    const wood = new THREE.Mesh(woodGeo, woodMat)

    const crownGeo = mergeGeometries([
        crownGeometry(CROWN, CROWN_CENTER, random),
        crownGeometry(LOW_CLUSTER, new THREE.Vector3(-4.2, 5.0, 1.0), random)
    ])!
    const leafMat = createPaintedMaterial({ vertexColors: true, hook: SWAY_HOOK, rim: 0.5 })
    const crown = new THREE.Mesh(crownGeo, leafMat)
    for (const m of [wood, crown]) {
        m.castShadow = true
        m.receiveShadow = true
        group.add(m)
    }

    return {
        group,
        /** Local point on the low branch where a lantern cord hangs from. */
        lanternAnchor: lowBranch.getPointAt(0.86),
        crownCenter: CROWN_CENTER.clone(),
        dispose() {
            woodGeo.dispose()
            crownGeo.dispose()
            woodMat.dispose()
            leafMat.dispose()
        }
    }
}

export type HeroTree = ReturnType<typeof createHeroTree>
