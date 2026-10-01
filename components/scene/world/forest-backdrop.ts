/**
 * Background woodland as painted foliage cards: each tree is one camera-facing quad (2 tris) whose
 * shape is an SDF union of six clumps with a noise-ragged edge, shaded through the SAME painted
 * pipeline as the 3D world (key/hemi bands, fog, shade floor) using a fake per-clump sphere normal.
 * This is how painted backgrounds layer flat masses; it avoids polygonal silhouettes at distance and
 * lets the wood be dense enough to read as forest. Edges anti-alias via alpha-to-coverage (MSAA).
 */
import * as THREE from 'three'
import { createPaintedMaterial, type PaintHook } from './painted-material'
import { heightAt } from './terrain'
import { seeded, valueNoise3 } from './kits/kit-geometry'

const TONES = ['#4f8a5a', '#3d6a4b', '#4f8f7a', '#5e9a64', '#467f6c'].map(c => new THREE.Color(c))

const CARD_HOOK: PaintHook = {
    key: 'foliage-card',
    vertexPars: 'varying vec2 vCardUv;\nvarying float vCardSeed;',
    vertexBody: 'vCardUv = position.xy;\nvCardSeed = float(gl_InstanceID);',
    // Billboard: the quad is laid out in view space around the instance centre (scale from the matrix).
    vertexProject: /* glsl */ `
        vec4 cardCenter = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vec2 cardScale = vec2(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz));
        vec4 mvPosition = cardCenter + vec4(position.xy * cardScale, 0.0, 0.0);
        gl_Position = projectionMatrix * mvPosition;`,
    fragmentPars: /* glsl */ `
        varying vec2 vCardUv;
        varying float vCardSeed;
        float cardHash(float n) { return fract(sin(n * 91.345) * 47453.5453); }
        vec3 cardNormal;`,
    fragmentBegin: /* glsl */ `
        {
            vec2 cp = vCardUv;
            float d = 1e3, wSum = 1e-4;
            vec3 nAcc = vec3(0.0);
            for (int i = 0; i < 6; i++) {
                float fi = float(i), s = vCardSeed * 7.13 + fi * 3.71;
                float a = fi / 5.0 * 6.2831853 + cardHash(s) * 0.9;
                vec2 c = i == 0 ? vec2(0.0, 0.04) : vec2(cos(a) * 0.24, sin(a) * 0.17 + 0.04);
                float r = i == 0 ? 0.27 : 0.15 + 0.07 * cardHash(s + 1.3);
                vec2 q = (cp - c) / r;
                float di = length(cp - c) - r;
                float w = exp(-di * 20.0);
                nAcc += w * vec3(q, sqrt(max(0.0, 1.0 - dot(q, q)))); wSum += w;
                float h = clamp(0.5 + 0.5 * (di - d) / 0.05, 0.0, 1.0);
                d = mix(di, d, h) - 0.05 * h * (1.0 - h);
            }
            d = max(d, -0.44 - cp.y);
            d += (paintNoise(vec3(cp * 13.0, vCardSeed)) - 0.5) * 0.035;
            float aa = max(fwidth(d), 1e-4);
            float cardAlpha = 1.0 - smoothstep(-aa, aa, d);
            if (cardAlpha < 0.02) discard;
            diffuseColor.a = cardAlpha;
            cardNormal = normalize(nAcc / wSum + vec3(0.0, 0.0, 0.45));
        }`,
    fragmentNormal: 'normal = cardNormal;'
}

interface Region {
    /** centre x/z, radius, count, size range [min,max] metres */
    x: number
    z: number
    r: number
    count: number
    size: [number, number]
}

const REGIONS: Region[] = [
    { x: -70, z: -128, r: 52, count: 70, size: [10, 16] },
    { x: 60, z: -185, r: 75, count: 90, size: [14, 22] },
    { x: -190, z: -215, r: 70, count: 50, size: [16, 24] },
    { x: -50, z: -52, r: 17, count: 22, size: [8, 12] },
    { x: 44, z: -64, r: 22, count: 30, size: [9, 14] },
    { x: 150, z: -110, r: 50, count: 40, size: [12, 18] }
]

export function createForestBackdrop(seed = 5, density = 1) {
    const random = seeded(seed)
    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = createPaintedMaterial({ hook: CARD_HOOK, rim: 0.3, alphaToCoverage: true })
    const total = Math.round(REGIONS.reduce((n, r) => n + r.count, 0) * density)
    const mesh = new THREE.InstancedMesh(geometry, material, total)
    const m = new THREE.Matrix4(),
        s = new THREE.Vector3(),
        p = new THREE.Vector3()
    const q = new THREE.Quaternion()
    const c = new THREE.Color()
    let i = 0
    for (const region of REGIONS) {
        const n = Math.round(region.count * density)
        for (let k = 0; k < n && i < total; k++) {
            const a = random() * Math.PI * 2
            const d = Math.sqrt(random()) * region.r
            const x = region.x + Math.cos(a) * d,
                z = region.z + Math.sin(a) * d
            const size = region.size[0] + random() * (region.size[1] - region.size[0])
            // Card centre sits so its flat base (−0.44 of height) is just below the ground.
            p.set(x, heightAt(x, z) + size * 0.36, z)
            s.set(size * (0.95 + random() * 0.3), size, 1)
            mesh.setMatrixAt(i, m.compose(p, q, s))
            const tone = Math.floor(valueNoise3(x * 0.03, 7, z * 0.03) * TONES.length * 0.999)
            mesh.setColorAt(i, c.copy(TONES[tone]).offsetHSL(0, 0, (random() - 0.5) * 0.06))
            i++
        }
    }
    mesh.count = i
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

export type ForestBackdrop = ReturnType<typeof createForestBackdrop>
