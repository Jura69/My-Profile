# Personal Portfolio Website

> Modern, responsive portfolio website built with Vite, React 19, and Tailwind CSS 4, featuring 3D graphics, smooth animations, and comprehensive SEO optimization.

[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38b2ac)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Live Demo

**[View Live Website →](https://my-profile-jura69.vercel.app)**

---

## Features

### Design & UX
- **Responsive Design** - Mobile-first, optimized for all devices
- **Dark/Light Mode** - New visitors follow the OS `prefers-color-scheme`; the toggle choice persists in localStorage
- **Smooth Animations** - Motion page transitions and GSAP scroll effects
- **3D Graphics** - Interactive Totoro character using Three.js (96.7% compressed)
- **Ghibli-Inspired Theme** - Warm, professional aesthetic with a day→night scroll narrative

### Content
- **About & Bio** - Professional introduction
- **Skills & Tech Stack** - Categorized badges with staggered animations
- **Work Experience** - Timeline with animated cards
- **Projects Portfolio** - 4 featured projects with detail pages
- **Activities** - University clubs and involvement
- **Audiophile** - Audio equipment showcase
- **Contact & Social** - GitHub, LinkedIn, Facebook, Instagram, Email

### Performance & SEO
- **Full SEO Optimization** - Static OG/description fallback for no-JS crawlers + per-page meta (React 19 native), Twitter Card, JSON-LD
- **Core Web Vitals Optimized** - WebP images, route-level code splitting, lazy loading
- **Analytics** - Vercel Analytics + Speed Insights
- **Sitemap & Robots** - `sitemap.xml` generated at build time from the same data the pages render (no drift)

---

## Tech Stack

**Frontend**
- [Vite 6](https://vitejs.dev/) - Build tool & dev server (SPA)
- [React 19](https://react.dev/) - UI library
- [React Router 7](https://reactrouter.com/) - Client-side routing
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first styling
- [Motion 12](https://motion.dev/) - Component animations
- [GSAP + Lenis](https://gsap.com/) - Scroll animations & smooth scrolling
- [Three.js 0.172](https://threejs.org/) - 3D rendering

**Deployment & Analytics**
- [Vercel](https://vercel.com/) - Hosting (static SPA)
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
yarn build     # TypeScript check + Vite production build (also emits dist/sitemap.xml)
yarn preview   # Preview production build locally
yarn lint      # ESLint check (0 errors / 0 warnings expected)
yarn prettier  # Format code with Prettier
yarn analyze   # Bundle size visualization (fetches vite-bundle-visualizer via npx)
```

---

## Project Structure

```
/
├── src/
│   ├── main.tsx                 # Entry point (Vite + React 19)
│   ├── app.tsx                  # App root: BrowserRouter, lazy routes, Suspense
│   ├── pages/                   # Route components (all lazy except index)
│   │   ├── index.tsx            # Homepage
│   │   ├── works.tsx            # Projects listing
│   │   ├── works/               # Project detail pages
│   │   ├── activities.tsx       # Activities listing (off-nav, linked from works)
│   │   ├── activities/          # Activity details
│   │   ├── audiophile.tsx       # Audio equipment listing
│   │   └── audiophile/          # Device reviews
│   ├── styles/
│   │   └── global.css           # Tailwind 4 theme tokens + scene keyframes
│   └── three-modules.d.ts       # Ambient types for three example modules
├── components/                  # Reusable UI (repo root, not src/)
│   ├── ui/                      # Primitives (buttons, cards, reveal, headings)
│   ├── layout/                  # App shell (main, navbar, footer, theme-toggle, not-found)
│   ├── home/                    # Homepage scenes + home-data.ts (skills, experience, socials)
│   ├── works/                   # Cards + works-data.ts (projects, activities, audio gear)
│   ├── scene/                   # Ambient scene system (GSAP, Lenis, particles)
│   ├── icons/                   # Inline SVG icons
│   ├── seo.tsx                  # Per-page meta (React 19 hoists to <head>)
│   ├── json-ld.tsx              # JSON-LD structured data
│   └── totoro.tsx               # Three.js Totoro viewer
├── lib/                         # Utilities (cn.ts, model.ts GLTF/Draco loader)
├── providers/                   # Theme provider + use-theme hook
├── scripts/
│   └── vite-plugin-sitemap.ts   # Emits dist/sitemap.xml from works-data at build
├── public/                      # Static assets
│   ├── images/                  # WebP project images (+ og-image.jpg)
│   ├── apple-touch-icon.png
│   ├── totoro-compressed.glb    # Draco-compressed 3D model
│   └── robots.txt
├── vite.config.ts               # Vite config (plugins, vendor chunking)
├── tsconfig.json                # TypeScript project references
├── index.html                   # HTML entry: static OG meta + pre-paint theme script
└── docs/                        # Project documentation
```

---

## Customization

### Update Personal Info
1. **Profile Photo** - Replace `public/images/loc.webp` (also referenced by `components/json-ld.tsx`)
2. **Projects / Activities / Audio Gear** - Edit `components/works/works-data.ts` (listing pages and the build-time sitemap both derive from it)
3. **Skills, Experience, Social Links** - Edit `components/home/home-data.ts`
4. **Meta defaults & site URL** - `components/seo.tsx`, the static fallback meta in `index.html`, and `ORIGIN` in `scripts/vite-plugin-sitemap.ts`

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

### Replace 3D Model
Replace `public/totoro-compressed.glb` with another Draco-compressed GLTF model, update `components/totoro.tsx`

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
4. Update the site URL in `components/seo.tsx`, `index.html` static meta, and `ORIGIN` in `scripts/vite-plugin-sitemap.ts`

---

## Performance

**Optimizations:**
- Vite's fast ESM-based dev server & lightning-fast HMR; SWC transpilation
- Route-level code splitting: every page lazy-loads its own ~2KB chunk (homepage stays eager for LCP); app chunk is ~52KB
- Vendor chunking: React, GSAP, Three.js, Motion, react-icons isolated — app edits don't invalidate cached vendor bytes
- Tailwind CSS 4 JIT compiler (minimal CSS output)
- GSAP ScrollTrigger + Lenis confined to scene components (zero re-renders on scroll)
- Draco compression (3D model: 44MB → 1.5MB, 96.7% reduction)
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
- **3D Model** - Totoro (open-source)
- **Icons** - [React Icons](https://react-icons.github.io/react-icons/)
- **Font** - [M PLUS Rounded 1c](https://fonts.google.com/specimen/M+PLUS+Rounded+1c)

---

## Author

**Trương Tuấn Lộc (Jura69)**

- GitHub: [@Jura69](https://github.com/Jura69)
- LinkedIn: [Trương Tuấn Lộc](https://www.linkedin.com/in/tuấn-lộc-b24b391ab/)
- Website: [Portfolio](https://my-profile-jura69.vercel.app)
- Email: Loctruongtuan@gmail.com

---

<div align="center">

**[Live Demo](https://my-profile-jura69.vercel.app)** | **[Report Bug](https://github.com/Jura69/My-Profile/issues)** | **[Request Feature](https://github.com/Jura69/My-Profile/issues)**

Made with ❤️ using Vite, React 19, and Tailwind CSS 4

</div>
