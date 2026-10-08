/**
 * JSON-LD structured data. Rendered as inline <script> (no react-helmet-async).
 * Search crawlers read ld+json anywhere in the DOM, so body placement is fine;
 * dangerouslySetInnerHTML keeps React from interfering with the script content.
 */
function JsonLd({ schema }: { schema: object }) {
    // Escape `<` so a stray "</script>" inside any string can never break out.
    const json = JSON.stringify(schema).replace(/</g, '\\u003c')
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export const PersonSchema = () => (
    <JsonLd
        schema={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Trương Tuấn Lộc',
            alternateName: 'Jura69',
            url: 'https://jura69.vercel.app',
            image: 'https://jura69.vercel.app/images/loc.webp',
            jobTitle: 'Full-stack Developer',
            worksFor: { '@type': 'Organization', name: 'CREASIA' },
            alumniOf: { '@type': 'EducationalOrganization', name: 'Nha Trang University' },
            knowsAbout: [
                'React.js',
                'Node.js',
                'C#',
                'Next.js',
                'Flutter',
                'MongoDB',
                'Express.js',
                'Full-stack Development',
                'Web Development',
                'Backend Development',
                'Machine Learning'
            ],
            sameAs: [
                'https://github.com/Jura69',
                'https://www.linkedin.com/in/tuấn-lộc-b24b391ab/',
                'https://www.facebook.com/loc.truongtuanMT',
                'https://www.instagram.com/_midori_neko_/'
            ],
            email: 'Loctruongtuan@gmail.com',
            address: { '@type': 'PostalAddress', addressCountry: 'VN', addressRegion: 'Việt Nam' }
        }}
    />
)

export const WebsiteSchema = () => (
    <JsonLd
        schema={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Trương Tuấn Lộc Portfolio',
            url: 'https://jura69.vercel.app',
            description:
                'Personal portfolio website of Trương Tuấn Lộc, a Full-stack Developer specializing in React, Node.js, and C#',
            author: { '@type': 'Person', name: 'Trương Tuấn Lộc' },
            inLanguage: 'en-US'
        }}
    />
)

export const ProfilePageSchema = () => (
    <JsonLd
        schema={{
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            mainEntity: {
                '@type': 'Person',
                name: 'Trương Tuấn Lộc',
                alternateName: 'Jura69',
                description:
                    'Full-stack developer with expertise in building scalable web applications and backend services',
                image: 'https://jura69.vercel.app/images/loc.webp',
                sameAs: [
                    'https://github.com/Jura69',
                    'https://www.linkedin.com/in/tuấn-lộc-b24b391ab/',
                    'https://www.facebook.com/loc.truongtuanMT'
                ]
            }
        }}
    />
)

interface BreadcrumbItem {
    name: string
    url: string
}

export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => (
    <JsonLd
        schema={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url
            }))
        }}
    />
)

interface ProjectData {
    title: string
    description: string
    year: string
    github?: string
    image: string
    stack: string
}

export const ProjectSchema = ({ project }: { project: ProjectData }) => (
    <JsonLd
        schema={{
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            author: { '@type': 'Person', name: 'Trương Tuấn Lộc' },
            dateCreated: project.year,
            ...(project.github && { url: project.github }),
            image: project.image,
            keywords: project.stack
        }}
    />
)
