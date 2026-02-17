# System Architecture Documentation

**Project:** Personal Portfolio Website
**Architecture Style:** JAMstack (JavaScript, APIs, Markup)
**Last Updated:** 2026-01-20

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
│  │   React 18   │  │ Three.js 3D  │  │ Framer Motion│      │
│  │  Components  │  │   Renderer   │  │  Animations  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         └──────────────────┴──────────────────┘               │
│                            │                                  │
│                ┌───────────▼───────────┐                     │
│                │   Chakra UI Theme     │                     │
│                │   & Color Mode        │                     │
│                └───────────┬───────────┘                     │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Next.js 14    │
                    │  (Pages Router) │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
  ┌─────▼──────┐      ┌─────▼─────┐      ┌──────▼──────┐
  │   SSG       │      │    SSR    │      │    CSR      │
  │ /works      │      │/audiophile│      │  /index.js  │
  │ /activities │      │/works/*   │      │             │
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
                    │  - Images (11MB)│
                    │  - 3D Model     │
                    │  - Fonts (CDN)  │
                    └─────────────────┘
```

### Key Architectural Decisions

**1. Static Site Generation (SSG) First**
- Default to SSG for fastest load times
- Use SSR only for color mode cookie persistence
- No server-side logic, no database

**2. Component-Based Architecture**
- Functional components only (no classes)
- React hooks for state management
- Chakra UI for design system

**3. Progressive Enhancement**
- Core content accessible without JavaScript
- 3D graphics enhance experience, not block it
- Animations respect `prefers-reduced-motion`

**4. Edge Deployment**
- Vercel Edge Network (global CDN)
- Automatic HTTPS
- Instant cache invalidation

---

## Technology Stack

### Frontend Framework

**Next.js 14.2.13 (Pages Router)**
- **Why:** Production-ready React framework with built-in optimizations
- **Alternatives Considered:**
  - App Router (too new, migration complexity)
  - Gatsby (slower builds, GraphQL overhead)
  - Vite + React Router (manual SSR setup)
- **Key Features Used:**
  - File-based routing
  - Image optimization
  - Code splitting
  - Static generation
  - Server-side rendering

**React 18**
- **Why:** Industry standard UI library
- **Hooks Used:** useState, useEffect, useRef, useCallback, useMemo
- **Not Used:** Suspense, Server Components (Pages Router limitation)

### UI Framework

**Chakra UI 2.8.2**
- **Why:**
  - Accessible by default (ARIA, keyboard nav)
  - Dark mode out of box
  - Responsive design utilities
  - Consistent design tokens
- **Alternatives Considered:**
  - Tailwind CSS (no built-in components)
  - Material UI (heavier, opinionated design)
  - Styled Components (manual accessibility)
- **Usage:**
  - `useColorMode()` for theme switching
  - `useColorModeValue()` for color adaptations
  - Component props for responsive design

**Emotion 11.13.3**
- **Why:** Chakra UI dependency, CSS-in-JS
- **Usage:** `styled()` for custom styled components (Paragraph, WorkSection)

### Animation

**Framer Motion 11.5.6**
- **Why:**
  - Declarative animation API
  - Spring physics
  - Scroll-triggered animations
  - Page transitions
- **Alternatives Considered:**
  - React Spring (more complex API)
  - GSAP (imperative, licensing)
  - CSS animations (limited control)
- **Patterns:**
  - Page transitions (AnimatePresence)
  - Scroll triggers (whileInView)
  - Hover interactions (whileHover)
  - Continuous animations (infinite loops)

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

**SWC Compiler**
- **Why:** 20x faster than Babel (Rust-based)
- **Usage:** Transpilation, minification

**Webpack (via Next.js)**
- **Why:** Next.js default bundler
- **Custom Config:**
  - Cache groups (Three.js, Chakra, Framer Motion)
  - Bundle analyzer integration

**Sharp 0.34.5**
- **Why:** Image optimization (AVIF, WebP conversion)
- **Auto-installed:** Next.js dependency

---

## Component Hierarchy

### Application Tree

```
App (_app.js)
├── Chakra Provider (theme + color mode)
│   └── Font Loader
│       └── Layout (main.js)
│           ├── Head (metadata, preloads)
│           ├── Navbar
│           │   ├── Logo
│           │   │   └── TotoroIcon (SVG)
│           │   ├── Desktop Links
│           │   ├── Mobile Hamburger Menu
│           │   └── ThemeToggleButton
│           │       └── AnimatePresence (icon swap)
│           ├── Main Content Area
│           │   └── AnimatePresence (page transitions)
│           │       └── Page Component
│           │           ├── Layout (article.js)
│           │           │   ├── Head (page title, meta)
│           │           │   ├── GridItemStyle (global CSS)
│           │           │   └── motion.article (transition wrapper)
│           │           ├── SEO Component
│           │           ├── JSON-LD Schemas
│           │           ├── Section (staggered fade-in)
│           │           │   ├── Heading
│           │           │   ├── Paragraph
│           │           │   ├── AnimatedBadge (skills)
│           │           │   ├── AnimatedButton (CTA)
│           │           │   └── AnimatedWorkCard (timeline)
│           │           └── Grid Components
│           │               ├── WorkGridItem
│           │               ├── AudioGridItem
│           │               └── ActivitiesGridItem
│           ├── Totoro (lazy loaded)
│           │   └── TotoroContainer (FloatingBox)
│           │       ├── TotoroSpinner (loading)
│           │       └── Canvas (Three.js renderer)
│           │           ├── Scene
│           │           ├── Camera (Orthographic)
│           │           ├── Light (Ambient)
│           │           └── GLTF Model (Draco compressed)
│           └── Footer
│               └── Copyright Text
└── Vercel Analytics
    └── SpeedInsights
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

### Hybrid SSR/SSG Architecture

**Strategy Decision Matrix:**

| Page | Strategy | Reason |
|------|----------|--------|
| `/` (index.js) | CSR | No data fetching, client-only |
| `/works` | SSG | Static project list |
| `/works/foodlover` | SSR | Color mode cookie persistence |
| `/works/ticketapp` | SSR | Color mode cookie persistence |
| `/works/tensorflow` | SSR | Color mode cookie persistence |
| `/works/ecommerceBE` | SSR | Color mode cookie persistence |
| `/activities` | SSG | Static activities list |
| `/activities/ytc` | SSG | Static activity content |
| `/audiophile` | SSR | Color mode cookie persistence |
| `/audiophile/*` (4 pages) | SSR | Color mode cookie persistence |

**SSG Implementation:**
```javascript
// Export from components/chakra.js
export async function getStaticProps() {
  return {
    props: {
      cookies: ''  // Empty cookies for SSG
    }
  }
}
```

**SSR Implementation:**
```javascript
// Export from components/chakra.js
export async function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? ''  // Color mode cookie
    }
  }
}
```

**Color Mode Flow:**
```
Server:
  getServerSideProps/getStaticProps → Extract cookies
    ↓
  Chakra Provider → cookieStorageManagerSSR(cookies)
    ↓
  ColorModeScript in _document.js → Prevent FOUC
    ↓
Client (first load):
  Read from cookie → Set initial color mode
    ↓
  User toggles → Update localStorage + cookie
    ↓
Client (subsequent loads):
  Read from localStorage (faster than cookie)
```

### Build-Time vs Runtime

**Build-Time:**
- HTML pre-rendering (SSG pages)
- Image optimization (AVIF, WebP conversion)
- JavaScript minification (SWC)
- CSS extraction (Emotion)
- Bundle splitting (Webpack)

**Runtime:**
- Hydration (React attach to SSR/SSG HTML)
- Client-side routing (Next.js router)
- Lazy loading (Totoro component)
- Animation triggers (Framer Motion)
- 3D rendering (Three.js)

---

## Build & Deployment Pipeline

### Development Workflow

```
Local Development
  ├── npm run dev (Next.js dev server)
  │   ├── Fast Refresh (instant HMR)
  │   ├── Error overlay
  │   └── Source maps
  ├── npm run lint (ESLint check)
  ├── npm run prettier (Code formatting)
  └── npm run analyze (Bundle analysis)
```

### Build Process

```
npm run build
  ↓
┌─────────────────────────────────────────┐
│ 1. SWC Compilation                       │
│    - Transpile JSX → JS                  │
│    - Minify JavaScript                   │
│    - Remove console.* (production)       │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. Image Optimization                    │
│    - Convert to AVIF/WebP                │
│    - Generate responsive sizes           │
│    - Quality 85                          │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. Code Splitting                        │
│    - Three.js chunk (priority 30)        │
│    - Chakra UI chunk (priority 20)       │
│    - Framer Motion chunk (priority 15)   │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. Static Generation                     │
│    - SSG pages → HTML files              │
│    - SSR pages → Server functions        │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 5. Output                                │
│    .next/                                │
│    ├── static/ (JS, CSS chunks)          │
│    ├── server/ (SSR pages)               │
│    └── cache/ (build cache)              │
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
│ - Install dependencies (npm install)     │
│ - Run build (npm run build)              │
│ - Build time: ~5-7 minutes               │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Edge Network Deployment                  │
│ - Global CDN (300+ locations)            │
│ - Atomic deployment (zero downtime)      │
│ - Automatic HTTPS                        │
│ - Cache purge on deploy                  │
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
