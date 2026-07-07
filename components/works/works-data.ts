/**
 * Single source for the Works listing (ported from the old Chakra works.tsx).
 * `featured` flips a project onto a large FeaturedProjectCard; `category`
 * splits the page into "Personal Projects" and "Enterprise @ Creasia".
 * To promote/demote a flagship, just toggle `featured` here.
 */
export interface Project {
    id: string
    title: string
    description: string
    thumbnail: string
    category: 'personal' | 'enterprise'
    featured?: boolean
    /** Shown as badges on featured cards; omitted on compact cards. */
    tech?: string[]
}

export const projects: Project[] = [
    {
        id: 'foodlover',
        title: 'Foodlover',
        description:
            'Full-stack food ordering and recipe discovery platform. Browse recipes, place orders, and manage restaurants through an admin dashboard.',
        thumbnail: '/images/works/foodlover-thumb.webp',
        category: 'personal',
        featured: true,
        tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
        id: 'ecommerce',
        title: 'E-commerce Platform',
        description:
            'Full-stack e-commerce platform with a microservices architecture — backend API, React storefront, and event-driven email & notification services.',
        thumbnail: '/images/works/ecommerce-thumb.webp',
        category: 'personal',
        featured: true,
        tech: ['Node.js', 'React', 'MongoDB', 'Redis', 'RabbitMQ']
    },
    {
        id: 'tensorflow',
        title: 'TensorFlow SignLanguage',
        description:
            'Machine learning app using TensorFlow and computer vision to detect sign language gestures in real-time and convert them to text.',
        thumbnail: '/images/works/tensorflow-thumb.webp',
        category: 'personal',
        featured: true,
        tech: ['Python', 'TensorFlow', 'Computer Vision']
    },
    {
        id: 'ticketapp',
        title: 'Flutter Ticket App',
        description: 'Cross-platform mobile app for booking movie tickets, built with Flutter.',
        thumbnail: '/images/works/ticketapp-thumb.webp',
        category: 'personal'
    },
    {
        id: 'asset-management',
        title: 'Asset Management',
        description: 'Enterprise asset tracking & lifecycle management platform',
        thumbnail: '/images/works/asset-management-thumb.webp',
        category: 'enterprise'
    },
    {
        id: 'bat-loyalty',
        title: 'BAT Loyalty Program',
        description: 'Customer loyalty rewards & points management system',
        thumbnail: '/images/works/bat-loyalty-thumb.webp',
        category: 'enterprise'
    },
    {
        id: 'bat-psa',
        title: 'BAT PSA',
        description: 'Admin dashboard for problem statement analysis with reporting',
        thumbnail: '/images/works/bat-psa-thumb.webp',
        category: 'enterprise'
    },
    {
        id: 'castrol-fleet',
        title: 'Castrol Fleet Management',
        description: 'Vehicle fleet tracking with geolocation & maintenance scheduling',
        thumbnail: '/images/works/castrol-fleet-thumb.webp',
        category: 'enterprise'
    },
    {
        id: 'vending-ai-agent',
        title: 'Vending Management',
        description: 'Vending machine management platform with sales analytics & inventory tracking',
        thumbnail: '/images/works/vending-ai-agent-thumb.webp',
        category: 'enterprise'
    },
    {
        id: 'warehouse-management',
        title: 'Warehouse Management',
        description: 'Inventory tracking with barcode scanning & order workflows',
        thumbnail: '/images/works/warehouse-management-thumb.webp',
        category: 'enterprise'
    },
    {
        id: 'creasia-erp',
        title: 'Creasia ERP',
        description: 'Comprehensive ERP covering finance, HR, procurement & supply chain',
        thumbnail: '/images/works/creasia-erp-thumb.webp',
        category: 'enterprise'
    }
]

/** 3 personal flagships, rendered as large cards. */
export const featuredProjects = projects.filter(p => p.featured)
/** Remaining personal work (e.g. ticketapp) — compact grid under Personal Projects. */
export const otherPersonalProjects = projects.filter(p => p.category === 'personal' && !p.featured)
/** Enterprise work built at Creasia — compact grid. */
export const enterpriseProjects = projects.filter(p => p.category === 'enterprise')
