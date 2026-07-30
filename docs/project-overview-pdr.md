# Project Overview & Product Development Requirements (PDR)

**Project Name:** Personal Portfolio Website
**Owner:** Trương Tuấn Lộc (Jura69)
**Version:** 2.x (Vite SPA)
**Status:** Production (Live)
**Last Updated:** 2026-07-30
**Live URL:** https://my-profile-jura69.vercel.app

---

## Project Vision

Create a modern, high-performance portfolio website that showcases professional work, technical expertise, and personal interests through an engaging, Ghibli-inspired design with interactive 3D elements and smooth animations.

**Core Objective:** Stand out in competitive tech hiring market through unique design, exceptional performance, and comprehensive SEO optimization that drives organic traffic and professional opportunities.

---

## Product Goals

### Primary Goals

1. **Professional Showcase** - Present technical skills, work experience, and project portfolio in compelling, accessible format

2. **Performance Excellence** - Achieve 97+ Lighthouse scores across all metrics (Performance, Accessibility, Best Practices, SEO)

3. **Search Engine Visibility** - Rank highly for relevant technical keywords through comprehensive SEO implementation

4. **User Experience** - Deliver smooth, delightful interactions with responsive design, dark/light modes, and engaging animations

5. **Technical Demonstration** - Showcase advanced frontend capabilities (3D graphics, scroll-driven animation, performance engineering) as proof of skills

### Secondary Goals

6. **Content Platform** - Provide structure for future content expansion (blog, tutorials, case studies)

7. **Personal Branding** - Establish "Jura69" as recognizable technical brand with unique Totoro-themed identity

8. **Audiophile Community** - Share audio equipment reviews and connect with enthusiast community

---

## Target Audience

### Primary Audience

**Hiring Managers & Technical Recruiters**
- Looking for: Full-stack developers with React/Node.js/C# expertise
- Needs: Quick skill assessment, portfolio review, contact information
- Pain Points: Slow-loading sites, unclear technical capabilities, poor mobile experience
- Success Metrics: CV downloads, LinkedIn connections, email inquiries

**Senior Developers & Tech Leads**
- Looking for: Technical depth, code quality, architectural decisions
- Needs: GitHub links, detailed project descriptions, tech stack visibility
- Pain Points: Superficial portfolios, missing GitHub links, vague project details
- Success Metrics: GitHub follows, technical discussions, referrals

### Secondary Audience

**Potential Clients & Collaborators**
- Looking for: Freelance developers, project partners
- Needs: Project examples, contact methods, availability status
- Pain Points: Unclear pricing, unresponsive portfolios, no clear CTAs
- Success Metrics: Project inquiries, collaboration requests

**Audiophile Community**
- Looking for: Audio equipment reviews, recommendations
- Needs: Detailed specs, sound quality assessments, pairing suggestions
- Pain Points: Shallow reviews, missing technical details
- Success Metrics: Social shares, community engagement

---

## Use Cases

### UC-01: Job Application Submission
**Actor:** Job Seeker (Self)
**Trigger:** Apply for full-stack developer position
**Flow:**
1. Include portfolio URL in resume/application
2. Recruiter clicks link from application
3. Lands on homepage, views skills and experience
4. Clicks "My Personal Projects" → Reviews the project portfolio (11 projects)
5. Downloads CV PDF
6. Connects on LinkedIn or sends email

**Success Criteria:** Recruiter spends 3+ minutes on site, views 3+ pages, takes action (CV download/contact)

### UC-02: Technical Portfolio Review
**Actor:** Hiring Manager
**Trigger:** Shortlist candidate for interview
**Flow:**
1. Access portfolio from email/LinkedIn
2. Review homepage technical skills (23 skills in 4 groups)
3. Navigate to Works section
4. Click Food Lover project → View tech stack, GitHub link, screenshots
5. Open GitHub repository in new tab
6. Return to portfolio, check other projects
7. Note contact information for follow-up

**Success Criteria:** Manager confirms technical fit, proceeds to interview stage

