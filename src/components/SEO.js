import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = 'website',
  author = 'Interections'
}) {
  const siteUrl = process.env.PUBLIC_URL || 'https://toseef-ahmad.github.io/interections';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.png`;
  const siteName = 'Interections - React Interactive Components';

  // Default description if not provided
  const metaDescription = description || 'Interactive React components and demos';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'WebPage',
          "name": title || siteName,
          "description": metaDescription,
          "url": fullUrl,
          "image": imageUrl,
          "author": {
            "@type": "Person",
            "name": author
          },
          "publisher": {
            "@type": "Organization",
            "name": siteName,
            "url": siteUrl
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
          }
        })}
      </script>
    </Helmet>
  );
}

export default SEO;

