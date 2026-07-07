import { Helmet } from 'react-helmet-async'

interface ArticleLayoutProps {
    children: React.ReactNode
    title?: string
}

/**
 * Page wrapper: sets the per-page tab/OG title (kept on react-helmet-async until
 * phase 6). The page-transition animation lives one level up in app.tsx (a single
 * keyed motion element that fades each route in) — see the note there.
 */
const Layout = ({ children, title }: ArticleLayoutProps) => {
    const t = title ? `${title} - Jura69` : 'Jura69'
    return (
        <>
            {title && (
                <Helmet>
                    <title>{t}</title>
                    <meta name="twitter:title" content={t} />
                    <meta property="og:title" content={t} />
                </Helmet>
            )}
            {children}
        </>
    )
}

export default Layout
