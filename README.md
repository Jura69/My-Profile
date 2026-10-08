# Personal Portfolio Website

> Modern, responsive portfolio website built with Vite, React 19, and Tailwind CSS 4, featuring 3D graphics, smooth animations, and comprehensive SEO optimization.

[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38b2ac)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Live Demo

**[View Live Website →](https://jura69.vercel.app)**

---

## Features

### Design & UX
- **Responsive Design** - Mobile-first, optimized for all devices
- **Dark/Light Mode** - New visitors follow the OS `prefers-color-scheme`; the toggle choice persists in localStorage
- **Smooth Animations** - Motion page transitions and GSAP scroll effects
- **3D Graphics** - Original forest spirit "Mầm Đèn" built procedurally in Three.js (painted toon look, no model file), with a 2D fallback
- **Ghibli-Inspired Theme** - Warm, professional aesthetic with a day→night scroll narrative

### Content
- **About & Bio** - Professional introduction
- **Skills & Tech Stack** - Categorized badges with staggered animations
- **Work Experience** - Timeline with animated cards
- **Projects Portfolio** - 16 personal & enterprise projects with detail pages
- **Activities** - University clubs and involvement
- **Audiophile** - Audio equipment showcase
- **Contact & Social** - GitHub, LinkedIn, Facebook, Instagram, Email

### Performance & SEO
- **Prerendered Pages** - Every route is rendered to real HTML at build time (full content + its own title, description, canonical, Open Graph, Twitter Card), then hydrated in the browser; crawlers and no-JS readers never see an empty shell
- **Structured Data & Social Cards** - JSON-LD (Person, Website, Project, Breadcrumb); per-project 1200×630 social cards
- **Agent-Readable (AX)** - A markdown twin of every page (`/works.md`, root `/index.md`, announced via `<link rel="alternate" type="text/markdown">`), plus `/llms.txt` and `/llms-full.txt`
- **Sitemap & Robots** - `sitemap.xml` built from the same route list the pages render, with `lastmod` from git history; `robots.txt` allows search, AI answer and AI training crawlers (policy documented in the file)
- **Core Web Vitals Optimized** - WebP images, route-level code splitting, lazy loading
- **Analytics** - Vercel Analytics + Speed Insights

---

## Tech Stack

**Frontend**
- [Vite 6](https://vitejs.dev/) - Build tool & dev server (SPA + build-time prerender)
- [React 19](https://react.dev/) - UI library
- [React Router 7](https://reactrouter.com/) - Routing (static render at build, client-side after hydration)
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first styling
- [Motion 12](https://motion.dev/) - Component animations
- [GSAP + Lenis](https://gsap.com/) - Scroll animations & smooth scrolling
- [Three.js 0.172](https://threejs.org/) - 3D rendering

**Deployment & Analytics**
- [Vercel](https://vercel.com/) - Hosting (static prerendered pages, clean URLs)
- [@vercel/analytics](https://vercel.com/analytics) - Traffic analytics
- [@vercel/speed-insights](https://vercel.com/docs/speed-insights) - Core Web Vitals

**Dev Tools**
- [TypeScript 5.7](https://www.typescriptlang.org/) - Type safety
- [ESLint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io/) - Code formatting

---

## Quick Start

### Prerequisites
- Node.js 18+
- Yarn 1 (classic) — `yarn.lock` is the canonical lockfile

### Installation

```bash
# Clone repository
git clone https://github.com/Jura69/My-Profile.git
cd My-Profile

# Install dependencies
yarn install

# Run dev server
yarn dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
yarn build
yarn preview
```

### Available Scripts

```bash
yarn dev       # Start Vite dev server at http://localhost:5173
yarn build     # Type check, client build, SSR build, then prerender every route
               #   → dist/<route>.html, 404.html, <route>.md twins, sitemap.xml, llms.txt, llms-full.txt
yarn preview   # Serve dist/ locally with production parity (vercel.json headers, real 404)
yarn lint      # ESLint check (0 errors / 0 warnings expected)
yarn prettier  # Format code with Prettier
yarn analyze   # Bundle size visualization (fetches vite-bundle-visualizer via npx)
```

The dev server client-renders; prerendering and hydration only happen in `yarn build` output, so check those with `yarn build && yarn preview`.

---

## Project Structure

```
/
├── src/
│   ├── main.tsx                 # Browser entry: hydrates prerendered HTML (client render in dev)
│   ├── entry-server.tsx         # Build-time render of one route (used by the prerender)
│   ├── app.tsx                  # AppShell (shared by both entries) + BrowserRouter, lazy routes
│   ├── pages/                   # Route components (all lazy except index)
│   │   ├── index.tsx            # Homepage
│   │   ├── works.tsx            # Projects listing
│   │   ├── works/               # Project detail pages
│   │   ├── activities.tsx       # Activities listing (off-nav, linked from works)
│   │   ├── activities/          # Activity details
│   │   ├── audiophile.tsx       # Audio equipment listing
│   │   └── audiophile/          # Device reviews
│   └── styles/
│       └── global.css           # Tailwind 4 theme tokens + scene keyframes
├── components/                  # Reusable UI (repo root, not src/)
│   ├── ui/                      # Primitives (buttons, cards, reveal, headings)
│   ├── layout/                  # App shell (main, navbar, footer, theme-toggle, not-found)
│   ├── home/                    # Homepage scenes + home-data.ts (skills, experience, socials)
│   ├── works/                   # Cards + works-data.ts (projects, activities, audio gear)
│   ├── scene/                   # Ambient scene system (GSAP, Lenis, particles)
│   ├── icons/                   # Custom kit SVG icons/ornaments (kit-*.tsx) + spirit-mam-den.tsx (navbar logo, hero fallback)
│   ├── spirit/                  # Hero 3D spirit (raw three: stage, painted material, spirit, moss island)
│   ├── seo.tsx                  # Per-page meta + markdown alternate link
│   └── json-ld.tsx              # JSON-LD structured data
├── lib/                         # site.ts (site URL/name), site-routes.ts (route list), use-hydrated.ts, cn.ts
├── providers/                   # Theme provider + use-theme hook
├── scripts/
│   ├── prerender-routes.mjs     # Last build step: route HTML, 404, markdown twins, sitemap, llms files
│   ├── prerender/               # Helpers: HTML→markdown, git content dates, discovery files
│   ├── vite-plugin-preview-vercel-parity.ts # Makes `vite preview` match Vercel (headers, 404)
│   ├── generate-og-images.mjs   # Per-project social cards → public/images/og/
│   └── render-spirit-stills.mjs # Renders Mầm Đèn stills + OG image from the hero scene
├── public/                      # Static assets
│   ├── images/                  # WebP images: works covers, banners, ui textures, spirit stills (+ og-image-spirit.jpg, og/<id>.jpg)
│   ├── apple-touch-icon.png
│   └── robots.txt
├── vite.config.ts               # Vite config (plugins, SSR bundling, vendor chunking)
├── vercel.json                  # Clean URLs, redirects, markdown/llms headers (no SPA rewrite)
├── tsconfig.json                # TypeScript project references
├── index.html                   # HTML template: dev-only fallback meta + pre-paint theme script
└── docs/                        # Project documentation
```

---

## Customization

### Update Personal Info
1. **Profile Photo** - Replace `public/images/loc.webp` (also referenced by `components/json-ld.tsx`)
2. **Projects / Activities / Audio Gear** - Edit `components/works/works-data.ts` (listing pages, prerendered routes, sitemap and llms.txt all derive from it). After adding or changing a project cover, run `node scripts/generate-og-images.mjs`
3. **Skills, Experience, Social Links** - Edit `components/home/home-data.ts`
4. **Meta defaults & site URL** - Site URL and name in `lib/site.ts` (`SITE_ORIGIN`, `SITE_NAME`); meta defaults in `components/seo.tsx`; also the fallback meta in `index.html` and the `Sitemap:` line in `public/robots.txt`

### Change Theme Colors
Edit `src/styles/global.css` (Tailwind 4 theme tokens):
```css
@theme {
  --color-grass-teal: #88ccca;          /* Accent */
  --color-ghibli-forest-green: #7eb77f; /* Ghibli palette tokens */
}
:root { --surface: #f5f0e8; /* … light mode semantic vars */ }
.dark { --surface: #1a1e2e; /* … dark mode overrides */ }
```

### Change the Hero 3D Spirit
The spirit has no model file: it is built in code. Edit `components/spirit/forest-spirit.ts` (shape, motion, gaze), `components/spirit/seed-lantern.ts` (lantern glow/light), `components/spirit/moss-island.ts` (ground), and `components/spirit/spirit-lighting.ts` (day/night light). Keep the 2D art in `components/icons/spirit-mam-den.tsx` in sync — it is the loading placeholder, the no-WebGL fallback and the navbar logo. Then re-render the stills used on the 404 page, the contact section and the OG image: `node scripts/render-spirit-stills.mjs` (needs Chrome; set `CHROME_PATH` off Windows).

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jura69/My-Profile)

1. Push code to GitHub
2. Import to Vercel
3. Auto-deploy on push

### Custom Domain
1. Vercel Dashboard → Project Settings → Domains
2. Add custom domain
3. Update DNS records
4. Update the site URL in `lib/site.ts` (`SITE_ORIGIN`), the `index.html` fallback meta, and the `Sitemap:` line in `public/robots.txt`

---

## Performance

**Optimizations:**
- Prerendered HTML: content and the 2D spirit paint before any JS runs; the hero entrance is pure CSS
- Vite's fast ESM-based dev server & lightning-fast HMR; SWC transpilation
- Route-level code splitting: every page lazy-loads its own ~2KB chunk (homepage stays eager for LCP); app chunk is ~52KB
- Vendor chunking: React, GSAP, Three.js, Motion, react-icons isolated — app edits don't invalidate cached vendor bytes
- Tailwind CSS 4 JIT compiler (minimal CSS output)
- GSAP ScrollTrigger + Lenis confined to scene components (zero re-renders on scroll)
- Hero 3D spirit is procedural (no model download) and lazy-loaded: three.js and the stage stream in after hydration, and its render loop pauses off-screen or in a hidden tab
- WebP images (max 1200px), lazy loading and responsive sizing
- Vercel immutable caching for hashed build assets

---

## Documentation

Comprehensive docs in `/docs`:
- [Project Overview & PDR](docs/project-overview-pdr.md)
- [Codebase Summary](docs/codebase-summary.md)
- [Code Standards](docs/code-standards.md)
- [System Architecture](docs/system-architecture.md)
- [Project Roadmap](docs/project-roadmap.md)

---

## Contributing

Contributions welcome!

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file

---

## Credits

- **Design Inspiration** - [Takuya Matsuyama](https://www.craftz.dog/)
- **3D Spirit** - "Mầm Đèn", an original character built for this site (no third-party model)
- **Icons** - custom kit SVGs; tech and social brand logos from [React Icons](https://react-icons.github.io/react-icons/)
- **Font** - [M PLUS Rounded 1c](https://fonts.google.com/specimen/M+PLUS+Rounded+1c)

---

## Author

**Trương Tuấn Lộc (Jura69)**

- GitHub: [@Jura69](https://github.com/Jura69)
- LinkedIn: [Trương Tuấn Lộc](https://www.linkedin.com/in/tuấn-lộc-b24b391ab/)
- Website: [Portfolio](https://jura69.vercel.app)
- Email: Loctruongtuan@gmail.com

---

<div align="center">

**[Live Demo](https://jura69.vercel.app)** | **[Report Bug](https://github.com/Jura69/My-Profile/issues)** | **[Request Feature](https://github.com/Jura69/My-Profile/issues)**

Made with ❤️ using Vite, React 19, and Tailwind CSS 4

</div>
