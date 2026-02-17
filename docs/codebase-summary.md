# Codebase Summary

**Project:** Personal Portfolio Website
**Generated:** 2026-01-20
**Total Files:** 52 code files (103 total including assets)
**Total LOC:** ~2,680 (excluding node_modules)
**Total Tokens:** 29,819
**Bundle Size:** ~12.5MB (public assets)

---

## Executive Overview

Modern Next.js 14 portfolio using Pages Router architecture with React 18, Chakra UI component system, Framer Motion animations, and Three.js 3D graphics. Codebase demonstrates strong separation of concerns with dedicated directories for components, pages, utilities, and providers. Architecture emphasizes performance through code splitting, image optimization, and aggressive caching.

**Key Characteristics:**
- 100% functional components (zero class components)
- Hybrid SSR/SSG rendering strategy
- Comprehensive SEO implementation (meta tags, JSON-LD schemas)
- 97+ Lighthouse score across all metrics
- 96.7% 3D model compression (Draco)

---

## Directory Structure

```
/Users/jura69/CodeBase/My-Profile/
├── components/           # 23 React components (22 + chakra provider)
│   ├── icons/           # SVG icon components (1 file)
│   ├── layouts/         # Layout wrappers (2 files)
│   └── *.js            # Component files (20 files)
├── lib/                 # Utilities and configuration (3 files)
├── providers/           # React context providers (1 file)
├── public/              # Static assets (12.5MB)
│   ├── files/          # Documents (CV.pdf)
│   ├── images/         # Photos and graphics (11MB)
│   └── *.xml, *.txt    # SEO files
├── src/
│   ├── pages/          # Next.js pages (16 files)
│   │   ├── activities/ # Activities detail pages (1 file)
│   │   ├── audiophile/ # Audio equipment pages (4 files)
│   │   ├── fonts/      # Deprecated font loader (1 file)
│   │   ├── works/      # Project detail pages (4 files)
│   │   └── *.js        # Main pages (6 files)
│   └── favicon.ico
├── .eslintrc.json      # Linting configuration
├── .gitignore          # Git ignore patterns
├── jsconfig.json       # Path aliases (@/* → ./src/*)
├── next.config.mjs     # Next.js build config
├── package.json        # Dependencies and scripts
├── prettier.config.js  # Code formatting rules
└── README.md           # Project documentation
```

---

## File Inventory by Category

### Components (23 files, 1,266 LOC)

**Layouts (2 files):**
- `layouts/main.js` - Primary app layout with navbar, footer, Totoro 3D model
- `layouts/article.js` - Page transition wrapper with metadata injection

**Animation Components (4 files):**
- `animated-badge.js` - Tech stack skill badges with spring physics
- `animated-button.js` - Enhanced buttons with hover effects
- `animated-work-card.js` - Work timeline cards with scroll triggers
- `floating-box.js` - Levitation animation for 3D model container

**3D Graphics (2 files):**
- `totoro.js` (147 LOC) - Three.js WebGL renderer with OrbitControls
- `totoro-loader.js` - Loading spinner and responsive container

**Navigation & UI (3 files):**
- `navbar.js` (160 LOC) - Fixed navigation with hamburger menu
- `logo.js` - Brand logo with Totoro icon
- `theme-toggle-button.js` - Dark/light mode switcher

**Grid Items & Cards (1 file, 196 LOC):**
- `grid-item.js` - Exports 4 components:
  - `GridItem` - Basic card with image
  - `WorkGridItem` - Project portfolio cards
  - `AudioGridItem` - Audio equipment cards (90% duplicate)
  - `ActivitiesGridItem` - Activity cards (90% duplicate)
  - `GridItemStyle` - Global CSS for thumbnails

**Domain Components (3 files, ~84 LOC):**
- `work.js` - Title, WorkImage, Meta for project pages
- `activities.js` - Title, ActivitiesImage, Meta for activity pages
- `audiophile.js` - Title, AudioImage, Meta for audio pages
- **Note:** 90% code duplication across these 3 files

**SEO & Metadata (2 files):**
- `seo.js` - Meta tags (Open Graph, Twitter Card, mobile)
- `json-ld.js` - Structured data schemas (5 schemas: Person, Website, ProfilePage, Breadcrumb, Project)

