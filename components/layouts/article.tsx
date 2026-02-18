import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { GridItemStyle } from '../grid-item'

const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 20 }
}

interface ArticleLayoutProps {
    children: React.ReactNode
    title?: string
}

const Layout = ({ children, title }: ArticleLayoutProps) => {
    const t = title ? `${title} - Jura69` : 'Jura69'
    return (
        <motion.article
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.4, type: 'easeInOut' }}
            style={{ position: 'relative' }}
        >
            <>
                {title && (
                    <Helmet>
                        <title>{t}</title>
                        <meta name="twitter:title" content={t} />
                        <meta property="og:title" content={t} />
                    </Helmet>
                )}
                {children}
                <GridItemStyle />
            </>
        </motion.article>
    )
}

export default Layout
