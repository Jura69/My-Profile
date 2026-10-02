/**
 * Procedural cumulus sprites for the ambient sky, painted once on a canvas and
 * returned as two alpha masks (object URLs):
 *  - body: where the cloud is (soft, slightly frayed gouache edge)
 *  - lit:  how much sunlight reaches each pixel (from the upper left), in soft painted bands
 * The DOM paints them with mask-image over flat color fills (--cloud-shade under
 * --cloud-lit), so the sky can recolor clouds on scroll without re-running any of this.
 * Pure canvas math — no React, no GSAP.
 */

export type CloudKind = 'cumulus' | 'tower' | 'stratus'

export interface CloudMasks {
    body: string
    lit: string
    /** width / height of the sprite, for layout */
    aspect: number
}

interface KindSpec {
    w: number
    h: number
    /** Puffs scattered inside the dome. */
    puffs: number
    /** Dome half-width and height as fractions of the sprite. */
    halfWidth: number
    dome: number
    /** Puff radius range as fractions of the sprite height (edge → core). */
    rMin: number
    rMax: number
    /** Base line as a fraction of height — the cloud dissolves below it. */
    base: number
}

const KINDS: Record<CloudKind, KindSpec> = {
    cumulus: { w: 520, h: 240, puffs: 72, halfWidth: 0.42, dome: 0.58, rMin: 0.04, rMax: 0.17, base: 0.84 },
    tower: { w: 420, h: 300, puffs: 70, halfWidth: 0.38, dome: 0.72, rMin: 0.035, rMax: 0.15, base: 0.86 },
    stratus: { w: 560, h: 140, puffs: 60, halfWidth: 0.46, dome: 0.42, rMin: 0.07, rMax: 0.2, base: 0.8 }
}

/** Deterministic PRNG so every visit paints the same sky. */
function mulberry32(seed: number) {
    let a = seed >>> 0
    return () => {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

const smoothstep = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)
}

interface Puff {
    x: number
    y: number
    r: number
}

/**
 * Puffs scattered inside a half-ellipse dome standing on the base line. Puffs
 * deep in the dome are large (the cloud's mass), puffs near its rim are small,
 * so the outline breaks into the cauliflower bumps of a cumulus top.
 */
function layoutPuffs(spec: KindSpec, rand: () => number): Puff[] {
    const { w, h } = spec
    const cx = w * 0.5
    const baseY = h * spec.base
    const a = w * spec.halfWidth
    const b = h * spec.dome
    const puffs: Puff[] = []
    let guard = 0
    while (puffs.length < spec.puffs && guard++ < spec.puffs * 40) {
        const px = (rand() * 2 - 1) * a
        const py = -rand() * b
        // Normalised distance from the dome centre: 0 at the core, 1 on the rim
        const rim = Math.hypot(px / a, py / b)
        if (rim > 1) continue
        // Lean the dome a little so it is not perfectly symmetric
        const lean = (py / b) * a * 0.08
        const depth = 1 - rim
        const r = h * (spec.rMin + (spec.rMax - spec.rMin) * Math.sqrt(depth) * (0.75 + rand() * 0.5))
        puffs.push({ x: cx + px + lean, y: baseY + py - r * 0.2, r })
    }
    // Drop stray puffs that touch nothing — they read as floating bubbles, not cloud
    return puffs.filter(p => puffs.some(q => q !== p && Math.hypot(q.x - p.x, q.y - p.y) < (q.r + p.r) * 0.6))
}

/** Smooth value noise for edge fraying and band jitter (cheap, grid-hash based). */
function makeNoise(rand: () => number) {
    const size = 64
    const grid = Float32Array.from({ length: size * size }, () => rand())
    const at = (ix: number, iy: number) => grid[(iy & (size - 1)) * size + (ix & (size - 1))]
    return (x: number, y: number) => {
        const ix = Math.floor(x),
            iy = Math.floor(y)
        const fx = x - ix,
            fy = y - iy
        const sx = fx * fx * (3 - 2 * fx),
            sy = fy * fy * (3 - 2 * fy)
        const top = at(ix, iy) + (at(ix + 1, iy) - at(ix, iy)) * sx
        const bottom = at(ix, iy + 1) + (at(ix + 1, iy + 1) - at(ix, iy + 1)) * sx
        return top + (bottom - top) * sy
    }
}

