/**
 * Paper lantern practical (kit PaperLantern ornament in 3D). Emitter owner = this group: the ribbed
 * paper shell carries the visible emissive, a PointLight (decay 2) inside carries receiver light.
 * Hangs from a cord whose top is the group origin (attach the origin to a branch point).
 */
import * as THREE from 'three'
import { createPaintedMaterial } from './painted-material'

const LIGHT_INTENSITY = 3.5

function shellGeometry(): THREE.BufferGeometry {
    // Lathe profile: a squat paper drum with eight soft ribs (radius modulated along height).
    const pts: THREE.Vector2[] = []
    for (let i = 0; i <= 24; i++) {
        const t = i / 24
        const bulge = Math.sin(t * Math.PI)
        const rib = 1 - 0.05 * Math.pow(Math.abs(Math.sin(t * Math.PI * 4)), 0.5)
        pts.push(new THREE.Vector2(0.06 + 0.17 * bulge * rib, -0.2 + t * 0.4))
    }
    return new THREE.LatheGeometry(pts, 20)
}

export function createPaperLantern({ cordLength = 0.6 } = {}) {
    const group = new THREE.Group()
    const cordMat = createPaintedMaterial({ color: '#5a421d' })
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, cordLength, 5), cordMat)
    cord.position.y = -cordLength / 2
    const capMat = createPaintedMaterial({ color: '#433e35' })
    const capGeo = new THREE.CylinderGeometry(0.07, 0.08, 0.04, 12)
    const top = new THREE.Mesh(capGeo, capMat)
    top.position.y = -cordLength - 0.02
    const bottom = new THREE.Mesh(capGeo, capMat)
    bottom.position.y = -cordLength - 0.44
    const paperMat = createPaintedMaterial({ color: '#f5e2b8', emissive: '#f0b85a', emissiveIntensity: 0 })
    const shell = new THREE.Mesh(shellGeometry(), paperMat)
    shell.position.y = -cordLength - 0.23
    const light = new THREE.PointLight('#ffcf85', 0, 9, 2)
    light.position.y = -cordLength - 0.23
    group.add(cord, top, bottom, shell, light)
    for (const m of [cord, top, bottom, shell]) m.castShadow = true

    let glow = 0
    let lightEnabled = true
    const apply = () => {
        paperMat.emissiveIntensity = glow * 1.6
        light.intensity = lightEnabled ? LIGHT_INTENSITY * glow : 0
    }

    return {
        group,
        light,
        setGlow(amount: number) {
            glow = THREE.MathUtils.clamp(amount, 0, 1)
            apply()
        },
        setLightEnabled(enabled: boolean) {
            lightEnabled = enabled
            apply()
        },
        dispose() {
            for (const d of [cord.geometry, capGeo, shell.geometry, cordMat, capMat, paperMat, light]) d.dispose()
        }
    }
}

export type PaperLantern = ReturnType<typeof createPaperLantern>