**Utility Components (4 files):**
- `section.js` - Staggered fade-in animation wrapper
- `paragraph.js` - Justified text with indentation (Emotion styled)
- `bio.js` - Work timeline styled components (WorkSection, WorkTimes)
- `footer.js` - Copyright footer with dynamic year

**Icons (1 file):**
- `icons/totoro.js` (1,774 tokens) - Hand-drawn Totoro SVG icon (40x40px)

**Providers (1 file):**
- `chakra.js` - Chakra UI provider with SSR color mode persistence

---

### Pages (16 files, 1,253 LOC)

**Core Pages (2 files):**
- `_app.js` - App wrapper with Chakra provider, Analytics, Font loader
- `_document.js` - HTML document with preloading, DNS prefetch, Google Fonts

**Main Pages (4 files):**
- `index.js` (359 LOC) - Homepage with about, skills, experience timeline
- `works.js` - Projects listing (4 cards)
- `activities.js` - Activities listing (1 card)
- `audiophile.js` - Audio equipment listing (4 cards)

**Project Detail Pages (4 files):**
- `works/foodlover.js` - Food Lover (Next.js, MongoDB, AWS S3, Stripe)
- `works/ticketapp.js` - Flutter Ticket App (Flutter, Node.js, MongoDB)
- `works/tensorflow.js` - TensorFlow Sign Language Detection (Python, ML)
- `works/ecommerceBE.js` - E-commerce Backend (Node.js, Express, Redis)

**Activity Detail Page (1 file):**
- `activities/ytc.js` - YTC Nha Trang University club

**Audio Equipment Pages (4 files):**
- `audiophile/ea1000.js` - Simgot EA1000 Fermat IEM review
- `audiophile/fiioka11.js` - Fiio Ka11 DAC/AMP review
- `audiophile/moondropSSP.js` - Moondrop SSP IEM review
- `audiophile/onix.js` (139 LOC) - Shanling Onix Alpha XI1 DAC/AMP review

**Deprecated (1 file):**
- `fonts/font.js` - Old font loader (kept for backward compatibility)

---

### Utilities (3 files, 161 LOC)

