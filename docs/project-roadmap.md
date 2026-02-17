# Project Roadmap & Technical Debt

**Project:** Personal Portfolio Website
**Current Version:** v1.0.0
**Last Updated:** 2026-01-20
**Status:** Production (Live)

---

## Current Project Status

### Completion Summary

**Overall Progress:** 85% Complete (MVP Achieved)

```
Feature Categories:
├── Core Website (100%) ✅
│   ├── Homepage with about, skills, experience
│   ├── Project portfolio (4 projects)
│   ├── Activities section (1 activity)
│   └── Audiophile reviews (4 reviews)
├── Performance (95%) ✅
│   ├── Lighthouse 97+ scores
│   ├── 3D model compression (96.7%)
│   ├── Image optimization (AVIF/WebP)
│   └── Code splitting implemented
├── SEO (100%) ✅
│   ├── Meta tags comprehensive
│   ├── JSON-LD schemas (5 types)
│   ├── Sitemap and robots.txt
│   └── Mobile-optimized
├── Design (100%) ✅
│   ├── Dark/light mode
│   ├── Responsive layout
│   ├── 3D Totoro character
│   └── Smooth animations
└── Future Enhancements (0%) 🔨
    ├── Blog section
    ├── Contact form
    ├── CMS integration
    └── TypeScript migration
```

### Implemented Features

**Core Functionality ✅**
- [x] Responsive homepage with animated sections
- [x] Skills showcase (18 badges, 3 categories)
- [x] Work experience timeline (3 positions + education)
- [x] 4 project detail pages with GitHub links
- [x] 1 activity page (YTC club)
- [x] 4 audio equipment reviews
- [x] CV download (PDF)
- [x] Social media links (5 platforms)
- [x] Fixed navigation with hamburger menu (mobile)
- [x] Dark/light mode toggle with SSR persistence

**Performance ✅**
- [x] 97+ Lighthouse scores (all metrics)
- [x] AVIF/WebP image formats
- [x] Lazy loading for images
- [x] 3D model Draco compression (96.7%)
- [x] Code splitting (Three.js, Chakra UI, Framer Motion)
- [x] SWC minification
- [x] 1-year caching for static assets

**SEO ✅**
- [x] Comprehensive meta tags
- [x] Open Graph + Twitter Card
- [x] 5 JSON-LD schema types
- [x] Canonical URLs
- [x] robots.txt and sitemap.xml
- [x] Mobile viewport optimization

**Design ✅**
- [x] Ghibli-inspired color palette
- [x] Interactive 3D Totoro model
- [x] Page transitions (Framer Motion)
- [x] Scroll-triggered animations
- [x] Hover effects on interactive elements
- [x] Consistent component design system

---

## Known Issues & Technical Debt

### High Priority Issues

#### 1. Large index.js File (359 Lines)

**Problem:**
- Homepage contains all sections in single file (Hero, About, Skills, Experience)
- Exceeds 200 LOC guideline by 79%
- Difficult to maintain and test individual sections

**Impact:** Medium
- Slower development (harder to navigate code)
- Potential performance (larger initial bundle)
- Harder to reuse sections

**Proposed Solution:**
```javascript
// Modularize into separate components
components/
  ├── home-hero-section.js
  ├── home-about-section.js
  ├── home-skills-section.js
  └── home-experience-section.js

// Refactored index.js
import HeroSection from '../components/home-hero-section'
import AboutSection from '../components/home-about-section'
import SkillsSection from '../components/home-skills-section'
import ExperienceSection from '../components/home-experience-section'

const HomePage = () => (
  <Layout>
    <SEO {...seoProps} />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
  </Layout>
)
```

**Effort:** 4 hours
**Priority:** P1 (Important, not urgent)

---

#### 2. DRY Violations in Grid Items (250+ Lines Duplicated)

**Problem:**
- 3 identical grid components: WorkGridItem, AudioGridItem, ActivitiesGridItem
- 99% code duplication (~132 lines)
- Same pattern: image, title, description, link to detail page

**Current Code:**
```javascript
// grid-item.js (196 LOC total)
export const WorkGridItem = memo(({ id, title, thumbnail, children }) => {
  // 45 lines of code
})

export const AudioGridItem = memo(({ id, title, thumbnail, children }) => {
  // 45 lines of code (IDENTICAL)
})

export const ActivitiesGridItem = memo(({ id, title, thumbnail, children }) => {
  // 45 lines of code (IDENTICAL)
})
```