### UC-03: Casual Discovery via Search
**Actor:** Anonymous Visitor
**Trigger:** Google search "React portfolio Nha Trang" or similar
**Flow:**
1. Click search result → Lands on homepage
2. Interacts with Totoro 3D model (rotates, zooms)
3. Scrolls through animated skill badges
4. Toggles dark/light mode
5. Explores audiophile section out of curiosity
6. Reads EA1000 IEM review
7. Shares on social media or bookmarks

**Success Criteria:** Visitor engagement 2+ minutes, explores multiple sections

### UC-04: Mobile Quick Access
**Actor:** Recruiter on Mobile
**Trigger:** Review candidate during commute
**Flow:**
1. Open portfolio on iPhone/Android
2. Homepage loads quickly (< 2s)
3. Scrolls through responsive layout (no horizontal scroll)
4. Taps hamburger menu → Navigates to Works
5. Views project thumbnails in single-column grid
6. Returns to homepage, taps email link → Composes message

**Success Criteria:** Mobile experience matches desktop quality, all features accessible

### UC-05: Audiophile Product Research
**Actor:** Audio Enthusiast
**Trigger:** Google "Simgot EA1000 review"
**Flow:**
1. Search result shows portfolio audiophile page
2. Clicks → Lands on EA1000 review
3. Reads detailed specs, sound quality assessment
4. Views product images
5. Checks other reviews (Ka11, SSP, Onix)
6. Follows social media links to continue discussion

**Success Criteria:** Reader finds review helpful, engages with content, returns for future reviews

---

## Functional Requirements

### FR-01: Homepage (src/pages/index.tsx)
**Priority:** P0 (Critical)

**Requirements:**
- Display animated hero section (day→night scroll narrative with 3D Totoro)
- Show "About Me" section with bio and stat pills
- Present 23 skills in 4 groups (Frontend, AI & ML, Backend, Tools & Others) in a bento grid
- Show work experience timeline with 4 entries (3 positions + education)
- Include CV download button (opens /files/CV.pdf)
- Display social links (GitHub, LinkedIn, Facebook, Instagram, Email)
- Implement 3D Totoro character with auto-rotate and user interaction
- Support dark/light mode toggle

**Acceptance Criteria:**
- All sections render without layout shift
- Animations trigger on scroll (staggered delays)
- CV download works on all browsers
- 3D model loads within 3s on 4G connection
- Dark/light mode persists across sessions

### FR-02: Project Portfolio (src/pages/works.tsx + detail pages)
**Priority:** P0 (Critical)

**Requirements:**
- Display 11 projects: 3 featured large cards + compact responsive grids (personal / enterprise @ Creasia)
- Each card shows: thumbnail, title, brief description, link to detail page
- Detail pages include: title, year badge, full description, metadata (GitHub, Platform, Stack, Status), 2-4 project images
- Implement breadcrumb navigation (Works > Project Name)
- Include structured data (ProjectSchema, BreadcrumbSchema)

**Acceptance Criteria:**
- Grid layout responsive without breaking
- All GitHub links open in new tab
- Images lazy-load below fold
- SEO meta tags unique per project
- Breadcrumbs clickable and functional

### FR-03: Activities Section (src/pages/activities.tsx + activities/ytc.tsx)
**Priority:** P1 (Important)

**Requirements:**
- Display activities grid (currently 1 item, scalable to more)
- Show YTC club detail page with description and images
- Support same layout pattern as Works section
- Route intentionally lives OFF the navbar; reachable via the works-page link and direct URL

**Acceptance Criteria:**
- Grid layout matches Works section design
- Easy to add new activities (copy existing pattern)
- Images optimized and lazy-loaded

### FR-04: Audiophile Section (src/pages/audiophile.tsx + 4 detail pages)
**Priority:** P1 (Important)

**Requirements:**
- Display 4 audio device cards in responsive grid
- Detail pages show: device name, description, technical specs (Driver, Impedance, Frequency Response, etc.), review paragraphs, device images
- Implement breadcrumb navigation (Audiophile > Device Name)

**Acceptance Criteria:**
- Specs display in clear list format
- Images show device details clearly
- Review text readable and well-formatted
- Mobile layout single-column without horizontal scroll

### FR-05: Navigation & Layout
**Priority:** P0 (Critical)

