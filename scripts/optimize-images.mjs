/**
 * Re-compress oversized content images in place (no path/format change, so no
 * component refs need updating). Targets public/images/{works,audiophile,
 * activities} files over the threshold; webp→webp q80, jpeg→jpeg q80 (mozjpeg).
 * Content thumbnails are already webp; this mainly trims a few heavy originals.
 *
 * Run: node scripts/optimize-images.mjs
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const ROOT = 'public/images'
const DIRS = ['works', 'audiophile', 'activities']
const THRESHOLD = 300 * 1024
const QUALITY = 80

const kb = n => `${(n / 1024).toFixed(0)}KB`

async function processFile(path) {
    const before = (await stat(path)).size
    if (before < THRESHOLD) return null

    const ext = extname(path).toLowerCase()
    const input = await readFile(path)
    let output
    if (ext === '.webp') {
        output = await sharp(input).webp({ quality: QUALITY }).toBuffer()
    } else if (ext === '.jpg' || ext === '.jpeg') {
        output = await sharp(input).jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer()
    } else {
        return null // leave png/others (would need a ref change to convert)
    }

    // Only rewrite if we actually saved bytes.
    if (output.length < before) {
        await writeFile(path, output)
        return { path, before, after: output.length }
    }
    return { path, before, after: before, skipped: true }
}

async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    const results = []
    for (const e of entries) {
        const full = join(dir, e.name)
        if (e.isDirectory()) results.push(...(await walk(full)))
        else results.push(await processFile(full))
    }
    return results.filter(Boolean)
}

let totalBefore = 0
let totalAfter = 0
for (const d of DIRS) {
    const results = await walk(join(ROOT, d))
    for (const r of results) {
        totalBefore += r.before
        totalAfter += r.after
        const tag = r.skipped ? '(kept — no gain)' : `→ ${kb(r.after)} (saved ${kb(r.before - r.after)})`
        console.log(`${r.path}: ${kb(r.before)} ${tag}`)
    }
}
console.log(`\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)} (saved ${kb(totalBefore - totalAfter)})`)
