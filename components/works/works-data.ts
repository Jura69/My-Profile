/**
 * Single source for the Works listing, Home "Selected work", detail-page headers and pagers, the
 * prerendered routes and the sitemap. `category` picks the Works tab ("Enterprise" or "Personal");
 * `featured` puts a project on a large FeaturedProjectCard under "Flagship work" in its tab, the
 * rest become row cards. To promote/demote a flagship, just toggle `featured` here.
 */
/** Minimal shape a compact ProjectCard needs — also satisfied by the
 *  audiophile/activities listings (phase 5) which reuse ProjectCard via `to`. */
export interface CardItem {
    id: string
    title: string
    thumbnail: string
    /** Gouache cover base path; cards append `-480|640|1280.webp` for srcSet.
     *  Audio gear and activities have none and keep using `thumbnail`. */
    cover?: string
    /** One-line blurb; audiophile gear items may omit it. */
    description?: string
}

/** Every project route id; `selectedWork` and the detail pages are typed against it. */
export type ProjectId =
    | 'foodlover'
    | 'ecommerce'
    | 'tensorflow'
    | 'ticketapp'
    | 'ai-center'
    | 'planogram'
    | 'ocr-cccd'
    | 'advance-system'
    | 'mondelez-display'
    | 'asset-management'
    | 'bat-loyalty'
    | 'bat-psa'
    | 'castrol-fleet'
    | 'vending-ai-agent'
    | 'warehouse-management'
    | 'creasia-erp'

export interface Project extends CardItem {
    id: ProjectId
    /** Required for projects: the cover heads the detail page (and carries its H1). */
    cover: string
    description: string
    category: 'personal' | 'enterprise'
    featured?: boolean
    /** Shown as badges on featured cards; omitted on compact cards. */
    tech?: string[]
    /** Year shown on the detail page (eyebrow, facts) and in its ProjectSchema. */
    year: string
    /** Short description of the cover painting — its alt text where the cover heads the detail page. */
    coverAlt: string
    /** CSS object-position for the 2.4:1 detail-cover crop when the centre cuts the subject. */
    coverPosition?: string
    /** Eyebrow above the title on flagship and overlay cards ("Flagship · AI agents"). */
    kicker?: string
}

/** `srcSet` for a gouache cover: 480w for compact cards (~260px), 640w featured, 1280w hi-dpi. */
export const coverSrcSet = (cover: string) =>
    `${cover}-480.webp 480w, ${cover}-640.webp 640w, ${cover}-1280.webp 1280w`