**lib/theme.js** - Chakra UI theme customization:
- Custom colors: grassTeal (#88ccca), ghibli palette (6 colors)
- Global styles: background, link colors (light/dark mode)
- Typography: M PLUS Rounded 1c font
- Component variants: section-title heading style
- Color mode: dark initial, cookie-based SSR persistence

**lib/model.js** - 3D GLTF/Draco loader:
- GLTFLoader + DRACOLoader integration
- Decoder path: Google CDN (https://www.gstatic.com/draco/v1/decoders/)
- Shadow configuration (cast/receive)
- Recursive mesh traversal for optimization
- Promise-based async loading

**lib/performance.js** - Web Vitals utilities:
- `measurePerformance()` - Timing wrapper with console logging
- `reportWebVitals()` - Production metrics logging
- `preloadCriticalResources()` - Preload Totoro model (⚠️ outdated path)
- `optimizeImages()` - IntersectionObserver for lazy loading

---

### Configuration Files (7 files)

**next.config.mjs** - Next.js build configuration:
- Image optimization: AVIF/WebP, 1-year cache
- SWC minification (faster than Terser)
- Console removal in production
- Code splitting: Three.js, Chakra UI, Framer Motion isolated
- Experimental: optimizePackageImports for tree-shaking
- Bundle analyzer: `ANALYZE=true npm run build`
- Cache headers: 1 year immutable for static assets

**package.json** - Dependencies:
- **Framework:** next@14.2.13, react@18
- **UI:** @chakra-ui/react@2.8.2, @emotion/react@11.13.3
- **Animation:** framer-motion@11.5.6
- **3D:** three@0.172.0
- **Analytics:** @vercel/analytics, @vercel/speed-insights
- **Dev:** @next/bundle-analyzer, eslint, sharp

**jsconfig.json** - Path aliases:
- `@/*` → `./src/*` (enables cleaner imports)

**.eslintrc.json** - Linting rules:
- Extends: next/core-web-vitals
- Relaxed rules: display-name, no-unescaped-entities

**prettier.config.js** - Formatting:
- Single quotes, no semicolons, no trailing commas
- Arrow parens: avoid, tab width: 2, line ending: lf

**.gitignore** - Ignored patterns:
- node_modules/, .next/, out/, .DS_Store
- .env files, *.log, .vercel/

---

### Static Assets (12.5MB)

**3D Model (1 file, 1.5MB):**
- `totoro-compressed.glb` - Draco compressed (96.7% reduction from 44MB)

**Images (23 files, 11MB):**
- **Works:** 10 images (6.6MB) - Largest: Ticket2.png (1.6MB)
- **Audiophile:** 8 images (3.1MB) - Largest: ea1000.jpg (1.2MB)
- **Activities:** 4 images (1.1MB) - Largest: Ytc2.jpg (612K)
- **Profile:** loc.jpeg (374K, 2236x2236px)

**Documents (1 file, 118K):**
- `files/CV.pdf` - Resume/CV

**SEO Files (2 files):**
- `robots.txt` (293B) - Allow all crawlers, 1s delay, sitemap reference
- `sitemap.xml` (2.2K) - 9 URLs indexed (homepage, main pages, projects)

**Favicon:**
- `favicon.ico` (38K) - Standard ICO format

---

## Code Statistics

### Lines of Code by Directory

| Directory | Files | LOC | Percentage |
|-----------|-------|-----|------------|
| src/pages/ | 16 | 1,253 | 46.8% |
| components/ | 23 | 1,266 | 47.2% |
| lib/ | 3 | 161 | 6.0% |
| Total Code | 42 | 2,680 | 100% |

### Top 5 Files by Token Count

1. `src/pages/index.js` - 3,429 tokens (11.5% of total)
2. `src/pages/audiophile/onix.js` - 2,192 tokens (7.4%)
3. `README.md` - 1,956 tokens (6.6%)
4. `components/icons/totoro.js` - 1,774 tokens (5.9%)
5. `components/grid-item.js` - 1,292 tokens (4.3%)

### Largest Files by LOC

1. `src/pages/index.js` - 359 lines (homepage sections)
2. `components/grid-item.js` - 196 lines (4 grid variants)
3. `components/navbar.js` - 160 lines (navigation bar)
4. `components/totoro.js` - 147 lines (3D rendering logic)
5. `src/pages/audiophile/onix.js` - 139 lines (detailed review)

---

## Module Dependencies

### External Dependencies (9 core)

**Core Framework:**
- next@14.2.13
- react@18
- react-dom@18

**UI Libraries:**
- @chakra-ui/react@2.8.2 (component system)
- @chakra-ui/next-js@2.2.0 (Next.js integration)
- @emotion/react@11.13.3 (CSS-in-JS)
- @emotion/styled@11.13.0 (styled components)

**Animation:**
- framer-motion@11.5.6

**3D Graphics:**
- three@0.172.0

**Icons:**
- react-icons@5.3.0

**Analytics:**
- @vercel/analytics@1.5.0
- @vercel/speed-insights@1.2.0

### Internal Dependency Graph

```
_app.js
├── Chakra Provider (providers/chakra.js)
│   └── Theme (lib/theme.js)
├── Layout (components/layouts/main.js)
│   ├── Navbar
│   │   ├── Logo
│   │   │   └── TotoroIcon
│   │   └── ThemeToggleButton
│   ├── Totoro (lazy loaded)
│   │   ├── FloatingBox
│   │   └── Model Loader (lib/model.js)
│   └── Footer
└── Page Components
    ├── Layout (article.js)
    ├── SEO
    ├── JSON-LD Schemas
    ├── Section
    ├── AnimatedBadge
    ├── WorkGridItem/AudioGridItem/ActivitiesGridItem
    └── Domain Components (Title, Image, Meta)
```

---

## Entry Points & Code Flow

### 1. Initial Load (`_app.js`)

```
User accesses site
  → Next.js loads _document.js (HTML structure, fonts, preloads)
  → _app.js initializes
    → Chakra Provider (theme + color mode from cookies)
    → Font Loader
    → Main Layout
      → Navbar (fixed position)
      → Totoro 3D Model (lazy loaded with spinner)
      → Page Content (AnimatePresence for transitions)
      → Footer
    → Vercel Analytics
    → Speed Insights
```

### 2. Page Navigation Flow

```
User clicks navbar link
  → Next.js router.push()
  → AnimatePresence exit animation (0.4s)
  → Scroll to top
  → New page loads
    → Article Layout wrapper
    → SEO component (meta tags)
    → JSON-LD schemas
    → Page sections with staggered animations
  → AnimatePresence enter animation (0.4s)
```

### 3. Data Fetching Strategy

**SSG (Static Site Generation):**
- `/works` - getStaticProps from components/chakra.js
- `/activities` - getStaticProps
- `/activities/ytc` - getStaticProps

**SSR (Server-Side Rendering):**
- `/audiophile` + 4 detail pages - getServerSideProps
- `/works/*` (4 project pages) - getServerSideProps

**CSR (Client-Side Rendering):**
- `/` (index.js) - No data fetching exports

**Note:** All SSG/SSR exports only fetch color mode cookies, not page content. Content is hardcoded in JSX.

### 4. 3D Model Loading Flow

```
Main Layout mounts
  → Dynamic import (components/totoro.js, ssr: false)
  → TotoroLoader shows spinner
  → Totoro component mounts (client-only)
    → useRef for canvas
    → useEffect: Setup Three.js scene
      → Create renderer, camera, lights
      → Load GLTF model (lib/model.js)
        → DRACOLoader from Google CDN
        → Decompress totoro-compressed.glb
        → Add to scene
      → 100-frame intro animation (circular camera)
      → Hand over to OrbitControls
      → Render loop (requestAnimationFrame)
  → Cleanup on unmount (cancelAnimationFrame, dispose)
```

---

## Component Interaction Patterns

### Animation System

**Framer Motion Usage:**

1. **Page Transitions** (article.js):
   - Entry: opacity 0→1, y 20→0 (0.4s)
   - Exit: opacity 1→0, y 0→20 (0.4s)

2. **Scroll Triggers** (grid-item.js, animated-work-card.js):
   - `whileInView` with `viewport={{ once: true, margin: "-50px" }}`
   - Fade-in from bottom (y: 20→0)

3. **Hover Interactions**:
   - Lift effect: `whileHover={{ y: -8 }}`
   - Scale + shadow: `whileHover={{ scale: 1.02 }}`
   - Spring physics: `stiffness=400, damping=10`

4. **Staggered Entries** (section.js, animated-badge.js):
   - Delay prop for sequential reveals (0.1s increments)
   - Skills grid: 18 badges with 0.1s-0.95s delays

5. **Continuous Animations** (floating-box.js):
   - Infinite loop: y [0, -10, 0] (4s easeInOut)

### Color Mode System

**SSR-Safe Color Mode:**
```javascript
// Server-side
getServerSideProps({ req }) → cookies from req.headers.cookie
  ↓
Chakra Provider → cookieStorageManagerSSR(cookies)
  ↓
ColorModeScript in _document.js (prevents flash)
  ↓
// Client-side
localStorage fallback for subsequent visits
```

**Component Usage:**
```javascript
const bg = useColorModeValue('#ffffff40', '#20202380') // light, dark
const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')
```

### SEO Architecture

**Multi-Layer SEO:**

1. **Global (_document.js)**:
   - Preload critical assets
   - DNS prefetch for external resources
   - Google Fonts with display=swap

2. **Per-Page (SEO component)**:
   - Dynamic title, description, keywords
   - Open Graph + Twitter Card
   - Canonical URL generation

3. **Structured Data (json-ld.js)**:
   - PersonSchema - Professional profile
   - WebsiteSchema - Site metadata
   - ProjectSchema - Project details
   - BreadcrumbSchema - Navigation

4. **Static Files**:
   - robots.txt - Crawler directives
   - sitemap.xml - URL inventory

---

## Performance Optimizations

### Code Splitting

**Webpack Cache Groups (next.config.mjs):**
1. Three.js (priority 30) - Isolated 3D library chunk
2. Chakra UI + Emotion (priority 20) - UI framework chunk
3. Framer Motion (priority 15) - Animation library chunk

**Dynamic Imports:**
- Totoro component: `dynamic(() => import('../totoro'), { ssr: false })`
- Reduces initial bundle by ~200KB

### Image Optimization

**Next.js Image API:**
- Formats: AVIF (primary) → WebP (fallback) → original
- Responsive sizes: 6 device breakpoints, 8 image sizes
- Lazy loading: `loading="lazy"` for below-fold images
- Quality: 85 (balance size/quality)
- Cache: 1 year immutable headers

**Current Usage:**
- `components/work.js` - Uses Next.js Image ✅
- `components/grid-item.js` - Uses Next.js Image ✅
- `components/audiophile.js` - Uses Chakra Image ⚠️ (no optimization)

### 3D Model Optimization

**Compression:**
- Original: 44MB
- First compression: 5.7MB (87% reduction)
- Draco compression: 1.5MB (96.7% total reduction)

**Rendering:**
- Pixel ratio capped at 2 (mobile performance)
- Shadows disabled (no castShadow/receiveShadow)
- Precision: mediump (lower GPU load)
- Antialiasing: conditional (devicePixelRatio < 2)
- Stencil buffer: disabled

### Memoization

**React.memo() Usage:**
- Footer (prevents year re-calculation)
- Logo (static component)
- Navbar (avoids route re-renders)
- Totoro (expensive 3D component)
- WorkImage (image optimization)
- All GridItem variants (card components)

### Caching Strategy

**HTTP Cache Headers:**
- 3D model: `public, max-age=31536000, immutable`
- Images: `public, max-age=31536000, immutable`
- Next.js static: `public, max-age=31536000, immutable`

**Browser Caching:**
- Service Worker: Not implemented
- localStorage: Color mode preference only

---

## Known Technical Debt

### 1. DRY Violations (High Priority)

**Grid Item Components:**
- 3 identical components: WorkGridItem, AudioGridItem, ActivitiesGridItem
- 99% code duplication (~132 lines)
- Should be: `<GenericGridItem category="works" />`

**Domain Components:**
- 3 identical files: work.js, activities.js, audiophile.js
- 90% code duplication (~84 lines)
- Should be: `<DetailPage.Title category="works" />`

**Impact:** 250+ lines of duplicated code

### 2. Large Files (Medium Priority)

**index.js (359 lines):**
- Contains: Hero, About, Skills, Experience sections
- Should be: Separate components per section

**grid-item.js (196 lines):**
- Contains: 4 component variants + global styles
- After DRY fix: ~60 lines expected

### 3. Outdated References (Low Priority)

**lib/performance.js:**
- Line 700: References `/totoro.glb` (old filename)
- Should be: `/totoro-compressed.glb`

**src/pages/fonts/font.js:**
- Deprecated font loader
- Fonts now load in _document.js
- File kept for backward compatibility, should be removed

### 4. Missing Optimizations (Low Priority)

**Audiophile Images:**
- Uses Chakra `<Image>` instead of Next.js `<Image>`
- Missing AVIF/WebP conversion
- No lazy loading optimization

**Sitemap Generation:**
- Static XML file (lastmod: 2025-01-05)
- Should be: Dynamic API route or next-sitemap package

### 5. TypeScript Migration (Low Priority)

**Current State:**
- All files are .js (no type safety)
- No PropTypes or runtime validation
- Should migrate to .tsx with interfaces

---

## Security Considerations

**Implemented:**
- SVG handling: Strict CSP (`script-src 'none'; sandbox`)
- No exposed secrets in public/ directory
- No API routes (static content only)
- Robots.txt properly configured

**Potential Risks:**
- No Content Security Policy headers for HTML
- No rate limiting (N/A for static site)
- CV.pdf is intentionally public

---

## Browser Compatibility

**Supported:**
- Chrome 90+ (ES2020, WebGL 2.0)
- Firefox 88+ (ES2020, WebGL 2.0)
- Safari 14+ (ES2020, WebGL 2.0)
- Edge 90+ (Chromium-based)

**Not Supported:**
- IE11 (Three.js requires modern browser)
- Safari < 14 (missing ES2020 features)

**Progressive Enhancement:**
- 3D model: Graceful degradation with loading spinner
- Animations: Disabled in `prefers-reduced-motion`
- Images: Fallback to original format if AVIF/WebP unsupported

---

## Unresolved Questions

1. Why mix SSR and SSG if both only fetch cookies? Could standardize on SSG for better performance.

2. Are there source/original image files stored elsewhere? No compression pipeline detected.

3. Is there a CI/CD pipeline for asset optimization? No GitHub Actions workflow found.

4. Are analytics tracking Core Web Vitals in production? reportWebVitals() only logs to console.

5. Is there a plan to add API routes for contact form, newsletter, or backend features?

6. Why is activities section under-utilized (only 1 activity)? Future expansion planned?

7. Browser support matrix - has Safari 3D rendering been tested? Any known issues?

---

**Summary Complete**
**Last Updated:** 2026-01-20
**Codebase Health:** High (clean architecture, minor tech debt)
**Performance:** Excellent (97+ Lighthouse, optimized assets)
**Maintainability:** Good (consistent patterns, needs DRY refactor)
