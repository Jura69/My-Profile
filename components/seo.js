import Head from 'next/head'
import { useRouter } from 'next/router'

const SEO = ({
  title = 'Trương Tuấn Lộc - Full-stack Developer',
  description = 'Full-stack developer specializing in React, Node.js, and C#. Building scalable web applications and backend services. Currently at CREASIA.',
  image = '/images/loc.jpeg',
  type = 'website',
  keywords = 'Full-stack Developer, React Developer, Node.js Developer, C# Developer, Web Development, Portfolio, Trương Tuấn Lộc, Jura69',
  author = 'Trương Tuấn Lộc'
}) => {
  const router = useRouter()
  const siteUrl = 'https://my-profile-jura69.vercel.app' // Update với domain thực của bạn
  const canonicalUrl = `${siteUrl}${router.asPath}`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Trương Tuấn Lộc Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@Jura69" />

      {/* Viewport & Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#88ccca" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Additional Meta */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  )
}

export default SEO