export const projects: Project[] = [
    {
        id: 'foodlover',
        title: 'Foodlover',
        description:
            'Full-stack food ordering and recipe discovery platform. Browse recipes, place orders, and manage restaurants through an admin dashboard.',
        thumbnail: '/images/works/foodlover-cover-640.webp',
        cover: '/images/works/foodlover-cover',
        category: 'personal',
        year: '2023',
        coverAlt: 'Gouache forest kitchen stall with a steaming pot, an open recipe book and baskets of vegetables',
        kicker: 'Flagship · Full-stack web',
        featured: true,
        tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
        id: 'ecommerce',
        title: 'E-commerce Platform',
        description:
            'Full-stack e-commerce platform with a microservices architecture — backend API, React storefront, and event-driven email & notification services.',
        thumbnail: '/images/works/ecommerce-cover-640.webp',
        cover: '/images/works/ecommerce-cover',
        category: 'personal',
        year: '2024',
        coverAlt: 'Gouache village market street of wooden shop stalls under strings of paper lanterns',
        kicker: 'Flagship · Microservices',
        featured: true,
        tech: ['Node.js', 'React', 'MongoDB', 'Redis', 'RabbitMQ']
    },
    {
        id: 'tensorflow',
        title: 'TensorFlow SignLanguage',
        description:
            'Machine learning app using TensorFlow and computer vision to detect sign language gestures in real-time and convert them to text.',
        thumbnail: '/images/works/tensorflow-cover-640.webp',
        cover: '/images/works/tensorflow-cover',
        category: 'personal',
        year: '2024',
        coverAlt: 'Gouache pair of hands signing in a meadow, traced by a ribbon of golden light',
        kicker: 'Flagship · Machine learning',
        featured: true,
        tech: ['Python', 'TensorFlow', 'Computer Vision']
    },
    {
        id: 'ticketapp',
        title: 'Flutter Ticket App',
        description: 'Cross-platform mobile app for booking movie tickets, built with Flutter.',
        thumbnail: '/images/works/ticketapp-cover-640.webp',
        cover: '/images/works/ticketapp-cover',
        category: 'personal',
        year: '2024',
        coverAlt: 'Gouache open-air forest cinema with a glowing screen and rows of wooden benches'
    },
    {
        id: 'ai-center',
        title: 'Creasia AI Center',
        description:
            'Enterprise AI agent platform — multi-channel AI assistants with agent orchestration, custom skills & tools.',
        thumbnail: '/images/works/ai-center-cover-640.webp',
        cover: '/images/works/ai-center-cover',
        category: 'enterprise',
        year: '2026',
        coverAlt: 'Gouache treehouse hub with lanterns strung to small houses across the hills',
        kicker: 'Flagship · AI agents',
        featured: true,
        tech: ['Go', 'AI Agents', 'LLM Integration']
    },
    {
        id: 'planogram',
        title: 'Planogram AI',
        description:
            'AI-powered retail shelf compliance — verifies product placement automatically from shelf photos with computer vision.',
        thumbnail: '/images/works/planogram-cover-640.webp',
        cover: '/images/works/planogram-cover',
        category: 'enterprise',
        year: '2026',
        coverAlt: 'Gouache village shop shelf of jars under a floating brass lens',
        kicker: 'Flagship · Computer vision',
        featured: true,
        tech: ['AI', 'Computer Vision', 'Python', '.NET']
    },
    {
        id: 'ocr-cccd',
        title: 'OCR CCCD',
        description: 'AI-powered OCR that extracts structured data from Vietnamese ID cards',
        thumbnail: '/images/works/ocr-cccd-cover-640.webp',
        cover: '/images/works/ocr-cccd-cover',
        category: 'enterprise',
        year: '2026',
        coverAlt: 'Gouache wooden desk with a card under a brass magnifier',
        kicker: 'Document AI',
        // The card and magnifier sit low in the painting: keep them above the title band
        coverPosition: '50% 75%'
    },
    {
        id: 'advance-system',
        title: 'AdvanceSystem',
        description: 'Retail audit & field-force management platform for FMCG brands',
        thumbnail: '/images/works/advance-system-cover-640.webp',
        cover: '/images/works/advance-system-cover',
        category: 'enterprise',
        year: '2025',
        coverAlt: 'Gouache village street of wooden shopfronts with a field worker walking past'
    },
    {
        id: 'mondelez-display',
        title: 'Mondelez Display Management',
        description: 'Retail display program management with field operations & compliance auditing',
        thumbnail: '/images/works/mondelez-display-cover-640.webp',
        cover: '/images/works/mondelez-display-cover',
        category: 'enterprise',
        year: '2025',
        coverAlt: 'Gouache country shop with a bunting-trimmed display stand of boxed goods'
    },
    {
        id: 'asset-management',
        title: 'Asset Management',
        description: 'Enterprise asset tracking & lifecycle management platform',
        thumbnail: '/images/works/asset-management-cover-640.webp',
        cover: '/images/works/asset-management-cover',
        category: 'enterprise',
        year: '2024',
        coverAlt: 'Gouache sunlit storeroom with tagged wooden crates and a pegboard of tools'
    },
    {
        id: 'bat-loyalty',
        title: 'BAT Loyalty Program',
        description: 'Customer loyalty rewards & points management system',
        thumbnail: '/images/works/bat-loyalty-cover-640.webp',
        cover: '/images/works/bat-loyalty-cover',
        category: 'enterprise',
        year: '2024',
        coverAlt: 'Gouache glass jar of glowing gold coins on a windowsill desk'
    },
    {
        id: 'bat-psa',
        title: 'BAT PSA',
        description: 'Admin dashboard for problem statement analysis with reporting',
        thumbnail: '/images/works/bat-psa-cover-640.webp',
        cover: '/images/works/bat-psa-cover',
        category: 'enterprise',
        year: '2024',
        coverAlt: 'Gouache night study desk with a pinboard of notes, books and a lit lamp'
    },
    {
        id: 'castrol-fleet',
        title: 'Castrol Fleet Management',
        description: 'Vehicle fleet tracking with geolocation & maintenance scheduling',
        thumbnail: '/images/works/castrol-fleet-cover-640.webp',
        cover: '/images/works/castrol-fleet-cover',
        category: 'enterprise',
        year: '2024',
        coverAlt: 'Gouache line of small vans on a hill road above a map and a farm garage'
    },
    {
        id: 'vending-ai-agent',
        title: 'Vending Management',
        description: 'Vending machine management platform with sales analytics & inventory tracking',
        thumbnail: '/images/works/vending-ai-agent-cover-640.webp',
        cover: '/images/works/vending-ai-agent-cover',
        category: 'enterprise',
        year: '2025',
        coverAlt: 'Gouache vending machine beside a notice board under a big tree at dusk'
    },
    {
        id: 'warehouse-management',
        title: 'Warehouse Management',
        description: 'Inventory tracking with barcode scanning & order workflows',
        thumbnail: '/images/works/warehouse-management-cover-640.webp',
        cover: '/images/works/warehouse-management-cover',
        category: 'enterprise',
        year: '2024',
        coverAlt: 'Gouache barn warehouse with labelled crates on tall shelves and a conveyor'
    },
    {
        id: 'creasia-erp',
        title: 'Creasia ERP',
        description: 'Comprehensive ERP covering finance, HR, procurement & supply chain',
        thumbnail: '/images/works/creasia-erp-cover-640.webp',
        cover: '/images/works/creasia-erp-cover',
        category: 'enterprise',
        year: '2025',
        coverAlt: 'Gouache bird’s-eye view of a village with farms, workshops and fields by a river'
    }
]

