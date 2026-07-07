import { useLocation } from 'react-router'

interface SEOProps {
    title?: string
    description?: string
    image?: string
    type?: string
    keywords?: string
    author?: string
}

/**
 * Per-page metadata. React 19 hoists `<title>`/`<meta>`/`<link>` rendered here
 * into <head> (no react-helmet-async needed). This component owns the document
 * title for every route.
 */
const SEO = ({
    title = 'Trương Tuấn Lộc - Full-stack Developer',
    description = 'Full-stack developer specializing in React, Node.js, and C#. Building scalable web applications and backend services. Currently at CREASIA.',
    image = '/images/loc.jpeg',
    type = 'website',
    keywords = 'Full-stack Developer, React Developer, Node.js Developer, C# Developer, Web Development, Portfolio, Trương Tuấn Lộc, Jura69',
    author = 'Trương Tuấn Lộc'
}: SEOProps) => {
    const { pathname } = useLocation()
    const siteUrl = 'https://my-profile-jura69.vercel.app'
    const canonicalUrl = `${siteUrl}${pathname}`
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

    return (
        <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:alt" content={title} />
            <meta property="og:site_name" content="Trương Tuấn Lộc Portfolio" />
            <meta property="og:locale" content="en_US" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:creator" content="@Jura69" />
        </>
    )
}

export default SEO
