interface ArticleLayoutProps {
    children: React.ReactNode
    /**
     * Deprecated: the document title now comes from the per-page `<SEO>` component
     * (React 19 native metadata). Kept so existing `<Layout title="…">` call sites
     * stay valid; the value is intentionally unused.
     */
    title?: string
}

/**
 * Page wrapper. Now a thin structural boundary — the page-transition animation
 * lives in app.tsx and metadata lives in `<SEO>`, so this just renders children.
 */
const Layout = ({ children }: ArticleLayoutProps) => <>{children}</>

export default Layout
