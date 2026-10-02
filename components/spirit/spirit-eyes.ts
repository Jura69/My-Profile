/**
 * Mầm Đèn's two dot eyes, low on the front of the pebble. Open: an ink pupil with a white glint that
 * squashes vertically for blinks and widens past 1. Shut (openness < 0.3): a drooping ink lid arc,
 * which still reads at thumbnail size where a squashed dot vanishes (blinks, sleepy stills).
 */
import * as THREE from 'three'

const EYE_X = 0.12,
    EYE_Y = 0.2,
    EYE_Z = 0.405
const SHUT_BELOW = 0.3

export function createSpiritEyes(parent: THREE.Object3D) {
    const ink = new THREE.MeshBasicMaterial({ color: '#2d2a24' })
    const shine = new THREE.MeshBasicMaterial({ color: '#ffffff' })
    const pupilGeo = new THREE.SphereGeometry(0.045, 16, 12)
    const glintGeo = new THREE.SphereGeometry(0.014, 8, 6)
    // Half torus rotated to a ∪: the closed lid of a relaxed, sleeping eye.
    const lidGeo = new THREE.TorusGeometry(0.038, 0.012, 6, 16, Math.PI)
    lidGeo.rotateZ(Math.PI)

    const eyes = [-1, 1].map(side => {
        const group = new THREE.Group()
        group.position.set(side * EYE_X, EYE_Y, EYE_Z)
        const open = new THREE.Group()
        const pupil = new THREE.Mesh(pupilGeo, ink)
        pupil.scale.set(1, 1.15, 0.5)
        const glint = new THREE.Mesh(glintGeo, shine)
        glint.position.set(0.014, 0.02, 0.02)
        open.add(pupil, glint)
        const lid = new THREE.Mesh(lidGeo, ink)
        lid.position.set(0, 0.012, 0.012)
        lid.visible = false
        group.add(open, lid)
        parent.add(group)
        return { group, open, lid, side }
    })

    return {
        /** Gaze offset (−1..1 per axis) shifts the eyes across the face; `openness` 1 = open, < 0.3 = shut. */
        update(gazeX: number, gazeY: number, openness: number) {
            const shut = openness < SHUT_BELOW
            for (const eye of eyes) {
                eye.group.position.set(eye.side * EYE_X + gazeX * 0.025, EYE_Y + gazeY * 0.02, EYE_Z)
                eye.open.visible = !shut
                eye.lid.visible = shut
                eye.open.scale.y = shut ? 1 : openness
            }
        },
        dispose() {
            for (const d of [ink, shine, pupilGeo, glintGeo, lidGeo]) d.dispose()
        }
    }
}
