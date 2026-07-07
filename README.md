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
- **Dark/Light Mode** - Smooth theme switching with SSR persistence
- **Smooth Animations** - Framer Motion page transitions and scroll effects
- **3D Graphics** - Interactive Totoro character using Three.js (96.7% compressed)
- **Ghibli-Inspired Theme** - Warm, professional aesthetic

### Content
- **About & Bio** - Professional introduction
- **Skills & Tech Stack** - Categorized badges with staggered animations
- **Work Experience** - Timeline with animated cards
- **Projects Portfolio** - 4 featured projects with detail pages
- **Activities** - University clubs and involvement
- **Audiophile** - Audio equipment showcase
- **Contact & Social** - GitHub, LinkedIn, Facebook, Instagram, Email

### Performance & SEO
- **Full SEO Optimization** - Meta tags, Open Graph, Twitter Card, JSON-LD
- **97+ Lighthouse Score** - Performance, Accessibility, Best Practices, SEO
- **Core Web Vitals Optimized** - AVIF/WebP images, code splitting, lazy loading
- **Analytics** - Vercel Analytics + Speed Insights
- **Sitemap & Robots** - Properly configured for search engines

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
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Jura69/My-Profile.git
cd My-Profile

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

### Available Scripts

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview production build locally
npm run lint      # ESLint check
npm run prettier  # Format code with Prettier
npm run analyze   # Bundle size visualization
```

---

## Project Structure

```
/
├── src/
│   ├── main.tsx                 # Entry point (Vite + React 19)
│   ├── app.tsx                  # App root with React Router (BrowserRouter)
│   ├── pages/                   # Route components
│   │   ├── home.tsx             # Homepage
│   │   ├── works.tsx            # Projects listing
│   │   ├── works/               # Project detail pages
│   │   ├── activities.tsx       # Activities listing
│   │   ├── activities/          # Activity details
│   │   ├── audiophile.tsx       # Audio equipment listing
│   │   └── audiophile/          # Device reviews
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Primitive components (button, badge, card, etc.)
│   │   ├── layout/              # Layout wrappers (main, detail-page)
│   │   ├── home/                # Homepage sections (scenes, cards, etc.)
│   │   ├── works/               # Works section components
│   │   ├── scene/               # 3D scene components (GSAP, Lenis)
│   │   ├── navbar.tsx           # Navigation bar
│   │   ├── footer.tsx           # Footer
│   │   ├── seo.tsx              # SEO meta tags
│   │   ├── json-ld.tsx          # JSON-LD structured data
│   │   └── theme-toggle.tsx     # Dark/light mode toggle
│   ├── lib/                     # Utilities
│   │   ├── cn.ts                # clsx + tailwind-merge
│   │   ├── model.ts             # GLTF/Draco loader
│   │   └── constants.ts         # App constants
│   ├── providers/               # React Context providers
│   │   └── theme.tsx            # Theme context (dark/light)
│   ├── styles/                  # Global styles
│   │   └── global.css           # Tailwind + design tokens + GSAP animations
│   ├── data/                    # Data files
│   │   └── works-data.ts        # Projects, activities, audio data
│   └── types/                   # TypeScript types
├── public/                      # Static assets (~2.5MB)
│   ├── images/                  # Optimized project images
│   ├── totoro.glb               # 3D model (compressed)
│   ├── sitemap.xml
│   └── robots.txt
├── vite.config.ts              # Vite build config
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
├── index.html                  # HTML entry point
└── docs/                       # Project documentation
```

---

## Customization

### Update Personal Info
1. **Profile Photo** - Replace `/public/images/loc.jpeg`
2. **Projects** - Edit `src/data/works-data.ts`
3. **Activities** - Add/edit in `src/data/works-data.ts`
4. **Audio Reviews** - Add/edit in `src/data/works-data.ts`
5. **Social Links** - Update in `src/pages/home.tsx`

### Change Theme Colors
Edit `src/styles/global.css` (Tailwind 4 theme variables):
```css
@theme {
  --color-primary: #88ccca;      /* Accent color */
  --color-primary-dark: #7eb77f;  /* Dark variant */
  /* Update semantic color vars for light/dark modes */
}
```

### Replace 3D Model
Replace `public/totoro.glb` with another GLTF model, update `src/components/scene/totoro.tsx`

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
4. Update `siteUrl` in `components/seo.js`

---

## Performance

- **Lighthouse Score**: 97+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized (LCP, FID, CLS)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s

**Optimizations:**
- Vite's fast ESM-based dev server & lightning-fast HMR
- SWC transpilation (Rust-based, much faster than Babel)
- Code splitting: React, GSAP, Three.js, Motion isolated chunks
- Tailwind CSS 4 JIT compiler (minimal CSS output)
- GSAP ScrollTrigger + Lenis confined to scene components (zero re-renders on scroll)
- Draco compression (3D model: 44MB → 1.5MB, 96.7% reduction)
- Image lazy loading and responsive sizing
- 1-year cache headers on static assets

---

## Documentation

Comprehensive docs in `/docs`:
- [Project Overview & PDR](docs/project-overview-pdr.md)
- [Codebase Summary](docs/codebase-summary.md)
- [Code Standards](docs/code-standards.md)
- [System Architecture](docs/system-architecture.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Design Guidelines](docs/design-guidelines.md)
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