/** Look up a project by id. Throws (so the prerender fails) when the entry is missing. */
export function findProject(id: ProjectId): Project {
    const project = projects.find(p => p.id === id)
    if (!project) throw new Error(`works-data: no project "${id}"`)
    return project
}

/** Projects of one category in listing order — the Works tab panels and the detail-page pager. */
export const projectsInCategory = (category: Project['category']) => projects.filter(p => p.category === category)

/** 3 personal flagships, rendered as large cards. */
export const featuredProjects = projects.filter(p => p.category === 'personal' && p.featured)
/** Remaining personal work (e.g. ticketapp) — compact grid under Personal Projects. */
export const otherPersonalProjects = projects.filter(p => p.category === 'personal' && !p.featured)
/** AI flagships built at Creasia — large cards leading the enterprise section. */
export const featuredEnterpriseProjects = projects.filter(p => p.category === 'enterprise' && p.featured)
/** Remaining enterprise work built at Creasia — compact grid. */
export const enterpriseProjects = projects.filter(p => p.category === 'enterprise' && !p.featured)

/** Activities listing — single source shared by the page and the build-time sitemap. */
export const activities: CardItem[] = [
    {
        id: 'ytc',
        title: 'YTC NTU',
        thumbnail: '/images/activities/Ytc1.webp',
        description: 'Social Media, Design and Event Management Club at Nha Trang University.'
    }
]

/** Audiophile gear listing — single source shared by the page and the build-time sitemap. */
export const audioGear: CardItem[] = [
    { id: 'ea1000', title: 'Simgot EA1000 Fermat', thumbnail: '/images/audiophile/ea1000.webp' },
    { id: 'moondrop-ssp', title: 'Moondrop SSP', thumbnail: '/images/audiophile/ssp.webp' },
    { id: 'onix', title: 'Onix Alpha XI1', thumbnail: '/images/audiophile/onix.webp' },
    { id: 'fiioka11', title: 'Fiio Ka11', thumbnail: '/images/audiophile/ka11.webp' }
]
