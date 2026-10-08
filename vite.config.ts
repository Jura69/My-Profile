import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import previewVercelParityPlugin from './scripts/vite-plugin-preview-vercel-parity'

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [react(), tsconfigPaths(), tailwindcss(), previewVercelParityPlugin()],
    // Build-time prerender bundle (src/entry-server.tsx → .ssr-build/): bundle every dependency
    // so Node never loads packages whose ESM/CJS shape it cannot import directly (gsap, lenis).
    ssr: { noExternal: true },
    build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
            output: isSsrBuild
                ? {}
                : {
                      // Manual chunks: isolate heavy libs. Function form so subpath
                      // modules (react-dom/client, gsap/ScrollTrigger) land in their
                      // vendor chunk too — the object form only matched package
                      // entries and left ~300KB of them inside the app chunk.
                      manualChunks(id: string) {
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
}))
