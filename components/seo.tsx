import { useLocation } from 'react-router'
import { SITE_NAME, SITE_ORIGIN, markdownPathFor } from '../lib/site'

interface SEOProps {
    title?: string
    description?: string
    image?: string
    type?: string
    keywords?: string
    author?: string
    /** Alt text for the social card; defaults to the title. */
    imageAlt?: string
    /** Keep the page out of search indexes (404). Also drops canonical, og:url and the markdown twin. */
    noindex?: boolean
}

/**
 * Per-page metadata. React 19 hoists `<title>`/`<meta>`/`<link>` rendered here
 * into <head> (no react-helmet-async needed). This component owns the document
 * title for every route. The build-time prerender (src/entry-server.tsx) moves these
 * tags into the static HTML <head>, so crawlers that never run JS read them too.
 */
const SEO = ({
    title = 'Trương Tuấn Lộc - Full-stack Developer',
    description = 'Full-stack developer specializing in React, Node.js, and C#. Building scalable web applications and backend services. Currently at CREASIA.',
    image = '/images/og-image-spirit.jpg',
    type = 'website',
    keywords = 'Full-stack Developer, React Developer, Node.js Developer, C# Developer, Web Development, Portfolio, Trương Tuấn Lộc, Jura69',
    author = 'Trương Tuấn Lộc',
    imageAlt,
    noindex = false
}: SEOProps) => {
    const { pathname } = useLocation()
    const canonicalUrl = `${SITE_ORIGIN}${pathname}`
    const imageUrl = image.startsWith('http') ? image : `${SITE_ORIGIN}${image}`
    // Shared 1200×630 cards (site + per-project JPGs) declare their size so unfurlers skip a fetch.
    const isCardSize = /\/images\/(og-image[^/]*|og\/[^/]+)\.jpg$/.test(imageUrl)

    return (
        <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            {!noindex && <link rel="canonical" href={canonicalUrl} />}
            {!noindex && (
                <link rel="alternate" type="text/markdown" href={`${SITE_ORIGIN}${markdownPathFor(pathname)}`} />
            )}
            <meta property="og:type" content={type} />
            {!noindex && <meta property="og:url" content={canonicalUrl} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            {isCardSize && <meta property="og:image:width" content="1200" />}
            {isCardSize && <meta property="og:image:height" content="630" />}
            <meta property="og:image:alt" content={imageAlt ?? title} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />
            <meta name="twitter:card" content="summary_large_image" />
            {!noindex && <meta name="twitter:url" content={canonicalUrl} />}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:image:alt" content={imageAlt ?? title} />
            <meta name="twitter:creator" content="@Jura69" />
        </>
    )
}

export default SEO
