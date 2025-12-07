import React from 'react';
import SEO from './SEO';
import './PageWrapper.css';

function PageWrapper({ 
  children, 
  title, 
  description, 
  keywords,
  image,
  url 
}) {
  // Generate URL from title if not provided
  const pageUrl = url || (title ? `/${title.toLowerCase().replace(/\s+/g, '-')}` : '/');

  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        url={pageUrl}
      />
      {children}
    </>
  );
}

export default PageWrapper;

