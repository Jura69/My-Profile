import { Helmet } from 'react-helmet-async'

export const PersonSchema = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Trương Tuấn Lộc',
        alternateName: 'Jura69',
        url: 'https://my-profile-jura69.vercel.app',
        image: 'https://my-profile-jura69.vercel.app/images/loc.jpeg',
        jobTitle: 'Full-stack Developer',
        worksFor: { '@type': 'Organization', name: 'CREASIA' },
        alumniOf: { '@type': 'EducationalOrganization', name: 'Nha Trang University' },
        knowsAbout: [
            'React.js', 'Node.js', 'C#', 'Next.js', 'Flutter',
            'MongoDB', 'Express.js', 'Full-stack Development',
            'Web Development', 'Backend Development', 'Machine Learning'
        ],
        sameAs: [
            'https://github.com/Jura69',
            'https://www.linkedin.com/in/tuấn-lộc-b24b391ab/',
            'https://www.facebook.com/loc.truongtuanMT',
            'https://www.instagram.com/_midori_neko_/'
        ],
        email: 'Loctruongtuan@gmail.com',
        address: { '@type': 'PostalAddress', addressCountry: 'VN', addressRegion: 'Việt Nam' }
    }

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    )
}

export const WebsiteSchema = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Trương Tuấn Lộc Portfolio',
        url: 'https://my-profile-jura69.vercel.app',
        description: 'Personal portfolio website of Trương Tuấn Lộc, a Full-stack Developer specializing in React, Node.js, and C#',
        author: { '@type': 'Person', name: 'Trương Tuấn Lộc' },
        inLanguage: 'en-US'
    }

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    )
}

export const ProfilePageSchema = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
            '@type': 'Person',
            name: 'Trương Tuấn Lộc',
            alternateName: 'Jura69',
            description: 'Full-stack developer with expertise in building scalable web applications and backend services',
            image: 'https://my-profile-jura69.vercel.app/images/loc.jpeg',
            sameAs: [
                'https://github.com/Jura69',
                'https://www.linkedin.com/in/tuấn-lộc-b24b391ab/',
                'https://www.facebook.com/loc.truongtuanMT'
            ]
        }
    }

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    )
}

interface BreadcrumbItem {
    name: string
    url: string
}

export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    }

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    )
}

interface ProjectData {
    title: string
    description: string
    year: string
    github: string
    image: string
    stack: string
}

export const ProjectSchema = ({ project }: { project: ProjectData }) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        author: { '@type': 'Person', name: 'Trương Tuấn Lộc' },
        dateCreated: project.year,
        url: project.github,
        image: project.image,
        keywords: project.stack
    }

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    )
}
