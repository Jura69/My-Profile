/**
 * Scroll-zone color data for the ambient scene, ported from the legacy
 * scroll-ambient-scene component. Pure data + math — no React, no GSAP.
 * Progress 0→1 maps to the day→night narrative down the page.
 */

export interface ZoneStyle {
    skyTop: string
    skyBottom: string
    particleColor: string
    particleOpacity: number
    starOpacity: number
}

interface ZoneStop {
    at: number
    style: ZoneStyle
}

const DARK_ZONES: ZoneStop[] = [
    {
        at: 0.0,
        style: {
            skyTop: '#1b2a55',
            skyBottom: '#2a3d68',
            particleColor: '#4fd1c5',
            particleOpacity: 0.4,
            starOpacity: 0.15
        }
    },
    {
        at: 0.15,
        style: {
            skyTop: '#1f3160',
            skyBottom: '#2b3f6a',
            particleColor: '#f6e05e',
            particleOpacity: 0.35,
            starOpacity: 0.05
        }
    },
    {
        at: 0.3,
        style: {
            skyTop: '#22355f',
            skyBottom: '#2a4068',
            particleColor: '#63b3ed',
            particleOpacity: 0.3,
            starOpacity: 0.0
        }
    },
    {
        at: 0.5,
        style: {
            skyTop: '#2a2f5c',
            skyBottom: '#3a3466',
            particleColor: '#ed8936',
            particleOpacity: 0.3,
            starOpacity: 0.0
        }
    },
    {
        at: 0.7,
        style: {
            skyTop: '#1d2552',
            skyBottom: '#302f60',
            particleColor: '#b794f4',
            particleOpacity: 0.4,
            starOpacity: 0.3
        }
    },
    {
        at: 0.9,
        style: {
            skyTop: '#121c3e',
            skyBottom: '#273c6c',
            particleColor: '#d6bcfa',
            particleOpacity: 0.5,
            starOpacity: 0.9
        }
    }
]

const LIGHT_ZONES: ZoneStop[] = [
    {
        at: 0.0,
        style: {
            skyTop: '#c4dceb',
            skyBottom: '#f3e9dc',
            particleColor: '#319795',
            particleOpacity: 0.12,
            starOpacity: 0.0
        }
    },
    {
        at: 0.15,
        style: {
            skyTop: '#b8d6ea',
            skyBottom: '#e6f0ea',
            particleColor: '#d69e2e',
            particleOpacity: 0.1,
            starOpacity: 0.0
        }
    },
    {
        at: 0.3,
        style: {
            skyTop: '#b0d2ea',
            skyBottom: '#dcebf0',
            particleColor: '#3182ce',
            particleOpacity: 0.12,
            starOpacity: 0.0
        }
    },
    {
        at: 0.5,
        style: {
            skyTop: '#bcd3e4',
            skyBottom: '#f2e6c8',
            particleColor: '#c05621',
            particleOpacity: 0.1,
            starOpacity: 0.0
        }
    },
    {
        at: 0.7,
        style: {
            skyTop: '#d6cce6',
            skyBottom: '#f0d3dc',
            particleColor: '#805ad5',
            particleOpacity: 0.12,
            starOpacity: 0.0
        }
    },
    {
        at: 0.9,
        style: {
            skyTop: '#c6cfe6',
            skyBottom: '#dcd3e6',
            particleColor: '#718096',
            particleOpacity: 0.08,
            starOpacity: 0.0
        }
    }
]

function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace('#', '')
    return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
    return '#' + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('')
}

export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

export function lerpColor(c1: string, c2: string, t: number): string {
    const [r1, g1, b1] = hexToRgb(c1)
    const [r2, g2, b2] = hexToRgb(c2)
    return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t))
}

export function clamp01(v: number): number {
    return Math.max(0, Math.min(1, v))
}

/** Interpolated zone style at a given scroll progress, smoothstep-eased between stops. */
export function getInterpolatedZone(progress: number, isDark: boolean): ZoneStyle {
    const zones = isDark ? DARK_ZONES : LIGHT_ZONES

    let lowerIdx = 0
    for (let i = 0; i < zones.length - 1; i++) {
        if (progress >= zones[i].at) lowerIdx = i
    }
    const upperIdx = Math.min(lowerIdx + 1, zones.length - 1)
    if (lowerIdx === upperIdx) return zones[lowerIdx].style

    const lower = zones[lowerIdx]
    const upper = zones[upperIdx]
    const range = upper.at - lower.at
    const rawT = range > 0 ? clamp01((progress - lower.at) / range) : 0
    const t = rawT * rawT * (3 - 2 * rawT)

    return {
        skyTop: lerpColor(lower.style.skyTop, upper.style.skyTop, t),
        skyBottom: lerpColor(lower.style.skyBottom, upper.style.skyBottom, t),
        particleColor: lerpColor(lower.style.particleColor, upper.style.particleColor, t),
        particleOpacity: lerp(lower.style.particleOpacity, upper.style.particleOpacity, t),
        starOpacity: lerp(lower.style.starOpacity, upper.style.starOpacity, t)
    }
}

/** Pollen visibility — strongest at the dawn zone (top of page), gone by ~25%. */
export function dawnAlpha(progress: number): number {
    return clamp01(1 - progress / 0.25)
}

/** Firefly visibility — only meaningful in dark mode, rises through the night zone. */
export function nightAlpha(progress: number, isDark: boolean): number {
    if (!isDark) return 0
    return clamp01((progress - 0.6) / 0.15)
}