function toUrl(canvas: HTMLCanvasElement): Promise<string> {
    return new Promise((resolve, reject) =>
        canvas.toBlob(b => (b ? resolve(URL.createObjectURL(b)) : reject(new Error('cloud mask encode failed'))))
    )
}

export async function paintCloud(kind: CloudKind, seed: number): Promise<CloudMasks> {
    const spec = KINDS[kind]
    const { w, h } = spec
    const rand = mulberry32(seed)
    const noise = makeNoise(rand)
    const puffs = layoutPuffs(spec, rand)
    const baseY = h * spec.base

    // Metaball density: neighbouring puffs merge into one soft body
    const density = new Float32Array(w * h)
    for (const p of puffs) {
        const reach = p.r * 2
        const x0 = Math.max(0, Math.floor(p.x - reach)),
            x1 = Math.min(w - 1, Math.ceil(p.x + reach))
        const y0 = Math.max(0, Math.floor(p.y - reach)),
            y1 = Math.min(h - 1, Math.ceil(p.y + reach))
        const inv = 1.5 / (p.r * p.r)
        for (let y = y0; y <= y1; y++) {
            for (let x = x0; x <= x1; x++) {
                const dx = x - p.x,
                    dy = y - p.y
                density[y * w + x] += Math.exp(-(dx * dx + dy * dy) * inv)
            }
        }
    }
    // The base dissolves instead of ending on a hard line
    for (let y = 0; y < h; y++) {
        const fade = 1 - smoothstep(baseY - h * 0.08, baseY + h * 0.04, y)
        for (let x = 0; x < w; x++) density[y * w + x] *= fade
    }

    // Self-shadowing: march toward the sun and accumulate how much cloud is in the
    // way. Bump tops facing the light stay bright, bellies and lee sides fall into shade.
    const sunX = -0.6,
        sunY = -0.8
    const unit = h / 240
    const steps = [3, 6, 10, 15, 22, 31, 42, 56].map(s => s * unit)
    const sample = (x: number, y: number) => {
        const ix = Math.round(x),
            iy = Math.round(y)
        return ix < 0 || iy < 0 || ix >= w || iy >= h ? 0 : Math.min(density[iy * w + ix], 1.6)
    }

    const body = new ImageData(w, h)
    const lit = new ImageData(w, h)
    for (let y = 0; y < h; y++) {
        const height = 1 - y / baseY
        for (let x = 0; x < w; x++) {
            const i = y * w + x
            const coarse = noise(x / 18, y / 18)
            const fine = noise(x / 5 + 40, y / 5 + 40)
            // Gouache edge: defined but soft, frayed slightly by noise
            const a = smoothstep(0.42, 0.66, density[i] + (coarse - 0.5) * 0.18 + (fine - 0.5) * 0.08)
            if (a <= 0) continue
            let depth = 0
            for (let k = 0; k < steps.length; k++) {
                depth += sample(x + sunX * steps[k], y + sunY * steps[k]) * (k < 3 ? 0.55 : 0.32)
            }
            const value = Math.exp(-depth * 0.17) + height * 0.5 - 0.14 + (coarse - 0.5) * 0.1
            // Two soft painted steps: shade → half-lit → lit
            const band = smoothstep(0.24, 0.34, value) * 0.45 + smoothstep(0.5, 0.6, value) * 0.55
            const o = i * 4
            body.data[o + 3] = Math.round(a * 255)
            lit.data[o + 3] = Math.round(a * band * 255)
        }
    }

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('2d canvas unavailable')
    ctx.putImageData(body, 0, 0)
    const bodyUrl = await toUrl(canvas)
    ctx.clearRect(0, 0, w, h)
    ctx.putImageData(lit, 0, 0)
    const litUrl = await toUrl(canvas)
    return { body: bodyUrl, lit: litUrl, aspect: w / h }
}
