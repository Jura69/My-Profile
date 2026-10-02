/**
 * Render the Mầm Đèn stills (404, night contact, OG card) from the hero's own three.js scene, so
 * the images stay in step with the live spirit. Starts a Vite dev server for
 * `scripts/spirit-stills/index.html`, drives headless Chrome over raw CDP (no puppeteer), then
 * encodes with sharp into public/images/.
 *
 * Run: node scripts/render-spirit-stills.mjs [--only=<name,...>]
 * Chrome: CHROME_PATH, else the default Windows install path.
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { createServer } from 'vite'

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9341
const PAGE = '/scripts/spirit-stills/index.html'

/** night = light-rig mix (0 day … 1 night). Stills render at 2× their largest CSS size. */
const SHOTS = [
    {
        name: 'puzzled-day',
        query: 'pose=puzzled&night=0',
        size: 480,
        out: 'public/images/spirit/spirit-puzzled-day.webp'
    },
    {
        name: 'puzzled-night',
        query: 'pose=puzzled&night=1',
        size: 480,
        out: 'public/images/spirit/spirit-puzzled-night.webp'
    },
    {
        name: 'sleepy-day',
        query: 'pose=sleepy&night=0.3',
        size: 384,
        out: 'public/images/spirit/spirit-sleepy-day.webp'
    },
    {
        name: 'sleepy-night',
        query: 'pose=sleepy&night=1',
        size: 384,
        out: 'public/images/spirit/spirit-sleepy-night.webp'
    },
    {
        name: 'og',
        query: 'shot=og&pose=greeting&night=0',
        width: 1200,
        height: 630,
        out: 'public/images/og-image-spirit.jpg'
    }
]

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function launchChrome() {
    const profile = mkdtempSync(join(tmpdir(), 'spirit-stills-'))
    const args = [`--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--headless=new', '--no-first-run']
    args.push('--hide-scrollbars', '--ignore-gpu-blocklist')
    if (process.platform === 'win32') args.push('--use-angle=d3d11')
    const proc = spawn(CHROME, [...args, 'about:blank'], { stdio: 'ignore' })
    for (let i = 0; i < 50; i++) {
        try {
            await fetch(`http://127.0.0.1:${PORT}/json/version`)
            return {
                close() {
                    proc.kill()
                    sleep(300).then(() => rmSync(profile, { recursive: true, force: true }))
                }
            }
        } catch {
            await sleep(200)
        }
    }
    proc.kill()
    throw new Error(`Chrome did not start (${CHROME}); set CHROME_PATH`)
}

/** Minimal CDP session on a fresh tab: send(method, params) → result. */
async function openTab() {
    const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json()
    const ws = new WebSocket(target.webSocketDebuggerUrl)
    await new Promise((resolve, reject) => {
        ws.onopen = resolve
        ws.onerror = reject
    })
    let id = 0
    const pending = new Map()
    ws.onmessage = ev => {
        const msg = JSON.parse(ev.data)
        const call = pending.get(msg.id)
        if (!call) return
        pending.delete(msg.id)
        if (msg.error) call.reject(new Error(JSON.stringify(msg.error)))
        else call.resolve(msg.result)
    }
    const send = (method, params = {}) =>
        new Promise((resolve, reject) => {
            pending.set(++id, { resolve, reject })
            ws.send(JSON.stringify({ id, method, params }))
        })
    return { send, close: () => ws.close() }
}

async function capture(base, shot) {
    const width = shot.width ?? shot.size
    const height = shot.height ?? shot.size
    const tab = await openTab()
    try {
        await tab.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
        await tab.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } })
        const size = shot.size ? `&size=${shot.size}` : ''
        await tab.send('Page.navigate', { url: `${base}${PAGE.slice(1)}?${shot.query}${size}` })
        for (let i = 0; ; i++) {
            const { result } = await tab.send('Runtime.evaluate', {
                expression: 'window.__stillError ?? window.__stillReady ?? null',
                returnByValue: true
            })
            if (typeof result.value === 'string') throw new Error(`${shot.name}: ${result.value}`)
            if (result.value === true) break
            if (i > 300) throw new Error(`${shot.name}: page never became ready`)
            await sleep(100)
        }
        const { data } = await tab.send('Page.captureScreenshot', {
            format: 'png',
            clip: { x: 0, y: 0, width, height, scale: 1 }
        })
        const png = sharp(Buffer.from(data, 'base64'))
        mkdirSync(dirname(shot.out), { recursive: true })
        const encoded = shot.out.endsWith('.jpg')
            ? png.jpeg({ quality: 84, mozjpeg: true })
            : png.webp({ quality: 86, alphaQuality: 90, effort: 6 })
        const info = await encoded.toFile(shot.out)
        console.log(`${shot.name.padEnd(14)} → ${shot.out} (${(info.size / 1024).toFixed(1)} KB)`)
    } finally {
        tab.close()
    }
}

const only = process.argv
    .find(a => a.startsWith('--only='))
    ?.slice(7)
    .split(',')
const shots = only ? SHOTS.filter(s => only.includes(s.name)) : SHOTS
if (!shots.length) throw new Error(`no shot matches --only (names: ${SHOTS.map(s => s.name).join(', ')})`)

const server = await createServer({ logLevel: 'error', server: { host: '127.0.0.1', port: 5199 } })
await server.listen()
const base = server.resolvedUrls?.local[0] ?? 'http://127.0.0.1:5199/'
const chrome = await launchChrome()
try {
    for (const shot of shots) await capture(base, shot)
} finally {
    chrome.close()
    await server.close()
}
