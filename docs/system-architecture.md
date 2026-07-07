# System Architecture Documentation

**Project:** Personal Portfolio Website
**Architecture Style:** Vite SPA (Single Page Application)
**Last Updated:** 2026-07-07
**Build Tool:** Vite 6
**Runtime:** React 19 + React Router 7 (client-side routing)

---

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Technology Stack](#technology-stack)
3. [Component Hierarchy](#component-hierarchy)
4. [Data Flow](#data-flow)
5. [Rendering Strategy](#rendering-strategy)
6. [Build & Deployment Pipeline](#build--deployment-pipeline)
7. [Performance Architecture](#performance-architecture)
8. [SEO Architecture](#seo-architecture)
9. [3D Graphics Implementation](#3d-graphics-implementation)
10. [Security Architecture](#security-architecture)

---

## High-Level Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React 19   │  │ Three.js 3D  │  │  Motion 12   │      │
│  │  Components  │  │   Renderer   │  │ + GSAP Scroll│      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         └──────────────────┴──────────────────┘               │
│                            │                                  │
│                ┌───────────▼───────────┐                     │
│                │  Tailwind CSS 4       │                     │
│                │  + Design Tokens      │                     │
│                │  (.dark mode)         │                     │
│                └───────────┬───────────┘                     │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Vite 6 SPA    │
                    │ (React Router 7)│
                    │ (Client Routes) │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
  ┌─────▼──────┐      ┌─────▼─────┐      ┌──────▼──────┐
  │   Home     │      │   Works   │      │ Activities  │
  │  + Scene   │      │  (Grid)   │      │  Audiophile │
  │ (Day→Night)│      │           │      │   (Detail)  │
  └─────┬──────┘      └─────┬─────┘      └──────┬──────┘
        │                    │                    │
        └────────────────────┴────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Vercel Edge    │
                    │    Network      │
                    │  (CDN + Cache)  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Static Assets  │
                    │  - Images(2.5MB)│
                    │  - 3D Model     │
                    │  - JS/CSS chunks│
                    └─────────────────┘
```

### Key Architectural Decisions

**1. Client-Side Rendering (SPA) First**
- All routing handled by React Router (no server needed)
- Instant navigation (no full page reloads)
- Content hardcoded (no API calls)
- Faster local development with Vite

**2. TypeScript + Tailwind Foundation**
- TypeScript for type safety (all .tsx files)
- Tailwind CSS 4 for utility-first styling
- Design tokens in global.css (@theme)
- No Chakra UI or Emotion overhead

**3. Animation Architecture**
- Motion 12 for component-level animations (transitions, hovers)
- GSAP ScrollTrigger + Lenis for scroll-linked effects
- GSAP confined to scene components (zero React re-render cost)
- Respects `prefers-reduced-motion`

**4. Vercel Edge Deployment**
- Static SPA served from CDN
- Automatic HTTPS and git integration
- 1-year cache headers for assets
- Instant deployments on git push

---

## Technology Stack

### Frontend Framework

**Vite 6**
- **Why:** Lightning-fast SPA build tool (1000x faster than Webpack)
- **Trade-offs:** No SSR (but not needed for portfolio)
- **Key Features Used:**
  - ESM-based dev server (instant HMR)
  - SWC transpilation (Rust, very fast)
  - Manual code splitting (vendor isolation)
  - TypeScript support out-of-box
  - Rollup-based production builds

**React 19 + React Router 7**
- **React 19:** Latest, with improved hooks and performance
- **Hooks Used:** useState, useEffect, useRef, useCallback, useMemo, useContext
- **React Router 7:** Client-side navigation (SPA routing)
- **Advantages:** No build complexity, all routing in src/app.tsx

### Styling Framework

**Tailwind CSS 4**
- **Why:**
  - Smallest CSS footprint (only used classes)
  - Rapid iteration (no context switching to CSS)
  - Built-in dark mode (class-based)
  - Excellent TypeScript support in config
  - @tailwindcss/vite plugin for Vite
- **Alternatives Considered:**
  - CSS Modules (more boilerplate)
  - Emotion/Styled Components (larger JS bundle)
  - UnoCSS (less mature ecosystem)
- **Usage:**
  - Utility classes in JSX
  - Design tokens (@theme in global.css)
  - Dark mode via `.dark` class on <html>
  - Semantic color variables for light/dark

**Radix UI (Optional Primitives)**
- **Why:** Headless, unstyled components (when Tailwind alone isn't enough)
- **Current Usage:** Dropdown menu (only dependency when needed)

### Animation

**Motion 12 (Framer's successor)**
- **Why:**
  - Modern animation primitives
  - Full React 19 compatibility
  - Smaller bundle than Framer Motion
  - `<motion.div>` for declarative animations
- **Patterns:**
  - Page transitions (enter/exit variants)
  - Scroll-triggered reveals (whileInView)
  - Hover interactions (whileHover)
  - Staggered children animations

**GSAP 3.15 + ScrollTrigger + Lenis**
- **Why:**
  - Advanced scroll-linked animations
  - Performance optimized (no React re-renders)
  - Smooth scroll library (Lenis) integration
  - Used for complex hero/scene animations
- **Separation:** GSAP confined to `src/components/scene/` (not in main app flow)
- **Benefit:** Zero React re-render overhead during scroll

### 3D Graphics

**Three.js 0.172.0**
- **Why:**
  - Industry standard WebGL library
  - GLTF/Draco support
  - OrbitControls for interaction
- **Alternatives Considered:**
  - React Three Fiber (abstraction overhead)
  - Babylon.js (larger bundle)
  - PlayCanvas (game engine overkill)
- **Components:**
  - WebGLRenderer
  - OrthographicCamera
  - GLTFLoader + DRACOLoader
  - OrbitControls

### Build Tools

**Vite 6 + Rollup**
- **Transpiler:** SWC (Rust-based, 20x faster than Babel)
- **Minifier:** esbuild (production-grade)
- **Features:**
  - Instant HMR in dev mode
  - Manual code splitting (vendor-react, motion, gsap, three)
  - Tree shaking
  - Asset inlining
  - CSS minification

**TypeScript 5.7**
- **Build Step:** `tsc -b` before Vite build
- **Type Checking:** Full strict mode
- **Path Aliases:** @/* → src/*

---

## Component Hierarchy

### Application Tree

```
App (src/app.tsx with BrowserRouter)
├── ThemeProvider (theme context + localStorage)
│   └── MainLayout (components/layout/main.tsx)
│       ├── Navbar (fixed top)
│       │   ├── Logo (clickable → home)
│       │   ├── Desktop Navigation Links
│       │   ├── Mobile Hamburger Menu
│       │   └── Theme Toggle Button
│       │       └── <motion.div> (icon swap animation)
│       ├── Routes (React Router 7)
│       │   ├── <Route path="/" element={<HomePage />} />
│       │   ├── <Route path="/works" element={<WorksPage />} />
│       │   ├── <Route path="/works/:id" element={<DetailPage />} />
│       │   ├── <Route path="/activities" element={<ActivitiesPage />} />
│       │   ├── <Route path="/activities/:id" element={<DetailPage />} />
│       │   ├── <Route path="/audiophile" element={<AudiophilePage />} />
│       │   ├── <Route path="/audiophile/:id" element={<DetailPage />} />
│       │   └── <Route path="*" element={<NotFound />} />
│       ├── Dynamic Scene Components (lazy loaded)
│       │   ├── Home Day→Night Scene (GSAP + Lenis)
│       │   └── Totoro 3D (React.lazy + loading spinner)
│       │       └── Canvas (Three.js WebGL)
│       │           ├── Scene, Camera, Lights
│       │           ├── GLTF Model (Draco decompressed)
│       │           └── OrbitControls (user interaction)
│       └── Footer (components/footer.tsx)
│           └── Copyright + Year
├── SEO Component (per-page meta tags)
├── JSON-LD Schemas (per-page structured data)
├── Vercel Analytics
└── Vercel Speed Insights
```

### Layout Hierarchy

**Two-Tier Layout System:**

1. **Main Layout** (`layouts/main.js`)
   - Global wrapper for entire app
   - Contains: Navbar, Footer, Totoro 3D model
   - Memoized to prevent re-renders
   - Applied in `_app.js`

2. **Article Layout** (`layouts/article.js`)
   - Page-specific wrapper
   - Contains: Page title injection, GridItemStyle
   - Handles page transitions (Framer Motion)
   - Applied per page

**Layout Usage:**
```javascript
// _app.js (global)
<Layout router={router}>
  <Component {...pageProps} />
</Layout>

// Project page (page-specific)
<Layout title="Project Name">
  <Container>
    {/* Page content */}
  </Container>
</Layout>
```

---

## Data Flow

### State Management Architecture

```
┌──────────────────────────────────────────────────────┐
│                   Global State                        │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Chakra Context (Theme + Color Mode)            │ │
│  │  - localStorage fallback (client)               │ │
│  │  - Cookie-based SSR (server)                    │ │
│  └───────────────────┬─────────────────────────────┘ │
└──────────────────────┼────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
    ┌─────▼──────┐          ┌──────▼─────┐
    │ Component  │          │ Component  │
    │   State    │          │   State    │
    │ (useState) │          │ (useRef)   │
    └─────┬──────┘          └──────┬─────┘
          │                         │
    ┌─────▼──────┐          ┌──────▼─────┐
    │ Derived    │          │ DOM Refs   │
    │ State      │          │ (canvas,   │
    │ (useMemo)  │          │ containers)│
    └────────────┘          └────────────┘
```

### Data Sources

**Static Content (Hardcoded):**
- Skills array (18 badges)
- Work experience (3 positions + education)
- Project details (4 projects)
- Audio reviews (4 devices)
- No CMS, no API calls

**Dynamic Data:**
- Color mode preference (localStorage + cookie)
- 3D model state (loading, error)
- Animation states (Framer Motion)
- Route state (Next.js router)

### Props Flow

**Uni-directional Data Flow:**
```
Parent Component
  ├── prop1 ──► Child A
  ├── prop2 ──► Child B
  └── prop3 ──► Child C
      └── prop4 ──► Grandchild
```

**No Redux/MobX:**
- Props drilling acceptable for small app
- Chakra Context sufficient for theme
- No complex state management needed

---

## Rendering Strategy

### Pure Client-Side Rendering (SPA)

**All Pages: CSR (Client-Side Rendering)**

| Page | Routing | Data Source | Strategy |
|------|---------|-------------|----------|
| `/` | React Router | Hardcoded (src/data) | CSR |
| `/works` | React Router | Hardcoded (src/data) | CSR |
| `/works/:id` | React Router | Hardcoded (src/data) | CSR |
| `/activities` | React Router | Hardcoded (src/data) | CSR |
| `/activities/:id` | React Router | Hardcoded (src/data) | CSR |
| `/audiophile` | React Router | Hardcoded (src/data) | CSR |
| `/audiophile/:id` | React Router | Hardcoded (src/data) | CSR |

**Advantages:**
- No server logic needed
- Instant client-side navigation (no reload)
- Simple Vercel static deployment
- Lightning-fast development with Vite HMR

### Color Mode Persistence

**localStorage Strategy:**
```typescript
// providers/theme.tsx
useEffect(() => {
  const saved = localStorage.getItem('theme') ?? 'light'
  setTheme(saved)
  document.documentElement.classList.toggle('dark', saved === 'dark')
}, [])

// HTML pre-paint script (index.html)
// Runs before React hydration to prevent FOUC
<script>
  const theme = localStorage.getItem('theme') ?? 'light'
  if (theme === 'dark') document.documentElement.classList.add('dark')
</script>
```

### Build-Time vs Runtime

**Build-Time (Vite):**
- TypeScript type-checking (tsc -b)
- SWC transpilation (ES modules)
- Tailwind CSS JIT compilation
- Tree-shaking (unused code removal)
- Manual code splitting (vendor chunks)
- Asset minification and hashing

**Runtime (Browser):**
- React hydration (mount to HTML root)
- React Router navigation (client-side, no reloads)
- Lazy loading (React.lazy + Suspense)
- Animation triggers (Motion, GSAP)
- 3D rendering (Three.js WebGL)

---

## Build & Deployment Pipeline

### Development Workflow

```
Local Development
  ├── npm run dev (Vite dev server on :5173)
  │   ├── ES modules (no bundling)
  │   ├── Instant HMR (< 100ms)
  │   └── TypeScript type-checking
  ├── npm run lint (ESLint check)
  ├── npm run prettier (Code formatting)
  └── npm run analyze (Bundle size viz)
```

### Build Process

```
npm run build
  ↓
┌─────────────────────────────────────────┐
│ 1. TypeScript Check                      │
│    tsc -b (incremental build)            │
│    - Type errors halt build              │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. Vite Build                            │
│    - SWC transpilation                   │
│    - JSX compilation                     │
│    - Tree-shaking                        │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. Code Splitting                        │
│    - vendor-react (~180KB)               │
│    - vendor-gsap (~150KB)                │
│    - vendor-three (~200KB)               │
│    - motion (~45KB)                      │
│    - main chunk (~120KB)                 │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. Tailwind CSS Compilation              │
│    - JIT generation (only used classes)  │
│    - Minification                        │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 5. Asset Minification & Hashing          │
│    - JS minification (esbuild)           │
│    - CSS minification                    │
│    - Content-hash in filenames           │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 6. Output Directory                      │
│    dist/                                 │
│    ├── index.html (entry point)          │
│    ├── assets/ (JS, CSS chunks)          │
│    └── images/ (static images)           │
└──────────────────────────────────────────┘
```

### Deployment to Vercel

```
GitHub Push (main branch)
  ↓
Vercel Webhook Triggered
  ↓
┌─────────────────────────────────────────┐
│ Vercel Build Environment                 │
│ - Node.js 18.x                           │
│ - npm install (dependencies)             │
│ - npm run build (Vite build)             │
│ - Build time: ~2-3 minutes               │
│ - Output: dist/ (static files)           │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Edge Network Deployment                  │
│ - Global CDN (300+ locations)            │
│ - Static asset serving (ultra-fast)      │
│ - Atomic deployment (zero downtime)      │
│ - Automatic HTTPS + redirects            │
│ - Cache headers applied                  │
└─────────────┬───────────────────────────┘
              ↓
Production Live
https://my-profile-jura69.vercel.app
```

### Cache Strategy

**Vercel Edge Cache:**
```javascript
// next.config.mjs
headers: [
  {
    source: '/images/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'  // 1 year
      }
    ]
  },
  {
    source: '/totoro-compressed.glb',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ]
  }
]
```

**Browser Cache:**
- HTML: No cache (always fresh)
- JavaScript chunks: 1 year (content hash in filename)
- Images: 1 year (Vercel Image Optimization CDN)
- 3D model: 1 year (static asset)

---

## Performance Architecture

### Optimization Layers

```
┌──────────────────────────────────────────────────────┐
│ Layer 1: Network (Vercel Edge)                       │
│ - Global CDN                                          │
│ - HTTP/2, HTTP/3                                      │
│ - Brotli compression                                  │
│ - Edge caching (1 year immutable)                     │
└────────────────────┬─────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────┐
│ Layer 2: Build-Time (Next.js)                        │
│ - Code splitting (Webpack cache groups)              │
│ - Tree shaking (optimizePackageImports)              │
│ - Image optimization (AVIF/WebP)                     │
│ - SWC minification                                   │
└────────────────────┬─────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────┐
│ Layer 3: Runtime (React)                             │
│ - React.memo (prevent re-renders)                    │
│ - Lazy loading (dynamic imports)                     │
│ - Code splitting (route-based)                       │
│ - Concurrent rendering                               │
└────────────────────┬─────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────┐
│ Layer 4: Assets (Images, 3D)                         │
│ - Lazy loading (IntersectionObserver)                │
│ - Progressive loading (Totoro spinner)               │
│ - Draco compression (3D model 96.7%)                 │
│ - Responsive images (srcset)                         │
└──────────────────────────────────────────────────────┘
```

### Critical Rendering Path

```
1. HTML Request
   → Vercel Edge CDN (< 50ms TTFB)
   ↓
2. Parse HTML
   → Preload: /totoro-compressed.glb
   → DNS Prefetch: fonts.googleapis.com
   ↓
3. Load Critical CSS
   → Inline Chakra theme
   → ColorModeScript (prevent FOUC)
   ↓
4. Load JavaScript
   → Main chunk (< 500KB)
   → React hydration
   ↓
5. Lazy Load Non-Critical
   → Totoro 3D model (dynamic import)
   → Below-fold images (lazy loading)
   ↓
6. Interactive
   → Framer Motion animations trigger
   → OrbitControls enable
```

### Bundle Optimization

**Webpack Cache Groups:**
```javascript
optimization: {
  splitChunks: {
    cacheGroups: {
      three: {
        test: /[\\/]node_modules[\\/]three[\\/]/,
        name: 'three',
        priority: 30,
        reuseExistingChunk: true
      },
      chakra: {
        test: /[\\/]node_modules[\\/](@chakra-ui|@emotion)[\\/]/,
        name: 'chakra-ui',
        priority: 20,
        reuseExistingChunk: true
      },
      framer: {
        test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
        name: 'framer-motion',
        priority: 15,
        reuseExistingChunk: true
      }
    }
  }
}
```

**Tree Shaking:**
```javascript
experimental: {
  optimizePackageImports: [
    '@chakra-ui/react',
    'framer-motion',
    'three',
    'react-icons'
  ]
}
```

---

## SEO Architecture

### Multi-Layer SEO Strategy

```
┌──────────────────────────────────────────────────────┐
│ Layer 1: Static Files                                │
│ - robots.txt (allow all, sitemap reference)          │
│ - sitemap.xml (9 URLs, priorities, changefreq)       │
└────────────────────┬─────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────┐
│ Layer 2: Document (_document.js)                     │
│ - HTML lang="en"                                      │
│ - Preload critical assets                            │
│ - DNS prefetch (fonts.googleapis.com)                │
│ - Favicon, apple-touch-icon                          │
└────────────────────┬─────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────┐
│ Layer 3: SEO Component (per page)                    │
│ - Primary meta tags (title, description, keywords)   │
│ - Open Graph (Facebook)                              │
│ - Twitter Card                                       │
│ - Canonical URL                                      │
│ - Mobile viewport                                    │
└────────────────────┬─────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────┐
│ Layer 4: JSON-LD Structured Data                     │
│ - PersonSchema (homepage)                            │
│ - WebsiteSchema (homepage)                           │
│ - ProfilePageSchema (homepage)                       │
│ - ProjectSchema (project pages)                      │
│ - BreadcrumbSchema (all detail pages)                │
└──────────────────────────────────────────────────────┘
```

### Schema.org Implementation

**Homepage:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Trương Tuấn Lộc",
  "jobTitle": "Full-stack Developer",
  "knowsAbout": ["React.js", "Node.js", "C#", ...],
  "sameAs": ["https://github.com/Jura69", ...]
}
```

**Project Pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Project Title",
  "author": {"@type": "Person", "name": "Trương Tuấn Lộc"},
  "dateCreated": "2024",
  "url": "https://github.com/...",
  "keywords": ["React", "Node.js", ...]
}
```

---

## 3D Graphics Implementation

### Three.js Architecture

```
Totoro Component (components/totoro.js)
  ├── useRef(canvas)
  ├── useEffect (mount)
  │   ├── Create Scene
  │   ├── Create Camera (Orthographic)
  │   │   └── Position: (20, 10, circular)
  │   ├── Create Renderer (WebGL)
  │   │   ├── Pixel ratio: min(devicePixelRatio, 2)
  │   │   ├── Precision: mediump
  │   │   ├── Antialias: conditional
  │   │   └── Shadows: disabled
  │   ├── Create Lights (Ambient)
  │   ├── Load Model (lib/model.js)
  │   │   ├── GLTFLoader
  │   │   ├── DRACOLoader (Google CDN)
  │   │   └── Parse /totoro-compressed.glb
  │   ├── Animation Loop
  │   │   ├── Frames 1-100: Circular camera rotation
  │   │   │   └── Easing: easeOutCirc
  │   │   └── Frame 101+: OrbitControls takeover
  │   ├── Resize Handler (window.addEventListener)
  │   └── Cleanup (cancelAnimationFrame, dispose)
  └── Return \<canvas ref={canvas} /\>
```

### Model Loading Pipeline

```
User loads page
  ↓
Dynamic import Totoro component
  ↓
TotoroLoader shows spinner
  ↓
useEffect mount
  ↓
GLTFLoader.load('/totoro-compressed.glb')
  ↓
DRACOLoader fetches decoder from CDN
https://www.gstatic.com/draco/v1/decoders/
  ↓
Decompress model (1.5MB → full mesh data)
  ↓
Add to scene, compute bounding box
  ↓
Start animation loop (requestAnimationFrame)
  ↓
Hide spinner, show canvas
```

### Performance Optimizations

**Compression:**
- Original: 44MB GLTF
- First pass: 5.7MB (87% reduction)
- Draco: 1.5MB (96.7% total reduction)

**Renderer Config:**
```javascript
new WebGLRenderer({
  antialias: devicePixelRatio < 2,  // Conditional AA
  alpha: true,                       // Transparent background
  powerPreference: "high-performance",
  precision: "mediump",              // Lower precision
  stencil: false,                    // No stencil buffer
  depth: true
})

renderer.shadowMap.enabled = false   // No shadows
renderer.physicallyCorrectLights = false
```

---

## Security Architecture

### HTTPS Enforcement

```
Vercel Automatic HTTPS
  - Free SSL/TLS certificates (Let's Encrypt)
  - Automatic renewal
  - HTTP → HTTPS redirect
  - HSTS headers
```

### Content Security Policy

```javascript
// SVG handling only
dangerouslyAllowSVG: true,
contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
```

**Future:** Implement full CSP for HTML

### Dependency Security

```bash
npm audit  # Check for vulnerabilities
npm update  # Update dependencies
```

**No secrets in client code:**
- No API keys
- No database credentials
- No authentication tokens

---

## Future Architectural Improvements

### Short-Term (Q2 2026)

1. **Image CDN Integration**
   - Cloudinary or ImageKit
   - Reduce 11MB → 3MB target
   - Automatic format optimization

2. **Dynamic Sitemap Generation**
   - API route `/api/sitemap.xml`
   - Auto-update lastmod dates

3. **Contact Form Backend**
   - EmailJS or Vercel serverless function
   - Form validation
   - Spam protection (reCAPTCHA)

### Mid-Term (Q3 2026)

4. **Progressive Web App (PWA)**
   - Service Worker
   - Offline support
   - Install prompt

5. **Enhanced Analytics**
   - Google Analytics 4
   - Custom event tracking
   - Conversion funnels

6. **TypeScript Migration**
   - Gradual migration (.js → .tsx)
   - Type safety for props
   - Better IDE support

### Long-Term (Q4 2026)

7. **CMS Integration**
   - Headless CMS (Sanity, Contentful)
   - Blog post management
   - Portfolio updates without code changes

8. **Testing Suite**
   - Jest unit tests
   - Playwright E2E tests
   - Visual regression (Percy, Chromatic)

9. **App Router Migration**
   - Upgrade to Next.js App Router
   - Server Components
   - Streaming SSR

---

**Document Version:** 1.0
**Reviewed By:** Trương Tuấn Lộc
**Next Review:** Q2 2026
