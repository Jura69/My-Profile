/**
 * The seed lantern hanging from Mầm Đèn's sprout. Reads as a glowing translucent pod, not a sticker:
 * - emissive is a view-facing gradient (warm cream core → amber rim) instead of one flat colour;
 * - a soft camera-facing halo, a warm light pool on the moss that follows the swinging seed, and a
 *   warm PointLight (decay 2) for the body/moss — all scaled by `glow` (0 day fruit → 1 night lantern);
 * - a gentle multi-sine flicker so the light breathes like a flame, never strobes;
 * - a damped spring pendulum: the seed lags the stalk, settles, and swings hard on `kick()`.
 * Everything is elapsed-time driven; `motion` 0 holds the rest pose (reduced motion).
 */
import * as THREE from 'three'
import { createPaintedMaterial, type PaintHook } from './painted-material'

const LIGHT_COLOR = '#ffb45e'
/** Candela at full night; warm amber, inverse-square over the island. */
const LIGHT_INTENSITY = 3
const HALO_SIZE = 0.62
const POOL_SIZE = 1.25
/** Swing limits (rad): repeated taps must never loop the seed over the stalk tip. */
const MAX_SWING_Z = 0.9,
    MAX_SWING_X = 0.6
/** Pool fades out before the island lip so no warm haze spills onto the sky. */
const ISLAND_RADIUS = 0.82

/** Shared with the hook so the per-frame write needs no lookup. */
const lanternGlow = { value: 0 } // module-level: one lantern per page (the hero)

const LANTERN_HOOK: PaintHook = {
    key: 'seed-lantern',
    uniforms: {
        uLanternCore: { value: new THREE.Color('#fff0c4') },
        uLanternRim: { value: new THREE.Color('#e88f34') },
        uLanternGlow: lanternGlow
    },
    fragmentPars: 'uniform vec3 uLanternCore; uniform vec3 uLanternRim; uniform float uLanternGlow;',
    // Runs after normal_fragment_begin, where totalEmissiveRadiance is already declared.
    fragmentNormal: /* glsl */ `
        float lanternFacing = saturate(dot(normal, normalize(vViewPosition)));
        totalEmissiveRadiance = mix(uLanternRim, uLanternCore, pow(lanternFacing, 1.6)) * uLanternGlow;`
}

function haloTexture(): THREE.CanvasTexture {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    if (ctx) {
        const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
        g.addColorStop(0, 'rgba(255,226,160,0.85)')
        g.addColorStop(0.25, 'rgba(255,196,110,0.4)')
        g.addColorStop(0.6, 'rgba(255,170,80,0.1)')
        g.addColorStop(1, 'rgba(255,160,70,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, size, size)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
}

/** Warm radial decal on the island top; world-space clip keeps it on the moss. */
function lightPool(): THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> {
    const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
            uColor: { value: new THREE.Color('#ffbe6a') },
            uOpacity: { value: 0 },
            uIslandRadius: { value: ISLAND_RADIUS }
        },
        vertexShader: /* glsl */ `
            varying vec2 vUv; varying vec3 vWorld;
            void main() {
                vUv = uv;
                vec4 world = modelMatrix * vec4(position, 1.0);
                vWorld = world.xyz;
                gl_Position = projectionMatrix * viewMatrix * world;
            }`,
        fragmentShader: /* glsl */ `
            uniform vec3 uColor; uniform float uOpacity; uniform float uIslandRadius;
            varying vec2 vUv; varying vec3 vWorld;
            void main() {
                float d = length(vUv - 0.5) * 2.0;
                float edge = 1.0 - smoothstep(uIslandRadius - 0.1, uIslandRadius, length(vWorld.xz));
                gl_FragColor = vec4(uColor, uOpacity * pow(1.0 - smoothstep(0.0, 1.0, d), 1.6) * edge);
                #include <colorspace_fragment>
            }`
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(POOL_SIZE, POOL_SIZE), material)
    mesh.rotation.x = -Math.PI / 2
    mesh.renderOrder = 2 // over the blob shadow
    return mesh
}