**Requirements:**
- Fixed navigation bar at top (blur backdrop), content column 1100px aligned with pages
- Logo clickable → returns to homepage
- Desktop: horizontal links (Works, Audiophile, GitHub — Activities off-nav by decision)
- Mobile: hamburger button opening a Radix dropdown menu
- Theme toggle button (sun/moon icon swap)
- Active route highlighting
- Footer with copyright and dynamic year

**Acceptance Criteria:**
- Navbar visible on all pages
- Mobile menu opens/closes smoothly
- Theme toggle instant without flash
- Active link styled differently
- Footer year updates automatically

### FR-06: SEO & Metadata
**Priority:** P0 (Critical)

**Requirements:**
- Unique page titles, descriptions, keywords per page
- Open Graph tags for social sharing
- Twitter Card metadata
- JSON-LD structured data (Person, Website, ProfilePage, Project, Breadcrumb schemas)
- Canonical URLs for all pages
- Static OG/description fallback in index.html for no-JS crawlers (FB/Zalo/LinkedIn)
- robots.txt allowing all crawlers
- sitemap.xml generated at build time from works-data (cannot drift from routes)
- Mobile-optimized viewport and theme color

**Acceptance Criteria:**
- Social share previews show correct title, description, image
- Google Rich Results test passes for all schemas
- Sitemap validates in Google Search Console
- All pages indexed by search engines

### FR-07: Performance & Loading
**Priority:** P0 (Critical)

**Requirements:**
- Lighthouse Performance score ≥ 97
- First Contentful Paint (FCP) < 1.5s
- Time to Interactive (TTI) < 3.5s
- Cumulative Layout Shift (CLS) < 0.1
- Image optimization (WebP, max 1200px, with lazy loading)
- 3D model Draco compression (< 2MB)
- Route-level lazy loading + vendor chunk isolation (Three.js, GSAP, Motion, icons)
- Vercel immutable caching for hashed build assets
- SWC transpilation + esbuild minification

**Acceptance Criteria:**
- Pass all Core Web Vitals thresholds
- No console errors in production
- Images under 300KB each (target)
- 3D model loads progressively with spinner
- Bundle size < 500KB for main chunk

### FR-08: Accessibility
**Priority:** P0 (Critical)

**Requirements:**
- Lighthouse Accessibility score ≥ 97
- Semantic HTML (nav, main, article, footer)
- All images have alt text
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast ratios meet WCAG AA
- Screen reader compatible
- No motion for users with prefers-reduced-motion

**Acceptance Criteria:**
- Tab navigation reaches all interactive elements
- Screen reader announces page sections
- Color contrast checker passes (4.5:1 text, 3:1 UI)
- Animations respect OS accessibility settings

---

## Non-Functional Requirements

### NFR-01: Performance
- **Response Time:** 95th percentile page load < 2s on 4G
- **Availability:** 99.9% uptime (Vercel SLA)
- **Scalability:** Handle 10,000 concurrent visitors without degradation
- **Bundle Size:** Main JS chunk < 500KB, total initial load < 1.5MB

### NFR-02: Compatibility
- **Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Devices:** Desktop (1920x1080 to 1366x768), Tablet (768x1024), Mobile (375x667 to 414x896)
- **Screen Readers:** NVDA, JAWS, VoiceOver compatible
- **Network:** Functional on 3G, optimized for 4G/5G

### NFR-03: Security
- **HTTPS:** Enforce HTTPS (Vercel automatic)
- **CSP:** Strict Content Security Policy for SVG
- **Data Privacy:** No user tracking without consent
- **Secrets:** No API keys or credentials in client code
- **Dependencies:** Regular security audits (yarn audit)

### NFR-04: Maintainability
- **Code Quality:** ESLint + Prettier enforced
- **Documentation:** Inline comments for complex logic
- **Modularity:** Components < 200 LOC (target)
- **Testing:** Unit tests for utility functions (future)
- **Version Control:** Git with conventional commits

### NFR-05: SEO
- **Indexability:** All pages crawlable by search engines
- **Schema Markup:** Valid JSON-LD on all pages
- **Sitemap:** Generated at build time from the same data the pages render (no drift)
- **Mobile-First:** Google Mobile-Friendly test passes
- **Page Speed:** Google PageSpeed Insights score ≥ 90

