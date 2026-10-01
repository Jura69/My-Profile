/**
 * Dev-only perf readout: fps (1 s window), mean + p95 frame time, draw calls, triangles, DPR, GPU.
 * Mirrors the numbers on `window.__perf` so CDP scripts read the same values a phone user sees.
 */
import type { WebGLRenderer } from 'three'

declare global {
    interface Window {
        __perf?: { fps: number; meanMs: number; p95Ms: number; calls: number; tris: number; dpr: number; gpu: string }
    }
}

function gpuName(renderer: WebGLRenderer): string {
    const gl = renderer.getContext()
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    return ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : 'unknown'
}

export function createFpsOverlay(renderer: WebGLRenderer, parent: HTMLElement = document.body) {
    const el = document.createElement('div')
    el.style.cssText =
        'position:fixed;top:8px;left:8px;z-index:200;padding:6px 8px;border-radius:6px;font:12px/1.35 ui-monospace,monospace;' +
        'background:rgba(20,24,20,.72);color:#e7f5e1;pointer-events:none;white-space:pre'
    parent.appendChild(el)
    const gpu = gpuName(renderer)
    const frames: number[] = []
    let last = performance.now()
    let windowStart = last

    return {
        /** Call once per presented frame, after renderer.render. */
        tick() {
            const now = performance.now()
            frames.push(now - last)
            last = now
            if (now - windowStart < 1000) return
            const sorted = [...frames].sort((a, b) => a - b)
            const mean = frames.reduce((s, v) => s + v, 0) / frames.length
            const perf = {
                fps: Math.round((frames.length * 1000) / (now - windowStart)),
                meanMs: +mean.toFixed(1),
                p95Ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(1),
                calls: renderer.info.render.calls,
                tris: renderer.info.render.triangles,
                dpr: renderer.getPixelRatio(),
                gpu
            }
            window.__perf = perf
            el.textContent =
                `${perf.fps} fps  ${perf.meanMs} ms (p95 ${perf.p95Ms})\n` +
                `calls ${perf.calls}  tris ${(perf.tris / 1000).toFixed(1)}k  dpr ${perf.dpr}\n${gpu.slice(0, 48)}`
            frames.length = 0
            windowStart = now
        },
        dispose() {
            el.remove()
            delete window.__perf
        }
    }
}
