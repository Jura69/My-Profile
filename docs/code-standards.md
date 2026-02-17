# Code Standards & Development Guidelines

**Project:** Personal Portfolio Website
**Last Updated:** 2026-01-20
**Enforcement:** ESLint + Prettier

---

## Table of Contents

1. [Code Style & Formatting](#code-style--formatting)
2. [Naming Conventions](#naming-conventions)
3. [File Organization](#file-organization)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [Animation Patterns](#animation-patterns)
7. [Performance Guidelines](#performance-guidelines)
8. [SEO Standards](#seo-standards)
9. [Accessibility Requirements](#accessibility-requirements)
10. [Testing Standards](#testing-standards)

---

## Code Style & Formatting

### Prettier Configuration

```javascript
// prettier.config.js
{
  arrowParens: 'avoid',        // (x) => x instead of x => x
  singleQuote: true,           // 'text' instead of "text"
  bracketSpacing: true,        // { foo } instead of {foo}
  endOfLine: 'lf',             // Unix line endings
  semi: false,                 // No semicolons
  tabWidth: 2,                 // 2 spaces indentation
  trailingComma: 'none'        // No trailing commas
}
```

**Auto-format command:** `npm run prettier`

### ESLint Rules

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-unused-vars": ["error", {}],
    "react/display-name": 0,           // Allow anonymous components
    "react/no-unescaped-entities": 0   // Allow apostrophes in JSX
  }
}
```

**Lint check:** `npm run lint`

### JavaScript/JSX Style

**Imports:**
```javascript
// Order: External → Internal → Relative
import { Container, Heading } from '@chakra-ui/react'  // External
import Layout from '@/components/layouts/article'      // Internal (alias)
import SEO from '../components/seo'                    // Relative
```

**Component Declaration:**
```javascript
// Functional components only (no class components)
const ComponentName = ({ prop1, prop2 }) => {
  return (
    // JSX
  )
}

export default ComponentName
```

**Arrow Functions:**
```javascript
// Prefer arrow functions over function keyword
const handleClick = () => {
  // logic
}

// No parentheses for single param
const items = data.map(item => item.name)
```

**Destructuring:**
```javascript
// Destructure props immediately
const MyComponent = ({ title, description, children }) => {
  // Avoid: props.title, props.description
}

// Destructure imports
import { useState, useEffect } from 'react'
```

---

## Naming Conventions

### Files & Directories

**Components:**
```
kebab-case for files with descriptive names
✅ animated-badge.js
✅ theme-toggle-button.js
✅ totoro-loader.js
❌ AB.js (too short)
❌ AnimatedBadge.js (PascalCase for files discouraged)
```

**Pages:**
```
kebab-case for Next.js pages
✅ index.js
✅ works.js
✅ audiophile.js
✅ works/foodlover.js
❌ Works.js
❌ AudioPhile.js
```

**Directories:**
```
kebab-case, plural for collections
✅ components/
✅ layouts/
✅ icons/
✅ works/
❌ Components/
❌ Layout/ (singular)
```

### Variables & Functions

**Constants:**
```javascript
// UPPER_SNAKE_CASE for true constants
const API_URL = 'https://api.example.com'
const MAX_RETRIES = 3

// camelCase for configuration objects
const colorPalette = {
  grassTeal: '#88ccca',
  forestGreen: '#7eb77f'
}
```

**Functions:**
```javascript
// camelCase, verb-first for actions
const handleSubmit = () => {}
const fetchUserData = async () => {}
const calculateTotal = (items) => {}

// Boolean functions start with is/has/should
const isAuthenticated = () => {}
const hasPermission = (user) => {}
const shouldRender = () => {}
```

**Components:**
```javascript
// PascalCase for React components
const AnimatedBadge = ({ children }) => {}
const WorkGridItem = ({ id, title }) => {}
const SEO = ({ title, description }) => {}

// Prefix with 'use' for hooks
const useColorMode = () => {}
const useScrollPosition = () => {}
```

**Props:**
```javascript
// camelCase for prop names
<AnimatedBadge colorScheme="green" delay={0.1} />

// Boolean props no value = true
<Component isActive />  // ✅
<Component isActive={true} />  // ❌ redundant
```

### CSS Classes

**Chakra UI:**
```javascript
// Use Chakra props, avoid custom classes
<Box bg="gray.100" p={4} borderRadius="md">  // ✅
<Box className="custom-box">  // ❌ avoid

// Exception: Global styles (GridItemStyle)
className="grid-item-thumbnail"  // ✅ for global CSS
```

**Emotion Styled:**
```javascript
// PascalCase for styled components
const WorkSection = styled(Box)`
  display: flex;
`
```

---

## File Organization

### Directory Conventions

**Maximum File Size:**
- Components: 200 LOC target (300 LOC hard limit)
- Pages: 400 LOC target (exception: index.js at 359 LOC)
- Utilities: 150 LOC target

**When to Split:**
- File exceeds 200 LOC → Extract sub-components or utilities
- Component has 3+ responsibilities → Separate concerns
- Duplicated code across 2+ files → Create shared module

### Component Structure

```javascript
// 1. Imports (external, internal, relative)
import { Box, Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Layout from '../layouts/article'
import SEO from '../seo'

// 2. Styled components (if using Emotion)
const StyledBox = styled(Box)`
  display: flex;
`

// 3. Constants
const ANIMATION_DURATION = 0.4

// 4. Component definition
const MyComponent = ({ title, children }) => {
  // 4a. Hooks
  const [state, setState] = useState(null)
  const ref = useRef(null)

  // 4b. Event handlers
  const handleClick = () => {
    // logic
  }

  // 4c. Effects
  useEffect(() => {
    // side effects
  }, [])

  // 4d. Render
  return (
    <Layout>
      <SEO title={title} />
      <StyledBox onClick={handleClick}>
        {children}
      </StyledBox>
    </Layout>
  )
}

// 5. PropTypes or TypeScript interfaces (future)

// 6. Memoization (if needed)
export default memo(MyComponent)

// 7. Named exports for sub-components
export { StyledBox }
```

### Page Structure

```javascript
// 1. Imports
import { Container, Heading } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import SEO from '../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../components/json-ld'

// 2. Page component
const ProjectPage = () => (
  <Layout title="Project Name">
    <Container>
      <SEO
        title="Project Name - Trương Tuấn Lộc"
        description="Project description"
        type="article"
      />
      <ProjectSchema project={{...}} />
      <BreadcrumbSchema items={[...]} />

      {/* Page content */}
    </Container>
  </Layout>
)

// 3. Data fetching (if needed)
export { getServerSideProps } from '../../components/chakra'
// or
export { getStaticProps } from '../../components/chakra'

// 4. Default export
export default ProjectPage
```

---

## Component Architecture

### Component Types

**1. Layout Components** (`layouts/`)
```javascript
// Wrap entire pages, provide structure
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)
```

**2. Page Components** (`pages/`)
```javascript
// Route-specific components
// Use Layout wrapper, SEO, JSON-LD
const HomePage = () => (
  <Layout>
    <SEO title="Homepage" />
    {/* Content */}
  </Layout>
)
```

**3. Feature Components** (`components/`)
```javascript
// Reusable UI components
// Single responsibility
// Accept props, no direct state access
const AnimatedBadge = ({ children, colorScheme, delay }) => {
  // Component logic
}
```

**4. Utility Components** (`components/`)
```javascript
// Wrappers for common patterns
// Section, Paragraph, FloatingBox
const Section = ({ children, delay = 0 }) => (
  <StyledDiv
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </StyledDiv>
)
```

### Composition Patterns

**Prefer Composition Over Inheritance:**
```javascript
// ✅ Good: Compose with wrappers
<Section delay={0.1}>
  <AnimatedBadge colorScheme="green">
    React.js
  </AnimatedBadge>
</Section>

// ❌ Bad: Deep inheritance hierarchy
class ExtendedAnimatedBadge extends AnimatedBadge {
  // Don't do this
}
```

**Container/Presentational Pattern:**
```javascript
// Container (logic)
const WorksContainer = () => {
  const projects = useProjects()  // Data fetching
  return <WorksGrid projects={projects} />
}

// Presentational (UI)
const WorksGrid = ({ projects }) => (
  <SimpleGrid columns={[1, 2]}>
    {projects.map(p => <WorkGridItem key={p.id} {...p} />)}
  </SimpleGrid>
)
```

**Render Props (rare, prefer hooks):**
```javascript
// Use hooks instead of render props
const useAuth = () => {
  const [user, setUser] = useState(null)
  return { user, setUser }
}

// In component
const { user } = useAuth()
```

---

## State Management

### Local State (useState)

```javascript
// Use for component-specific state
const [isOpen, setIsOpen] = useState(false)
const [count, setCount] = useState(0)

// Initialize with function for expensive computation
const [data, setData] = useState(() => {
  return computeExpensiveData()
})
```

### Refs (useRef)

```javascript
// For DOM references
const canvasRef = useRef(null)

useEffect(() => {
  const canvas = canvasRef.current
  // Manipulate DOM
}, [])

// For persisting values across renders
const prevCountRef = useRef(0)
```

### Context (React Context)

```javascript
// Global state: Color mode (via Chakra)
import { useColorMode, useColorModeValue } from '@chakra-ui/react'

const bg = useColorModeValue('white', 'gray.800')
const { colorMode, toggleColorMode } = useColorMode()
```

**Current Usage:**
- Color mode (Chakra context)
- Theme (Chakra context)

**Not Used:**
- Redux, MobX, Zustand (overkill for static site)
- Custom contexts (prefer props drilling for small app)

---

## Animation Patterns

### Framer Motion Standard Patterns

**1. Page Transitions:**
```javascript
// In article layout
const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

<motion.div
  initial="hidden"
  animate="enter"
  exit="exit"
  variants={variants}
  transition={{ duration: 0.4, type: 'easeInOut' }}
>
  {children}
</motion.div>
```

**2. Scroll-Triggered Animations:**
```javascript
// Fade-in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6 }}
>
  {content}
</motion.div>
```

**3. Hover Interactions:**
```javascript
// Lift + scale effect
<motion.div
  whileHover={{
    y: -8,
    scale: 1.02,
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {content}
</motion.div>
```

**4. Staggered Children:**
```javascript
// Parent container
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

**5. Continuous Animations:**
```javascript
// Infinite loop
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  {content}
</motion.div>
```

### Animation Timing Standards

| Type | Duration | Easing | Use Case |
|------|----------|--------|----------|
| Page transition | 0.4s | easeInOut | Route changes |
| Scroll fade-in | 0.6s | easeOut | Sections appearing |
| Hover lift | 0.2s | easeOut | Interactive feedback |
| Badge pop-in | 0.4s | Spring | Skill badges |
| Continuous float | 4s | easeInOut | Totoro container |

### Accessibility Considerations

```javascript
// Respect prefers-reduced-motion
const prefersReducedMotion = useReducedMotion()

<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
>
  {content}
</motion.div>
```

---

## Performance Guidelines

### Image Optimization

**Next.js Image Component:**
```javascript
import Image from 'next/image'

// ✅ Correct usage
<Image
  src="/images/project.png"
  alt="Project screenshot"
  width={800}
  height={600}
  quality={85}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// ❌ Avoid Chakra Image for large assets
<Image src="/images/project.png" alt="..." />  // No optimization
```

**Image Sizing:**
- Thumbnails: 400x300px
- Detail images: 800x600px
- Profile photo: 374x374px (already 2236x2236, needs resize)
- Target: < 300KB per image

### Code Splitting

**Dynamic Imports:**
```javascript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const Totoro = dynamic(() => import('../totoro'), {
  ssr: false,  // Client-side only
  loading: () => <TotoroSpinner />
})
```

**When to Split:**
- Component > 50KB minified
- Not needed on initial render
- Heavy dependencies (Three.js, Chart libraries)

### Memoization

**React.memo:**
```javascript
import { memo } from 'react'

// For pure components (same props = same output)
const WorkGridItem = memo(({ id, title, thumbnail }) => {
  return (
    // Component JSX
  )
})

export default WorkGridItem
```

**When to Memoize:**
- List items rendering 10+ times
- Components receiving complex props
- Expensive computations in render

**When NOT to Memoize:**
- Simple components (< 20 LOC)
- Components that rarely re-render
- Premature optimization

### Bundle Size Targets

| Chunk | Target | Current | Status |
|-------|--------|---------|--------|
| Main | < 500KB | ~450KB | ✅ |
| Three.js | < 200KB | ~180KB | ✅ |
| Chakra UI | < 150KB | ~130KB | ✅ |
| Framer Motion | < 100KB | ~85KB | ✅ |

**Check bundle:** `npm run analyze`

---

## SEO Standards

### Per-Page SEO Component

```javascript
import SEO from '../components/seo'

// Required on every page
<SEO
  title="Page Title - Trương Tuấn Lộc"
  description="150-160 character description for search results"
  keywords="keyword1, keyword2, keyword3"
  type="article"  // or "website", "profile"
  image="/images/page-specific-image.jpg"
/>
```

### JSON-LD Structured Data

**Homepage:**
```javascript
<PersonSchema />
<WebsiteSchema />
<ProfilePageSchema />
```

**Project Pages:**
```javascript
<ProjectSchema project={{
  title: "Project Name",
  description: "Full description",
  year: "2024",
  github: "https://github.com/...",
  image: "/images/project.png",
  stack: ["React", "Node.js", "MongoDB"]
}} />
<BreadcrumbSchema items={[
  { name: "Home", url: "https://..." },
  { name: "Works", url: "https://..." },
  { name: "Project Name", url: "https://..." }
]} />
```

### URL Structure

```
✅ Clean, descriptive URLs
/works
/works/foodlover
/activities/ytc
/audiophile/ea1000

❌ Avoid query parameters, IDs
/project?id=123
/p/1
```

### Meta Tags Checklist

- [ ] Unique title (< 60 characters)
- [ ] Unique description (150-160 characters)
- [ ] Relevant keywords (5-10)
- [ ] Open Graph tags (title, description, image, type, url)
- [ ] Twitter Card (summary_large_image)
- [ ] Canonical URL
- [ ] robots: index, follow
- [ ] language: en-US
- [ ] Mobile viewport

---

## Accessibility Requirements

### Semantic HTML

```javascript
// ✅ Use semantic elements
<nav>
  <Link href="/works">Works</Link>
</nav>
<main>
  <article>
    <h1>Page Title</h1>
    <p>Content</p>
  </article>
</main>
<footer>
  <p>Copyright</p>
</footer>

// ❌ Avoid div soup
<div class="nav">
  <div class="link">Works</div>
</div>
```

### Alt Text

```javascript
// ✅ Descriptive alt text
<Image
  src="/images/foodlover.png"
  alt="Food Lover app homepage showing restaurant listings and search bar"
/>

// ❌ Generic or missing alt
<Image src="..." alt="image" />
<Image src="..." />
```

### Keyboard Navigation

```javascript
// Ensure tab order
<Button onClick={handleClick}>Submit</Button>  // ✅ Focusable

// Custom interactive elements need tabIndex
<div onClick={handleClick} tabIndex={0} role="button">
  Custom Button
</div>
```

### Color Contrast

**Minimum Ratios (WCAG AA):**
- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

**Check:** Use browser DevTools contrast checker

### ARIA Labels

```javascript
// When text content not visible
<IconButton
  aria-label="Toggle dark mode"
  icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
  onClick={toggleColorMode}
/>

// For screen reader context
<nav aria-label="Main navigation">
  {/* Links */}
</nav>
```

---

## Testing Standards

### Manual Testing Checklist

**Pre-Deployment:**
- [ ] Lighthouse audit (Performance, Accessibility, Best Practices, SEO ≥ 97)
- [ ] Mobile responsiveness (iPhone SE, iPad, desktop)
- [ ] Dark/light mode toggle
- [ ] All links functional (no 404s)
- [ ] Images load correctly
- [ ] 3D model loads and rotates
- [ ] CV download works
- [ ] Social links open in new tab

**Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Unit Testing (Future)

**Planned Tooling:**
- Jest for unit tests
- React Testing Library for component tests
- Playwright/Cypress for E2E tests

**Coverage Targets:**
- Utilities: 80%
- Components: 60%
- Pages: 40%

**Test Examples:**
```javascript
// lib/theme.test.js
test('theme has correct grassTeal color', () => {
  expect(theme.colors.grassTeal).toBe('#88ccca')
})

// components/section.test.js
test('Section renders with delay', () => {
  render(<Section delay={0.5}>Content</Section>)
  expect(screen.getByText('Content')).toBeInTheDocument()
})
```

---

## Documentation Standards

### Inline Comments

**When to Comment:**
```javascript
// ✅ Complex logic, non-obvious code
// Calculate easing for 100-frame intro animation
const easeOutCirc = (x) => Math.sqrt(1 - Math.pow(x - 1, 2))

// ❌ Obvious code
const name = 'Loc'  // Set name to Loc
```

**Component Documentation:**
```javascript
/**
 * Animated badge component for skill tags
 *
 * @param {ReactNode} children - Badge text content
 * @param {string} colorScheme - Chakra color scheme (e.g., 'green', 'purple')
 * @param {number} delay - Animation delay in seconds (default: 0)
 */
const AnimatedBadge = ({ children, colorScheme, delay = 0 }) => {
  // Component implementation
}
```

### README Updates

**After Major Changes:**
- Update tech stack versions
- Update feature list
- Update performance metrics
- Update installation instructions

---

## Error Handling

### Try-Catch for Async Operations

```javascript
// Model loading
try {
  const model = await loadGLTFModel(scene, '/totoro-compressed.glb')
  setLoading(false)
} catch (error) {
  console.error('Failed to load 3D model:', error)
  setError(true)
}
```

### Graceful Degradation

```javascript
// Show fallback if 3D fails
{error ? (
  <Image src="/images/totoro-fallback.png" alt="Totoro" />
) : (
  <Totoro />
)}
```

### Error Boundaries (Future)

```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.error('Error caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

---

## Git Workflow

### Commit Messages (Conventional Commits)

```
Format: <type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation only
- style: Code style (formatting, no logic change)
- refactor: Code refactor (no feature/bug change)
- perf: Performance improvement
- test: Add/update tests
- chore: Build process, dependencies

Examples:
feat(homepage): add work experience timeline
fix(navbar): mobile menu not closing on route change
perf(images): compress project thumbnails to WebP
docs(readme): update installation instructions
```

### Branch Strategy

```
main (protected)
  ↓
feature/add-blog-section
feature/optimize-images
fix/mobile-menu-bug
```

**Pull Request Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Performance improvement
- [ ] Documentation update

## Testing
- [ ] Lighthouse audit passed
- [ ] Mobile responsive
- [ ] Dark/light mode tested
- [ ] No console errors

## Screenshots
(If UI changes)
```

---

## Deprecation Policy

**Before Removing Code:**
1. Mark as deprecated with comment
2. Log deprecation warning (console.warn)
3. Wait 1 release cycle
4. Remove in next version

**Example:**
```javascript
// @deprecated Use Section component instead (will be removed in v2.0)
const OldSection = () => {
  console.warn('OldSection is deprecated, use Section instead')
  // Implementation
}
```

---

## Performance Budget

| Metric | Budget | Current | Status |
|--------|--------|---------|--------|
| First Contentful Paint | < 1.5s | ~1.2s | ✅ |
| Time to Interactive | < 3.5s | ~2.8s | ✅ |
| Speed Index | < 3.0s | ~2.5s | ✅ |
| Total Blocking Time | < 200ms | ~150ms | ✅ |
| Cumulative Layout Shift | < 0.1 | ~0.05 | ✅ |
| Largest Contentful Paint | < 2.5s | ~1.8s | ✅ |

**Enforcement:** Block deployment if any metric exceeds budget

---

**Document Version:** 1.0
**Maintained By:** Trương Tuấn Lộc
**Review Frequency:** Quarterly