export function createSeedLantern(rim: number) {
    const group = new THREE.Group()
    const capMat = createPaintedMaterial({ color: '#6d5640', rim })
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.035, 12), capMat)
    cap.position.y = -0.02
    const seedMat = createPaintedMaterial({ color: '#f1d999', rim, emissive: '#ffffff', hook: LANTERN_HOOK })
    const seed = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 16), seedMat)
    seed.position.y = -0.11
    seed.scale.set(1, 1.2, 1)
    const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: haloTexture(), transparent: true, depthWrite: false, opacity: 0 })
    )
    halo.position.y = -0.11
    halo.scale.setScalar(HALO_SIZE)
    halo.renderOrder = 3 // same bucket as the fireflies, so depth decides which is in front
    const light = new THREE.PointLight(LIGHT_COLOR, 0, 3.2, 2)
    light.position.y = -0.11
    group.add(cap, seed, halo, light)
    const pool = lightPool()

    let glow = 0
    let swingZ = 0,
        swingX = 0,
        velZ = 0,
        velX = 0
    const seedWorld = new THREE.Vector3()

    return {
        /** Attach at the stalk tip; the pendulum swings this group. */
        group,
        /** Add to the spirit's ground-level group (not the squashing body). */
        pool,
        setGlow(amount: number) {
            glow = THREE.MathUtils.clamp(amount, 0, 1)
        },
        /** Impulse for the pointer reaction. */
        kick() {
            velZ = Math.min(velZ + 4.5, 5)
            velX = Math.max(velX - 2, -2.5)
        },
        /**
         * @param stalkSpeed angular speed of the stalk (rad/s) — drives the pendulum lag.
         */
        update(t: number, dt: number, motion: number, stalkSpeed: number) {
            if (motion > 0 && dt > 0) {
                // Damped spring toward hanging straight down + the stalk's motion + a faint breeze.
                const breeze = Math.sin(t * 1.3) * 0.6 + Math.sin(t * 2.9 + 1.7) * 0.3
                velZ += (-38 * swingZ - 3.2 * velZ - stalkSpeed * 9 + breeze) * dt
                velX += (-38 * swingX - 3.2 * velX + Math.sin(t * 0.9 + 0.4) * 0.4) * dt
                swingZ += velZ * dt
                swingX += velX * dt
                // Hard stop at the limits, killing the velocity so it does not stick there.
                if (Math.abs(swingZ) > MAX_SWING_Z) [swingZ, velZ] = [Math.sign(swingZ) * MAX_SWING_Z, 0]
                if (Math.abs(swingX) > MAX_SWING_X) [swingX, velX] = [Math.sign(swingX) * MAX_SWING_X, 0]
            } else if (motion === 0) {
                swingZ = swingX = velZ = velX = 0
            }
            group.rotation.set(swingX, 0, swingZ)

            // Flicker: incommensurate sines, ±~9 %, frozen to 1 when still.
            const flicker =
                motion > 0
                    ? 1 + Math.sin(t * 4.4) * 0.04 + Math.sin(t * 14.5 + 1.3) * 0.02 + Math.sin(t * 1.7) * 0.03
                    : 1
            const lit = glow * flicker
            lanternGlow.value = THREE.MathUtils.lerp(0.14, 1.05, glow) * flicker
            halo.material.opacity = lit * 0.9
            halo.visible = lit > 0.01
            light.intensity = LIGHT_INTENSITY * lit
            pool.material.uniforms.uOpacity.value = lit * 0.42
            pool.visible = lit > 0.01

            // Pool sits on the moss straight under the seed, wherever the swing and body put it.
            if (pool.parent) {
                seed.updateWorldMatrix(true, false)
                pool.parent.worldToLocal(seed.getWorldPosition(seedWorld))
                pool.position.set(seedWorld.x, 0.02, seedWorld.z)
            }
        },
        dispose() {
            cap.geometry.dispose()
            capMat.dispose()
            seed.geometry.dispose()
            seedMat.dispose()
            halo.material.map?.dispose()
            halo.material.dispose()
            pool.geometry.dispose()
            pool.material.dispose()
            light.dispose()
        }
    }
}

export type SeedLantern = ReturnType<typeof createSeedLantern>