### NFR-06: Usability
- **Learnability:** First-time visitors understand navigation within 10s
- **Efficiency:** Access any page within 2 clicks from homepage
- **Memorability:** Consistent layout aids return visits
- **Error Prevention:** No broken links or 404 errors
- **User Satisfaction:** Positive feedback on design and UX

---

## Technical Constraints

### Technology Stack
- **Build Tool:** Vite 6 - SPA build, no server-side rendering
- **Framework:** React 19 + React Router 7 - Client-side routing only
- **Styling:** Tailwind CSS 4 - Utility-first, minimal CSS output
- **Animation:** Motion 12 + GSAP + Lenis - Lightweight and performant
- **3D Graphics:** Three.js 0.172 - Necessary for Totoro model
- **Deployment:** Vercel - Free tier (static SPA, no server costs)

### Resource Constraints
- **Budget:** $0 (free tier only)
- **Build Time:** < 10 minutes per deployment (Vercel limit)
- **Asset Size:** Public directory < 100MB (Git LFS not used)
- **Bandwidth:** Vercel free tier ~100GB/month

### External Dependencies
- **Google Fonts:** M PLUS Rounded 1c (CDN dependency)
- **Draco Decoder:** Google Cloud Storage (CDN dependency)
- **Vercel Analytics:** Free tier (limited data retention)

---

## Success Metrics

### Business Metrics
1. **Job Opportunities:** ≥ 5 interview requests per month from portfolio
2. **Network Growth:** ≥ 20 LinkedIn connections per month
3. **CV Downloads:** ≥ 50 downloads per month
4. **Email Inquiries:** ≥ 3 project/collaboration inquiries per month

### Technical Metrics
5. **Lighthouse Score:** Maintain ≥ 97 across all categories
6. **Core Web Vitals:** Pass all 3 metrics (LCP, FID, CLS)
7. **Search Rankings:** Top 10 for "React developer Vietnam", "Full-stack developer Nha Trang"
8. **Page Load Time:** 95th percentile < 2s

### Engagement Metrics
9. **Traffic:** ≥ 500 unique visitors per month
10. **Bounce Rate:** < 40%
11. **Session Duration:** ≥ 2 minutes average
12. **Pages per Session:** ≥ 3 pages average

### Content Metrics
13. **Audiophile Traffic:** ≥ 100 visitors per month to audio reviews
14. **Social Shares:** ≥ 10 shares per month
15. **Return Visitors:** ≥ 20% of total traffic

---

## Key Features & Capabilities

### Implemented Features ✅

**Design & UX:**
- Responsive design (mobile-first approach)
- Dark/light mode: new visitors follow OS prefers-color-scheme, toggle choice persists
- Ghibli-inspired design tokens (grass teal, forest green, warm parchment)
- Smooth page transitions (Motion 12) + GSAP day→night scroll scenes
- Interactive 3D Totoro character
- Scroll-triggered reveals and hover micro-interactions

**Content:**
- About Me section with professional bio and stat pills (2+ yrs experience)
- Skills showcase (23 skills in 4 groups, bento grid)
- Work experience timeline (4 entries: 3 positions + education)
- 11 projects (3 featured + personal/enterprise grids) with detail pages
- 1 activity (YTC club) with detail page
- 4 audio equipment reviews with technical specs
- CV download (PDF)
- Social media links (5 platforms)

**Performance:**
- WebP image optimization (max 1200px)
- Route-level lazy loading (every page except homepage is its own ~2KB chunk)
- Vendor chunk isolation (Three.js, GSAP, Motion, icons, React)
- 3D model Draco compression (96.7% reduction), loaded lazily with the hero
- Vercel immutable caching for hashed build assets

**SEO:**
- Static OG fallback (index.html) + per-page meta hoisted by React 19
- JSON-LD structured data (5 schema types)
- Canonical URLs
- robots.txt + build-time sitemap.xml (derived from works-data)
- Mobile-optimized viewport

**Analytics:**
- Vercel Analytics integration
- Speed Insights (Core Web Vitals field data)

### Planned Features (Future Roadmap)

