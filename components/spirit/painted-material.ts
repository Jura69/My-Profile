/**
 * Shared "painted, not rendered" surface for every mesh of the hero spirit stage.
 *
 * MeshToonMaterial + onBeforeCompile:
 * - Own `vPaintWorldPos` varying (model × instance × transformed). three's `worldPosition` only exists
 *   when shadow/env maps are on, so relying on it would break the shader the moment shadows toggle.
 * - Light bands: dotNL is split into shade / mid / lit with thresholds jittered by world-space value
 *   noise, so band edges wobble like brush strokes instead of the even CG toon line. Bands are computed
 *   procedurally with fwidth AA (a 3-texel NearestFilter gradientMap aliases into stair-steps).
 * - Coloured shadow floor: shade never drops below `albedo × shadeTint × floor` (gouache shadows are
 *   lavender/sky, never black). Rim: a thin crisp band in `uRimColor`, scaled per material.
 * - Albedo mottling: ±6% world-noise variation breaks flat CG fills.
 * All painted materials share `paintUniforms`, so the lighting rig retints the whole world with one write.
 */
import * as THREE from 'three'

export const paintUniforms = {
    uTime: { value: 0 },
    /** 0 = still (reduced motion / paused); scales every wind hook. */
    uWind: { value: 1 },
    uShadeTint: { value: new THREE.Color('#9d9ccf') },
    uShadeFloor: { value: 0.28 },
    uRimColor: { value: new THREE.Color('#e7c46d') },
    uRimStrength: { value: 0.1 },
    uBandLow: { value: 0.4 },
    uBandHigh: { value: 0.66 },
    uMidLevel: { value: 0.62 },
    uEdgeJitter: { value: 0.07 },
    uAlbedoJitter: { value: 0.12 }
}

/**
 * Optional shader extension; `key` must be unique per distinct code (it is the program cache key).
 * - vertexBody runs after begin_vertex and may edit `transformed` (wind, sway);
 * - vertexProject replaces project_vertex (must declare `mvPosition` and write gl_Position — billboards);
 * - fragmentBegin runs after clipping and may `discard` or set `diffuseColor.a` (SDF cut-outs);
 * - fragmentNormal runs after normal_fragment_begin and may override the view-space `normal`.
 */
export interface PaintHook {
    key: string
    uniforms?: Record<string, THREE.IUniform>
    vertexPars?: string
    vertexBody?: string
    vertexProject?: string
    fragmentPars?: string
    fragmentBegin?: string
    fragmentNormal?: string
}

export interface PaintedOptions {
    color?: THREE.ColorRepresentation
    vertexColors?: boolean
    side?: THREE.Side
    emissive?: THREE.ColorRepresentation
    emissiveIntensity?: number
    hook?: PaintHook
    /** Per-material rim multiplier (0 for ground: grazing angles would gild whole hillsides). */
    rim?: number
    /** Soft SDF edges via MSAA coverage instead of blending (no sorting); needs an antialiased context. */
    alphaToCoverage?: boolean
}

/** Shade as if facing straight up on both sides — grass blades then paint as the meadow's masses. */
export const NORMAL_UP_GLSL = 'normal = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);'

const NOISE_GLSL = /* glsl */ `
varying vec3 vPaintWorldPos;
float paintHash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float paintNoise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    float a = mix(mix(paintHash(i), paintHash(i + vec3(1,0,0)), f.x), mix(paintHash(i + vec3(0,1,0)), paintHash(i + vec3(1,1,0)), f.x), f.y);
    float b = mix(mix(paintHash(i + vec3(0,0,1)), paintHash(i + vec3(1,0,1)), f.x), mix(paintHash(i + vec3(0,1,1)), paintHash(i + vec3(1,1,1)), f.x), f.y);
    return mix(a, b, f.z);
}
`

