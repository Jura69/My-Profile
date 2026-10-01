/**
 * Sky dome: the designed subject of a painted pastoral frame (brightest value, ≥ 45% of the frame).
 * Three-stop vertical gradient (horizon → upper sky → zenith) plus one soft glow for the sun/moon.
 * Colours arrive from the caller (zone-data via the lighting owner) — the dome never picks its own.
 * Unlit, untoned, unfogged; follows the camera so it can never be clipped or parallax.
 */
import * as THREE from 'three'

const VERTEX = /* glsl */ `
varying vec3 vDir;
void main() {
    vDir = normalize(position);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_Position.z = gl_Position.w * 0.99999; // pin just inside the far plane: never clipped, behind all
}
`

const FRAGMENT = /* glsl */ `
uniform vec3 uHorizon; uniform vec3 uUpper; uniform vec3 uZenith;
uniform vec3 uGlowDir; uniform vec3 uGlowColor; uniform float uGlowStrength;
varying vec3 vDir;
void main() {
    vec3 dir = normalize(vDir);
    float h = dir.y;
    vec3 col = mix(uHorizon, uUpper, smoothstep(-0.02, 0.28, h));
    col = mix(col, uZenith, smoothstep(0.25, 0.95, h));
    float g = max(dot(dir, normalize(uGlowDir)), 0.0);
    col += uGlowColor * (pow(g, 18.0) * 0.6 + pow(g, 220.0) * 0.8) * uGlowStrength;
    // Tiny dither: an 8-bit sky gradient bands visibly on wide monitors.
    col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
}
`

export interface SkyColors {
    horizon: THREE.ColorRepresentation
    upper: THREE.ColorRepresentation
    zenith: THREE.ColorRepresentation
}

export function createSkyDome() {
    const uniforms = {
        uHorizon: { value: new THREE.Color() },
        uUpper: { value: new THREE.Color() },
        uZenith: { value: new THREE.Color() },
        uGlowDir: { value: new THREE.Vector3(-0.5, 0.4, -1) },
        uGlowColor: { value: new THREE.Color('#fff2d8') },
        uGlowStrength: { value: 0.5 }
    }
    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        toneMapped: false
    })
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 48, 24), material)
    mesh.renderOrder = -10
    mesh.frustumCulled = false
    mesh.onBeforeRender = (_r, _s, camera) => mesh.position.copy(camera.position)

    return {
        mesh,
        setColors(colors: SkyColors) {
            uniforms.uHorizon.value.set(colors.horizon)
            uniforms.uUpper.value.set(colors.upper)
            uniforms.uZenith.value.set(colors.zenith)
        },
        setGlow(direction: THREE.Vector3, color: THREE.ColorRepresentation, strength: number) {
            uniforms.uGlowDir.value.copy(direction)
            uniforms.uGlowColor.value.set(color)
            uniforms.uGlowStrength.value = strength
        },
        dispose() {
            mesh.geometry.dispose()
            material.dispose()
        }
    }
}

export type SkyDome = ReturnType<typeof createSkyDome>
