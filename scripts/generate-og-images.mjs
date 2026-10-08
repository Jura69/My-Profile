/**
 * Per-project social cards: every works cover (public/images/works/<id>-cover-1280.webp)
 * becomes public/images/og/<id>.jpg at 1200×630, the size and format every unfurler
 * (Facebook, LinkedIn, Zalo, X, Slack) renders reliably — WebP is not universally accepted.
 * Detail pages reference them through the SEO `image` prop. Re-run after changing a cover.
 *
 * Run: node scripts/generate-og-images.mjs
 */
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const COVERS = 'public/images/works'
const OUT = 'public/images/og'
const SUFFIX = '-cover-1280.webp'

await mkdir(OUT, { recursive: true })
const covers = (await readdir(COVERS)).filter(f => f.endsWith(SUFFIX))
for (const file of covers) {
    const id = file.slice(0, -SUFFIX.length)
    const out = join(OUT, `${id}.jpg`)
    // 16:9 cover → 1.91:1 card: centre crop loses ~7% top and bottom, inside the art safe zone
    await sharp(join(COVERS, file)).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out)
    console.log(out)
}
console.log(`${covers.length} social cards written`)