const FRAGMENT_PARS = /* glsl */ `
${NOISE_GLSL}
uniform vec3 uShadeTint; uniform float uShadeFloor;
uniform vec3 uRimColor; uniform float uRimStrength;
uniform float uBandLow; uniform float uBandHigh; uniform float uMidLevel;
uniform float uEdgeJitter; uniform float uAlbedoJitter; uniform float uRimScale;
float paintBand(float x, float edge) { float w = max(fwidth(x), 1e-4) * 1.2; return smoothstep(edge - w, edge + w, x); }
vec3 getGradientIrradiance(vec3 normal, vec3 lightDirection) {
    float x = dot(normal, lightDirection) * 0.5 + 0.5;
    float n = paintNoise(vPaintWorldPos * 0.7) * 0.5 + paintNoise(vPaintWorldPos * 5.3) * 0.5;
    x += (n - 0.5) * uEdgeJitter * 2.0;
    float mid = paintBand(x, uBandLow);
    float lit = paintBand(x, uBandHigh);
    return vec3(mix(0.0, mix(uMidLevel, 1.0, lit), mid));
}
`

const PAINT_WORLD_POS = /* glsl */ `
vec4 paintWorld = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
    paintWorld = instanceMatrix * paintWorld;
#endif
vPaintWorldPos = (modelMatrix * paintWorld).xyz;
`

const SHADE_FLOOR_AND_RIM = /* glsl */ `
outgoingLight = max(outgoingLight, diffuseColor.rgb * uShadeTint * uShadeFloor);
float paintRim = 1.0 - saturate(dot(normal, normalize(vViewPosition)));
outgoingLight += uRimColor * paintBand(paintRim, 0.8) * uRimStrength * uRimScale;
#include <opaque_fragment>
`

/** Build a painted material; every instance shares one compiled program per hook key. */
export function createPaintedMaterial(options: PaintedOptions = {}): THREE.MeshToonMaterial {
    const material = new THREE.MeshToonMaterial({
        color: options.color ?? '#ffffff',
        vertexColors: options.vertexColors ?? false,
        side: options.side ?? THREE.FrontSide,
        emissive: options.emissive ?? '#000000',
        emissiveIntensity: options.emissiveIntensity ?? 1,
        alphaToCoverage: options.alphaToCoverage ?? false
    })
    const hook = options.hook
    material.onBeforeCompile = shader => {
        Object.assign(shader.uniforms, paintUniforms, hook?.uniforms ?? {}, { uRimScale: { value: options.rim ?? 1 } })
        shader.vertexShader = shader.vertexShader
            .replace(
                '#include <common>',
                `#include <common>\nvarying vec3 vPaintWorldPos;\nuniform float uTime;\nuniform float uWind;\n${hook?.vertexPars ?? ''}`
            )
            .replace('#include <begin_vertex>', `#include <begin_vertex>\n${hook?.vertexBody ?? ''}`)
            .replace(
                '#include <project_vertex>',
                `${hook?.vertexProject ?? '#include <project_vertex>'}\n${PAINT_WORLD_POS}`
            )
        shader.fragmentShader = shader.fragmentShader
            .replace('#include <gradientmap_pars_fragment>', `${FRAGMENT_PARS}\n${hook?.fragmentPars ?? ''}`)
            .replace(
                '#include <clipping_planes_fragment>',
                `#include <clipping_planes_fragment>\n${hook?.fragmentBegin ?? ''}`
            )
            .replace(
                '#include <normal_fragment_begin>',
                `#include <normal_fragment_begin>\n${hook?.fragmentNormal ?? ''}`
            )
            .replace(
                '#include <color_fragment>',
                '#include <color_fragment>\ndiffuseColor.rgb *= 1.0 + (paintNoise(vPaintWorldPos * 1.7) - 0.5) * uAlbedoJitter;'
            )
            .replace('#include <opaque_fragment>', SHADE_FLOOR_AND_RIM)
    }
    material.customProgramCacheKey = () => `painted-v1:${hook?.key ?? 'none'}`
    return material
}

/** GLSL wind helper for hooks: world-x phase so a field ripples as one wave, elapsed-time based. */
export const WIND_GLSL = /* glsl */ `
float paintWind(vec3 worldPos, float period) {
    return sin(uTime * 6.2831853 / period + worldPos.x * 0.35 + worldPos.z * 0.12) * uWind;
}
`
