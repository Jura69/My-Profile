import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import sitemapPlugin from './scripts/vite-plugin-sitemap'

export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss(), sitemapPlugin()],
    resolve: {
        alias: {
            // Map @/* to src/* (redundant with tsconfigPaths but explicit)
        }
    },
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
                    if (!id.includes('node_modules')) return
                    if (id.includes('three')) return 'vendor-three'
                    if (id.includes('gsap') || id.includes('lenis')) return 'vendor-gsap'
                    if (id.includes('motion')) return 'motion'
                    if (id.includes('react-icons')) return 'vendor-icons'
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
