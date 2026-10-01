/**
 * Look-dev light/colour presets. Two sky sources are kept side by side on purpose:
 * - `banner`: colours sampled from the gouache banners (works-day/night) — the target look;
 * - `zone`: the current zone-data stops (p=0 light, p=0.9 dark) — what the SVG scene paints today.
 * The spike compares them; phase 2 moves the accepted values into zone-data as the single source.
 */
import { getInterpolatedZone } from '../../zone-data'

export type PresetName = 'dawn' | 'night'
export type SkySource = 'banner' | 'zone'

export interface LookPreset {
    sky: { horizon: string; upper: string; zenith: string }
    /** Sun/moon glow in the sky; its direction is the key light direction (one source of truth). */
    glow: { color: string; strength: number }
    /** Key light direction: azimuth deg (0 = from −Z behind the scene, 90 = from +X right, 180 = from the camera side) + elevation deg. */
    key: { color: string; intensity: number; azimuth: number; elevation: number }
    hemi: { sky: string; ground: string; intensity: number }
    fog: { color: string; density: number }
    clouds: { lit: string; shade: string; haze: string }
    paint: { shadeTint: string; shadeFloor: number; rim: string; rimStrength: number }
    practicals: number
}

const BANNER: Record<PresetName, LookPreset> = {
    dawn: {
        sky: { horizon: '#dcebf0', upper: '#a9cde3', zenith: '#6fa3cf' },
        glow: { color: '#fff2d8', strength: 0.35 },
        key: { color: '#fff2d8', intensity: 2.5, azimuth: 252, elevation: 50 },
        hemi: { sky: '#b3e2f5', ground: '#5d7f62', intensity: 1.3 },
        fog: { color: '#d4e6ec', density: 0.0042 },
        clouds: { lit: '#fdfbf4', shade: '#c9c6df', haze: '#dcebf0' },
        paint: { shadeTint: '#9d9ccf', shadeFloor: 0.28, rim: '#e7c46d', rimStrength: 0.22 },
        practicals: 0
    },
    night: {
        sky: { horizon: '#3b5486', upper: '#273c6c', zenith: '#121c3e' },
        glow: { color: '#cfe0ff', strength: 0.5 },
        key: { color: '#9fb4e0', intensity: 0.5, azimuth: 40, elevation: 48 },
        hemi: { sky: '#4a6aa8', ground: '#1c2e2a', intensity: 0.9 },
        fog: { color: '#2d4170', density: 0.005 },
        clouds: { lit: '#8ea6cf', shade: '#3d4f80', haze: '#3b5486' },
        paint: { shadeTint: '#5a6aa0', shadeFloor: 0.25, rim: '#98d8c8', rimStrength: 0.18 },
        practicals: 1
    }
}

/** Same rig, sky/fog/cloud haze recoloured from zone-data so the two sources can be compared. */
function fromZone(name: PresetName): LookPreset {
    const base = BANNER[name]
    const zone = getInterpolatedZone(name === 'dawn' ? 0 : 0.9, name === 'night')
    return {
        ...base,
        sky: { horizon: zone.skyBottom, upper: zone.skyTop, zenith: zone.skyTop },
        fog: { ...base.fog, color: zone.skyBottom },
        clouds: { ...base.clouds, haze: zone.skyBottom }
    }
}

export function resolvePreset(name: PresetName, source: SkySource): LookPreset {
    return source === 'zone' ? fromZone(name) : BANNER[name]
}