**Content Expansion:**
- Blog section for technical articles
- Case studies for complex projects
- Testimonials from colleagues/clients
- Skills certification badges
- Timeline visualization for career progression

**Functionality:**
- Contact form with email integration
- Newsletter subscription
- Project filtering by tech stack
- Search functionality
- RSS feed for blog posts

**Performance:**
- Image CDN integration
- Service Worker for offline support
- Progressive Web App (PWA) features
- Bundle size optimization (< 400KB main chunk)

**Community:**
- Comments on blog posts
- Social sharing buttons with counts
- GitHub activity feed integration
- Open source contributions showcase

---

## Design Principles

### 1. Performance First
Every decision prioritizes speed and efficiency. If feature adds > 50KB to bundle or > 0.5s to load time, justify or reject.

### 2. Accessibility Always
No feature ships without keyboard navigation, screen reader support, and WCAG AA compliance.

### 3. Progressive Enhancement
Core content accessible without JavaScript. Animations and 3D enhance but don't block.

### 4. Mobile-First
Design for smallest screen first, scale up. Never assume desktop viewport.

### 5. Content Clarity
Technical depth without jargon overload. Scannable headings, short paragraphs, visual hierarchy.

### 6. Ghibli-Inspired Aesthetic
Warm, inviting colors. Organic shapes. Whimsical but professional. Totoro as brand mascot.

### 7. Zero-Config Simplicity
No build configuration gymnastics. Standard Vite + React patterns. Clear file structure.

### 8. Evidence-Based Optimization
Lighthouse audits before/after changes. Real user metrics (Core Web Vitals) drive decisions.

---

## Risks & Mitigation

### Risk 1: 3D Model Performance on Low-End Devices
**Probability:** Medium | **Impact:** High
**Mitigation:**
- Pixel ratio capped at 2 for mobile
- Lazy load with loading spinner
- Disable shadows and reduce precision
- Provide static fallback image (future)

### Risk 2: Image Asset Bloat Returns Over Time
**Probability:** Medium | **Impact:** Medium
**Current Status:** RESOLVED baseline — ~2.5MB total, all WebP (2026-07-30 conversion pass)
**Mitigation:**
- Every new image goes through the WebP/max-1200px/q~80 constraint before commit
- Three legacy files still exceed the 150KB budget (tracked in project-roadmap.md)
- Image CDN deliberately deferred — re-evaluate only at much larger asset volume

### Risk 3: Vercel Free Tier Bandwidth Limits
**Probability:** Low | **Impact:** Medium
**Mitigation:**
- Monitor Vercel dashboard monthly
- Implement Cloudflare CDN if approaching limit
- Optimize asset sizes proactively

### Risk 4: SEO Ranking Stagnation
**Probability:** Medium | **Impact:** Medium
**Mitigation:**
- Add blog content for long-tail keywords
- Build backlinks through guest posts
- Update sitemap dynamically
- Monitor Google Search Console

### Risk 5: Browser Compatibility Issues
**Probability:** Low | **Impact:** High
**Mitigation:**
- Test on BrowserStack (Chrome, Firefox, Safari)
- Polyfills for older browsers (if needed)
- Graceful degradation for 3D features

### Risk 6: Security Vulnerabilities in Dependencies
**Probability:** Medium | **Impact:** Medium
**Mitigation:**
- Run `yarn audit` periodically
- Update dependencies monthly
- Use Dependabot for automated PRs
- Pin critical dependency versions

---

## Dependencies & Integrations

### Core Dependencies
- react@^19.2.0
- react-router@^7.0.0
- tailwindcss@^4.3.2
- motion@^12.42.2
- three@^0.172.0

### External Services
- **Vercel:** Hosting, analytics, deployment
- **Google Fonts:** Typography (M PLUS Rounded 1c)
- **Google CDN:** Draco decoder for 3D models
- **GitHub:** Code repository, public profile link
- **LinkedIn:** Professional network link
- **Facebook/Instagram:** Social media presence

### Future Integrations (Planned)
- **EmailJS/SendGrid:** Contact form backend
- **Cloudinary/ImageKit:** Image CDN and optimization
- **Google Analytics:** Enhanced traffic analytics
- **Disqus/Utterances:** Blog comments
- **Mailchimp/ConvertKit:** Newsletter

