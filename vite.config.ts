import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss()],
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
                // Manual chunks: isolate heavy libs
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router'],
                    'motion': ['motion'],
                    'vendor-gsap': ['gsap', '@gsap/react', 'lenis'],
                    'vendor-three': ['three'],
                }
            }
        }
    },
    server: {
        port: 5173,
        host: '0.0.0.0'
    }
})
