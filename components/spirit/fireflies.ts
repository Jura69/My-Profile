/**
 * Motes around the island, one draw call: fireflies at night (warm, slow blink, wandering loops)
 * and a few pale pollen specks by day (smaller, fainter, drifting). Motion lives entirely in the
 * vertex shader from `uTime`, so the CPU cost is one uniform write per frame; with time frozen
 * (reduced motion) the motes hold still at their seeded spots.
 */
import * as THREE from 'three'
import { seeded } from './kit-geometry'

const COUNT = 14

export function createFireflies() {
    const rand = seeded(23)
    const base = new Float32Array(COUNT * 3)
    const params = new Float32Array(COUNT * 4) // phase, speed, wander radius, blink rate
    for (let i = 0; i < COUNT; i++) {
        // A loose shell around the spirit; a mote wandering into the body is simply hidden by depth.
        const a = rand() * Math.PI * 2
        const r = 0.55 + rand() * 0.55
        base.set([Math.sin(a) * r, 0.25 + rand() * 1.15, Math.cos(a) * r * 0.8], i * 3)
        params.set([rand() * 6.28, 0.25 + rand() * 0.35, 0.08 + rand() * 0.14, 0.6 + rand() * 0.9], i * 4)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(base, 3))
    geometry.setAttribute('aParams', new THREE.BufferAttribute(params, 4))

    const uniforms = {
        uTime: { value: 0 },
        uNight: { value: 0 },
        uPixelRatio: { value: 1 },
        uDay: { value: new THREE.Color('#fff4d6') },
        uFirefly: { value: new THREE.Color('#ffe27a') }
    }
    const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms,
        vertexShader: /* glsl */ `
            attribute vec4 aParams;
            uniform float uTime; uniform float uNight; uniform float uPixelRatio;
            varying float vAlpha;
            void main() {
                float t = uTime * aParams.y + aParams.x;
                vec3 p = position + vec3(sin(t) * aParams.z, sin(t * 1.7 + 1.0) * aParams.z * 0.6, cos(t * 0.8) * aParams.z);
                p.y += mix(sin(uTime * 0.2 + aParams.x) * 0.05, 0.0, uNight); // pollen drifts on a slow updraft
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                float blink = pow(0.5 + 0.5 * sin(uTime * aParams.w + aParams.x * 3.0), 3.0);
                vAlpha = mix(0.35, 0.25 + 0.75 * blink, uNight);
                gl_PointSize = mix(5.0, 12.0, uNight) * uPixelRatio / -mv.z * 4.0;
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: /* glsl */ `
            uniform float uNight; uniform vec3 uDay; uniform vec3 uFirefly;
            varying float vAlpha;
            void main() {
                float d = length(gl_PointCoord - 0.5) * 2.0;
                float core = 1.0 - smoothstep(0.0, 1.0, d);
                gl_FragColor = vec4(mix(uDay, uFirefly, uNight), vAlpha * core * core);
                #include <colorspace_fragment>
            }`
    })
    const points = new THREE.Points(geometry, material)
    points.renderOrder = 3

    return {
        points,
        /** `night` 0..1 follows the theme mix; `pixelRatio` keeps sprite size steady across DPRs. */
        update(t: number, night: number, pixelRatio: number) {
            uniforms.uTime.value = t
            uniforms.uNight.value = night
            uniforms.uPixelRatio.value = pixelRatio
        },
        dispose() {
            geometry.dispose()
            material.dispose()
        }
    }
}