**Proposed Solution:**
```javascript
// Unified component with category prop
export const GenericGridItem = memo(({
  category = 'works',  // 'works', 'audiophile', 'activities'
  id,
  title,
  thumbnail,
  children
}) => {
  return (
    <Link href={`/${category}/${id}`}>
      <motion.div {...animationProps}>
        <Image src={thumbnail} alt={title} {...imageProps} />
        <Text>{title}</Text>
        <Text fontSize="sm">{children}</Text>
      </motion.div>
    </Link>
  )
})

// Convenience exports
export const WorkGridItem = (props) => (
  <GenericGridItem category="works" {...props} />
)
```

**Effort:** 2 hours
**Priority:** P0 (Critical for maintainability)
**Lines Saved:** ~132 lines (196 → ~64 lines)

---

#### 3. DRY Violations in Domain Components (84 Lines Duplicated)

**Problem:**
- 3 identical files: work.js, activities.js, audiophile.js
- 90% code duplication (~84 lines)
- Same exports: Title, Image, Meta

**Current Code:**
```javascript
// work.js (28 LOC)
export const Title = ({ children }) => (/* breadcrumb */)
export const WorkImage = ({ src, alt }) => (/* image */)
export const Meta = ({ children }) => (/* badge */)

// activities.js (28 LOC - IDENTICAL)
export const Title = ({ children }) => (/* breadcrumb */)
export const ActivitiesImage = ({ src, alt }) => (/* image */)
export const Meta = ({ children }) => (/* badge */)

// audiophile.js (28 LOC - IDENTICAL)
export const Title = ({ children }) => (/* breadcrumb */)
export const AudioImage = ({ src, alt }) => (/* image */)
export const Meta = ({ children }) => (/* badge */)
```

**Proposed Solution:**
```javascript
// components/detail-page.js (single file)
export const DetailPageTitle = ({ category, children }) => (
  <Box>
    <Link href={`/${category}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Link>
    <ChevronRightIcon />
    <Heading>{children}</Heading>
  </Box>
)

export const DetailPageImage = ({ src, alt }) => (
  <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
)

export const DetailPageMeta = ({ children }) => (
  <Badge colorScheme="green" mr={2}>{children}</Badge>
)

// Usage in pages
import {
  DetailPageTitle as Title,
  DetailPageImage as WorkImage,
  DetailPageMeta as Meta
} from '../components/detail-page'
```

**Effort:** 1.5 hours
**Priority:** P0 (Critical for maintainability)
**Lines Saved:** ~56 lines (84 → ~28 lines)

---

### Medium Priority Issues

#### 4. Outdated Model Path Reference

**Problem:**
- `lib/performance.js` line 700 references `/totoro.glb` (old filename)
- Actual file: `/totoro-compressed.glb`
- Function `preloadCriticalResources()` may not be actively used

**Current Code:**
```javascript
// lib/performance.js:700
link.href = '/totoro.glb'  // ❌ Wrong path
```

**Proposed Solution:**
```javascript
// Option 1: Fix path
link.href = '/totoro-compressed.glb'  // ✅ Correct

// Option 2: Remove function if unused
// Check if preloadCriticalResources() is called anywhere
// If not, delete the function entirely
```

**Effort:** 15 minutes
**Priority:** P1 (Low risk, easy fix)

---

#### 5. Large Image Assets (11MB)

**Problem:**
- 23 images total: 11MB
- 5 images exceed 1MB:
  - Ticket2.png: 1.6MB (largest)
  - ea1000.jpg: 1.2MB
  - Tensorflow1.png: 1.1MB
  - Food2.png: 1.0MB
  - Ticket3.png: 1.0MB
- Target: < 300KB per image

**Impact:** High
- Slower page loads on mobile/slow connections
- Higher bandwidth costs (Vercel free tier limit)
- Poor Core Web Vitals (LCP)

**Proposed Solution:**

**Phase 1: Compression (Immediate)**
```bash
# Install compression tools
npm install -g imagemin-cli imagemin-pngquant imagemin-mozjpeg

# Compress PNGs
imagemin public/images/**/*.png --plugin=pngquant --out-dir=public/images/optimized

# Compress JPGs
imagemin public/images/**/*.jpg --plugin=mozjpeg --out-dir=public/images/optimized

