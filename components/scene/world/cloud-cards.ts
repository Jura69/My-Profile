/**
 * Cumulus banks as flat painted cards at three depths (no volumetrics): each card is an SDF union of
 * puffs with a flat base and a noise-ragged edge, painted in two values — lit crowns, warm-lavender
 * underside — then hazed toward the horizon colour by depth. Cards billboard to the camera.
 */
import * as THREE from 'three'
import { seeded } from './kits/kit-geometry'

const MAX_PUFFS = 8

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`

const FRAGMENT = /* glsl */ `
uniform vec3 uPuffs[${MAX_PUFFS}];
uniform int uCount;
uniform vec3 uLit; uniform vec3 uShade; uniform vec3 uHaze;
uniform float uHazeAmt; uniform float uBase; uniform float uSeed; uniform float uOpacity;
uniform vec2 uLight;
varying vec2 vUv;
float h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h2(i), h2(i + vec2(1, 0)), f.x), mix(h2(i + vec2(0, 1)), h2(i + vec2(1, 1)), f.x), f.y); }
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
void main() {
    vec2 p = (vUv - 0.5) * vec2(2.0, 1.0);
    float d = 1e3, lightSum = 0.0, wSum = 1e-4;
    for (int i = 0; i < ${MAX_PUFFS}; i++) {
        if (i >= uCount) break;
        vec3 c = uPuffs[i];
        float di = length(p - c.xy) - c.z;
        // Soft-weighted puff lighting: deeper-inside puffs dominate, overlaps blend (no hard seams).
        float w = exp(-di * 16.0);
        lightSum += w * dot((p - c.xy) / c.z, uLight); wSum += w;
        d = smin(d, di, 0.09);
    }
    d += (n2(p * 11.0 + uSeed) - 0.5) * 0.03 + (n2(p * 27.0 - uSeed) - 0.5) * 0.012;
    d = max(d, uBase - p.y);
    float aa = fwidth(d);
    float alpha = 1.0 - smoothstep(-aa, aa, d);
    if (alpha < 0.01) discard;
    float light = lightSum / wSum;
    float wob = n2(p * 6.0 + uSeed * 3.0) - 0.5;
    float lit = smoothstep(-0.04, 0.04, light + 0.2 + wob * 0.35);
    float under = smoothstep(uBase + 0.03, uBase + 0.2, p.y + wob * 0.08);
    vec3 col = mix(uShade, uLit, lit * under);
    col = mix(col, uHaze, uHazeAmt);
    gl_FragColor = vec4(col, alpha * uOpacity);
    #include <colorspace_fragment>
}
`

/** [x, y, z, width, hazeAmount] — three depth layers framed for the hero camera looking down −Z. */
const LAYOUT: Array<[number, number, number, number, number]> = [
    [-230, 48, -470, 250, 0.5],
    [40, 62, -480, 280, 0.5],
    [290, 44, -460, 220, 0.5],
    [-120, 64, -270, 130, 0.28],
    [110, 74, -260, 150, 0.28],
    [-24, 50, -130, 52, 0.12],
    [78, 56, -150, 64, 0.12]
]

function puffsFor(random: () => number, base: number): { puffs: THREE.Vector3[]; count: number } {
    const puffs: THREE.Vector3[] = []
    const n = 5 + Math.floor(random() * 2)
    for (let i = 0; i < n; i++) {
        const x = -0.72 + (1.44 * i) / (n - 1) + (random() - 0.5) * 0.12
        const r = 0.09 + Math.pow(1 - Math.abs(x), 1.4) * 0.27 + random() * 0.06
        puffs.push(new THREE.Vector3(x, base + r * 0.5 + Math.abs(x) * 0.05 + random() * 0.05, r))
    }
    // Two crown puffs stacked on the middle so the bank towers rather than lies flat.
    for (let i = 0; i < 2; i++) {
        const x = (random() - 0.5) * 0.5
        puffs.push(new THREE.Vector3(x, base + 0.33 + random() * 0.08, 0.15 + random() * 0.08))
    }
    // three uploads uniform arrays at their declared length: pad the unused slots (skipped via uCount).
    const used = puffs.slice(0, MAX_PUFFS)
    while (puffs.length < MAX_PUFFS) puffs.push(new THREE.Vector3(0, 0, 0))
    return { puffs: puffs.slice(0, MAX_PUFFS), count: used.length }
}

export interface CloudPalette {
    lit: THREE.ColorRepresentation
    shade: THREE.ColorRepresentation
    haze: THREE.ColorRepresentation
}

export function createCloudCards(seed = 7) {
    const random = seeded(seed)
    const group = new THREE.Group()
    const geometry = new THREE.PlaneGeometry(1, 0.5)
    const shared = {
        uLit: { value: new THREE.Color() },
        uShade: { value: new THREE.Color() },
        uHaze: { value: new THREE.Color() },
        uLight: { value: new THREE.Vector2(-0.55, 0.83) }
    }
    const materials: THREE.ShaderMaterial[] = []
    for (const [x, y, z, width, haze] of LAYOUT) {
        const base = -0.2
        const { puffs, count } = puffsFor(random, base)
        const material = new THREE.ShaderMaterial({
            uniforms: {
                ...shared,
                uPuffs: { value: puffs },
                uCount: { value: count },
                uHazeAmt: { value: haze },
                uBase: { value: base },
                uSeed: { value: random() * 100 },
                uOpacity: { value: 1 }
            },
            vertexShader: VERTEX,
            fragmentShader: FRAGMENT,
            transparent: true,
            depthWrite: false,
            fog: false,
            toneMapped: false
        })
        materials.push(material)
        const card = new THREE.Mesh(geometry, material)
        card.position.set(x, y, z)
        card.scale.setScalar(width)
        card.renderOrder = -5
        card.onBeforeRender = (_r, _s, camera) => card.quaternion.copy(camera.quaternion)
        group.add(card)
    }

    return {
        group,
        setPalette(palette: CloudPalette) {
            shared.uLit.value.set(palette.lit)
            shared.uShade.value.set(palette.shade)
            shared.uHaze.value.set(palette.haze)
        },
        dispose() {
            geometry.dispose()
            materials.forEach(m => m.dispose())
        }
    }
}

export type CloudCards = ReturnType<typeof createCloudCards>
