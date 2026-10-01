import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import sitemapPlugin from './scripts/vite-plugin-sitemap'

export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss(), sitemapPlugin()],
    build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
            output: {
                // Manual chunks: isolate heavy libs. Function form so subpath
                // modules (react-dom/client, gsap/ScrollTrigger) land in their
                // vendor chunk too — the object form only matched package
                // entries and left ~300KB of them inside the app chunk.
                manualChunks(id) {
                    // App code (incl. the lazy 3D world) is NOT bucketed here: a manual chunk drags its
                    // shared deps (e.g. scene/zone-data) along and gets preloaded from index.html. The
                    // world's lazy chunks are named after their dynamic-import entry modules instead.
                    if (!id.includes('node_modules')) return
                    // Match the segment AFTER node_modules/ so directory names in
                    // the checkout path can never hijack a vendor bucket.
                    const pkg = id.split('node_modules/').pop() ?? ''
                    if (pkg.startsWith('three/')) return 'vendor-three'
                    if (pkg.startsWith('gsap/') || pkg.startsWith('@gsap/') || pkg.startsWith('lenis/'))
                        return 'vendor-gsap'
                    // motion + its framer-motion/motion-dom/motion-utils internals
                    if (pkg.startsWith('motion') || pkg.startsWith('framer-motion/')) return 'motion'
                    if (pkg.startsWith('react-icons/')) return 'vendor-icons'
                    // Everything else (react, react-dom, router, small glue libs)
                    // shares ONE chunk: glue libs read React at module-eval time,
                    // so a separate misc chunk creates a circular-init TypeError.
                    return 'vendor-react'
                }
            }
        }
    },
    server: {
        port: 5173,
        host: '0.0.0.0'
    }
})