# Expected result: 11MB → ~5MB (55% reduction)
```

**Phase 2: Resize Oversized Images**
```bash
# Resize large images to appropriate display dimensions
# Current: 2300x1500px → Target: 1200x800px (detail view)
#         1080x2340px → Target: 540x1170px (mobile screenshots)
```

**Phase 3: Image CDN (Future)**
- Integrate Cloudinary or ImageKit
- Automatic format selection (AVIF/WebP)
- On-the-fly resizing
- CDN caching

**Effort:**
- Phase 1: 1 hour
- Phase 2: 2 hours
- Phase 3: 4 hours (future roadmap)

**Priority:** P0 (Critical for performance)

---

#### 6. Audiophile Images Not Using Next.js Image

**Problem:**
- `components/audiophile.js` uses Chakra `<Image>` instead of Next.js `<Image>`
- Missing automatic format conversion (AVIF/WebP)
- Missing lazy loading optimization
- Missing responsive sizes

**Current Code:**
```javascript
// audiophile.js
export const AudioImage = ({ src, alt }) => (
  <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
  //  ↑ Chakra Image (no optimization)
)
```

**Proposed Solution:**
```javascript
// audiophile.js
import Image from 'next/image'
import { Box } from '@chakra-ui/react'

export const AudioImage = ({ src, alt }) => (
  <Box borderRadius="lg" overflow="hidden" mb={4}>
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      quality={85}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, 800px"
    />
  </Box>
)
```

**Effort:** 30 minutes
**Priority:** P1 (Important for performance)

---

#### 7. Static Sitemap (Outdated lastmod Dates)

**Problem:**
- `public/sitemap.xml` has static lastmod dates (2025-01-05)
- No automatic regeneration on content changes
- Google Search Console shows stale dates

**Proposed Solution:**
```javascript
// pages/api/sitemap.xml.js (Future)
export default function handler(req, res) {
  const pages = ['/', '/works', '/activities', '/audiophile', ...]
  const projects = ['foodlover', 'ticketapp', 'tensorflow', 'ecommerceBE']
  // ... build dynamic sitemap with current dates

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemapXml)
  res.end()
}
```

**Alternative:** Use `next-sitemap` package

**Effort:** 2 hours
**Priority:** P2 (Low impact on SEO)

---

### Low Priority Issues

#### 8. Deprecated Font Loader

**Problem:**
- `src/pages/fonts/font.js` exists but unused
- Fonts now load in `_document.js` via Google Fonts link
- File kept "for backward compatibility" but no references found

**Proposed Solution:**
Delete file if confirmed unused:
```bash
# Check for imports
rg "from.*fonts/font" --type js
# If no results, safe to delete
rm src/pages/fonts/font.js
```

**Effort:** 10 minutes
**Priority:** P2 (Cleanup, no functional impact)

---

#### 9. Missing TypeScript

**Problem:**
- All files are `.js` (no type safety)
- No PropTypes or runtime validation
- Harder to catch bugs during development
- Poor IDE autocomplete

**Proposed Migration Path:**

**Phase 1: Setup (Q3 2026)**
```bash
npm install --save-dev typescript @types/react @types/node
# Rename jsconfig.json → tsconfig.json
```

**Phase 2: Gradual Migration**
- Rename utilities first (`lib/*.js` → `lib/*.ts`)
- Then components (`components/*.js` → `components/*.tsx`)
- Finally pages (`pages/*.js` → `pages/*.tsx`)

**Phase 3: Add Interfaces**
```typescript
interface AnimatedBadgeProps {
  children: ReactNode
  colorScheme: string
  delay?: number
}

const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  children,
  colorScheme,
  delay = 0
}) => {
  // Component implementation
}
```

**Effort:** 20-30 hours (gradual over Q3-Q4 2026)
**Priority:** P2 (Long-term code quality)

---

## Roadmap Timeline

### Q1 2026 (Current - Jan-Mar) ✅

**Status:** Production Launch

- [x] Deploy v1.0.0 to production
- [x] Achieve 97+ Lighthouse scores
- [x] Comprehensive SEO implementation
- [x] 3D model optimization (Draco compression)
- [x] Dark/light mode with SSR persistence

---

### Q2 2026 (Apr-Jun) - Performance & Content 🎯

**Focus:** Fix critical technical debt, optimize performance

**High Priority:**
1. **Image Optimization** (Effort: 3h)
   - Compress large images (11MB → 5MB target)
   - Resize oversized images to display dimensions
   - Fix audiophile images to use Next.js Image
   - **Expected Impact:** LCP -40%, bundle size -6MB

2. **DRY Refactor** (Effort: 3.5h)
   - Unify grid item components (save 132 LOC)
   - Unify detail page components (save 56 LOC)
   - **Expected Impact:** Easier maintenance, smaller bundle

3. **Index.js Modularization** (Effort: 4h)
   - Split homepage into 4 section components
   - **Expected Impact:** Better code organization

**Medium Priority:**
4. **Contact Form** (Effort: 6h)
   - EmailJS or Vercel serverless function
   - Form validation (react-hook-form)
   - Spam protection (reCAPTCHA)
   - **Feature:** Direct contact from portfolio

5. **Dynamic Sitemap** (Effort: 2h)
   - API route `/api/sitemap.xml`
   - Auto-update lastmod dates
   - **Expected Impact:** Better SEO freshness signals

**Deliverables:**
- v1.1.0 release (performance improvements)
- Technical debt reduced by 60%
- Contact form live

---

### Q3 2026 (Jul-Sep) - Blog & PWA Features 📝

**Focus:** Content expansion, offline capabilities

**Features:**
1. **Blog Section** (Effort: 12h)
   - Blog listing page (`/blog`)
   - Individual blog post pages (`/blog/[slug]`)
   - Markdown support (MDX or react-markdown)
   - Syntax highlighting (Prism.js)
   - Reading time estimation
   - **SEO:** Blog post schema, RSS feed

2. **PWA Features** (Effort: 8h)
   - Service Worker implementation
   - Offline support (cache critical pages)
   - Install prompt (Add to Home Screen)
   - Web App Manifest
   - **Expected Impact:** Better mobile engagement

3. **Enhanced Analytics** (Effort: 4h)
   - Google Analytics 4 integration
   - Custom event tracking (CV downloads, project clicks)
   - Conversion funnels
   - **Insight:** User behavior data

**Deliverables:**
- v1.2.0 release (blog + PWA)
- First 10 blog posts published
- Mobile app-like experience

---

### Q4 2026 (Oct-Dec) - TypeScript & Testing 🛠️

**Focus:** Code quality, reliability

**Features:**
1. **TypeScript Migration** (Effort: 24h)
   - Setup tsconfig.json
   - Migrate utilities (lib/*.ts)
   - Migrate components (components/*.tsx)
   - Migrate pages (pages/*.tsx)
   - Add interfaces for all props
   - **Expected Impact:** Type safety, better DX

2. **Testing Suite** (Effort: 16h)
   - Jest setup for unit tests
   - React Testing Library for components
   - Playwright for E2E tests
   - Target coverage: 70%
   - **Expected Impact:** Prevent regressions

3. **Image CDN** (Effort: 6h)
   - Cloudinary or ImageKit integration
   - Automatic format optimization
   - On-the-fly resizing
   - **Expected Impact:** 11MB → 3MB (73% reduction)

**Deliverables:**
- v2.0.0 release (TypeScript + Tests)
- 70% test coverage
- Full type safety

---

### 2027 - Advanced Features 🚀

**Q1 2027:**
- CMS Integration (Sanity or Contentful)
- Admin dashboard for content management
- Blog comments (Utterances or Disqus)
- Newsletter subscription (Mailchimp)

**Q2 2027:**
- Next.js App Router migration
- Server Components
- Streaming SSR
- React Server Actions

**Q3 2027:**
- Internationalization (i18n)
- Multi-language support (English, Vietnamese)
- Accessibility audit (WCAG AAA)
- Performance budget enforcement (CI/CD)

**Q4 2027:**
- Design system documentation (Storybook)
- Component library (reusable across projects)
- Open-source portfolio template
- 100 blog posts milestone

---

## Performance Improvement Targets

### Current Baseline (v1.0.0)

| Metric | Current | Target (v1.1) | Target (v2.0) |
|--------|---------|---------------|---------------|
| Lighthouse Performance | 97 | 98 | 100 |
| First Contentful Paint | 1.2s | 1.0s | 0.8s |
| Time to Interactive | 2.8s | 2.5s | 2.0s |
| Largest Contentful Paint | 1.8s | 1.5s | 1.2s |
| Cumulative Layout Shift | 0.05 | 0.03 | 0.01 |
| Total Bundle Size | 12.5MB | 6.5MB | 4.0MB |
| Main JS Chunk | 450KB | 400KB | 350KB |

### Optimization Roadmap

**Q2 2026 (v1.1):**
- Image compression: 11MB → 5MB
- DRY refactor: Bundle -20KB
- Lazy loading improvements

**Q3 2026 (v1.2):**
- Service Worker caching
- Font subsetting
- Code splitting optimization

**Q4 2026 (v2.0):**
- Image CDN: 5MB → 3MB
- TypeScript: Better tree-shaking
- Bundle analyzer optimizations

---

## Content Expansion Plan

### Blog Topics (Q3 2026)

**Technical Deep Dives:**
1. Building a 3D portfolio with Three.js and Next.js
2. Optimizing images: AVIF vs WebP performance comparison
3. Draco compression: Reducing 3D model size by 96.7%
4. Dark mode in Next.js: SSR persistence patterns
5. Framer Motion: Advanced animation techniques

**Tutorials:**
6. Setting up Chakra UI with Next.js 14
7. Implementing scroll-triggered animations
8. Next.js Image optimization best practices
9. SEO for developers: JSON-LD structured data
10. Deploying Next.js to Vercel with custom domain

**Project Case Studies:**
11. Food Lover app: Building a restaurant discovery platform
12. Flutter Ticket App: Cross-platform mobile development
13. TensorFlow sign language detection: ML model integration
14. E-commerce backend: Scalable Node.js architecture

---

## Unresolved Questions

### Technical Decisions Needed

1. **CMS Choice (Q1 2027):**
   - Sanity (GraphQL, React-based)
   - Contentful (REST API, enterprise features)
   - Strapi (self-hosted, full control)
   - **Decision Criteria:** Cost, ease of use, API performance

2. **Testing Strategy:**
   - Unit tests: Jest + React Testing Library
   - E2E tests: Playwright vs Cypress
   - Visual regression: Percy vs Chromatic
   - **Decision:** Playwright (faster, better TypeScript support)

3. **Image CDN:**
   - Cloudinary (generous free tier, transformations)
   - ImageKit (real-time optimization, CDN)
   - Vercel Image Optimization (built-in, but limited)
   - **Decision:** Pending cost analysis

### Open Questions

4. **Should activities section be expanded?**
   - Currently only 1 activity (YTC club)
   - Future: Add more university/community involvement?
   - **Action:** Wait for more activities to document

5. **Blog commenting system:**
   - Utterances (GitHub issues-based, free)
   - Disqus (feature-rich, ads on free tier)
   - Custom solution (Vercel serverless + DB)
   - **Decision:** Utterances (privacy-friendly, no ads)

6. **Newsletter provider:**
   - Mailchimp (industry standard, $13/month)
   - ConvertKit (creator-focused, $29/month)
   - EmailJS (free, limited features)
   - **Decision:** Start with EmailJS, upgrade if needed

---

## Success Metrics & KPIs

### Traffic Goals

| Period | Unique Visitors | Page Views | Avg Session Duration |
|--------|----------------|------------|----------------------|
| Q2 2026 | 500/month | 1,500/month | 2 minutes |
| Q3 2026 | 1,000/month | 3,500/month | 3 minutes |
| Q4 2026 | 2,000/month | 7,000/month | 4 minutes |
| Q4 2027 | 10,000/month | 40,000/month | 5 minutes |

### Business Goals

| Period | Job Interviews | CV Downloads | Email Inquiries |
|--------|----------------|--------------|-----------------|
| Q2 2026 | 5 | 50 | 3 |
| Q3 2026 | 8 | 100 | 6 |
| Q4 2026 | 12 | 200 | 10 |
| Q4 2027 | 50 | 1,000 | 50 |

### Content Goals

| Period | Blog Posts | Total Words | Social Shares |
|--------|------------|-------------|---------------|
| Q3 2026 | 10 | 20,000 | 50 |
| Q4 2026 | 30 | 75,000 | 200 |
| Q2 2027 | 60 | 150,000 | 500 |
| Q4 2027 | 100 | 250,000 | 1,000 |

---

## Lessons Learned

### What Went Well ✅

1. **Performance First Approach**
   - 97+ Lighthouse scores from day one
   - Draco compression saved 96.7% on 3D model
   - Users notice fast load times

2. **Component Modularity**
   - Reusable components (AnimatedBadge, Section, etc.)
   - Easy to add new projects/reviews
   - Consistent design system

3. **SEO Investment**
   - Comprehensive meta tags from start
   - JSON-LD schemas boost rich results
   - Good initial search rankings

4. **Dark Mode Implementation**
   - SSR persistence prevents flash
   - Smooth toggle transition
   - Users appreciate theme choice

### What Could Be Improved ⚠️

1. **Planning for Scale**
   - Should have created GenericGridItem from start
   - Image optimization should have been earlier
   - TypeScript from day one (migration is hard)

2. **Testing**
   - No automated tests initially
   - Relying on manual Lighthouse audits
   - Regressions harder to catch

3. **Content Management**
   - Hardcoded content difficult to update
   - CMS integration should be earlier
   - Blog section should have been MVP

4. **Documentation**
   - Should have documented architecture earlier
   - Code comments sparse in complex areas
   - README could be more detailed

---

**Roadmap Version:** 1.0
**Maintained By:** Trương Tuấn Lộc
**Review Frequency:** Quarterly
**Next Review:** April 2026