---

## Governance & Ownership

**Product Owner:** Trương Tuấn Lộc (Jura69)
**Development:** Solo developer (Trương Tuấn Lộc)
**Design:** Self-designed (inspired by craftz.dog)
**Content:** Self-authored
**Deployment:** Automated via Vercel (GitHub integration)

**Decision-Making:**
- All major changes approved by owner
- Performance regression blocks deployment
- SEO impact evaluated before content changes
- Accessibility non-negotiable

**Change Management:**
- Git conventional commits (feat, fix, docs, style, refactor, perf, test)
- Main branch protected (direct commits forbidden)
- Feature branches for all changes
- Code review (self-review with Lighthouse audit)

---

## Version History & Evolution

**v2.x (Current - 2026-07-30)** — review-v2 fixes plan
- Route-level lazy loading + real vendor chunking (app chunk 510KB → ~52KB)
- Static OG fallback + branded og-image; build-time sitemap (drift-proof)
- System-preference theme; listing h1s; navbar/content column alignment
- Repo hygiene: LF normalization, lint 0/0, WebP images, honest README/docs

**v2.0.0 (2026-07-07)**
- Major UI rebuild: Next.js → Vite SPA
- React 18 → React 19
- Chakra UI → Tailwind CSS 4
- Framer Motion → Motion 12 + GSAP + Lenis
- Client-side routing (React Router 7)
- Day-to-night homepage with GSAP scroll scenes

**v1.0.0 (Previous - 2026-01-20)**
- Initial Next.js 14 production release
- 4 projects, 1 activity, 4 audio reviews
- 3D Totoro with Draco compression
- Lighthouse 97+ across all metrics
- Comprehensive SEO implementation

**Pre-release Milestones:**
- **2026-06:** UI rebuild planning and architecture design
- **2026-05:** Tailwind CSS 4 foundation, Ghibli design tokens
- **2025-01-05:** Totoro Draco compression (96.7% reduction)
- **2024-11:** Design concept and initial tech stack selection

**Planned Releases (aspirational — see project-roadmap.md):**
- **v2.1.0:** Contact form, parity assertions, Suspense skeleton
- **v2.2.0:** Blog section; PWA (designed with the stale-chunk reload strategy)
- **v3.0.0:** Test suite (Vitest + React Testing Library)

---

## Appendices

### A. Color Palette (authority: `@theme` in src/styles/global.css)

**Primary:**
- Grass Teal: #88ccca

**Ghibli Theme:**
- Forest Green: #7eb77f · Deep Forest: #4a7c59 · Leaf Green: #6db86b
- Sky Blue: #87ceeb · Soft Pink: #e8a0b4 · Cream Yellow: #fff8dc
- Warm Parchment: #f5f0e8 · Night Forest: #1a1e2e
- Mint Green: #98d8c8 · Lavender: #c4b5d8 · Golden Dust: #d4a853 · Warm Brown: #8b6f47

**Semantic (light / dark):**
- Surface: #f5f0e8 / #1a1e2e · Surface Elevated: #fbf7ee / #232838
- Ink: #2d2a24 / #e9e7e4 · Ink Muted: #5c564c / #a8adb8
- Accent: #4a7c59 / #98d8c8 · Line: #e2dbcd / #2e3447

### B. Typography

**Primary Font:** M PLUS Rounded 1c (Google Fonts, non-render-blocking)
**Loaded Weights:** 300, 400, 500, 700, 800 (see index.html font URL)
**Fallback Stack:** -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif

### C. Key URLs

- **Production:** https://my-profile-jura69.vercel.app
- **GitHub Repo:** https://github.com/Jura69/My-Profile
- **LinkedIn:** https://www.linkedin.com/in/tuấn-lộc-b24b391ab/
- **Email:** Loctruongtuan@gmail.com

### D. Lighthouse Audit Results (historical measurement, pre-rebuild)

**Performance:** 97 · **Accessibility:** 100 · **Best Practices:** 100 · **SEO:** 100
**Date:** 2026-01-20 (Next.js v1 era — re-audit pending for the Vite build)

---

**Document Version:** 1.0
**Approval Status:** Approved
**Next Review:** Q2 2026
