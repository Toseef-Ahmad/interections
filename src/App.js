import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import pages from './pages';
import './App.css';

function Home() {
  const siteUrl = process.env.PUBLIC_URL || 'https://toseef-ahmad.github.io/interections';
  
  return (
    <>
      <Helmet>
        <title>Interections - Free Interactive Math Tools & Calculators</title>
        <meta name="description" content="Free online interactive calculators and math tools. Pascal's Triangle, Matrix Calculator, Mechanical Calculator, and more. Step-by-step solutions, visual feedback, and educational resources." />
        <meta name="keywords" content="online calculator, free calculator, interactive calculator, math tools, pascal triangle calculator, matrix calculator, inverse matrix calculator, mechanical calculator, step by step calculator, visual calculator, educational math tools, linear algebra calculator, combinatorics calculator" />
        <meta property="og:title" content="Interections - Free Interactive Math Tools & Calculators" />
        <meta property="og:description" content="Free online interactive calculators and math tools with step-by-step solutions. Perfect for students and professionals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <link rel="canonical" href={siteUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Interections",
            "description": "Free online interactive calculators and math tools with step-by-step solutions",
            "url": siteUrl,
            "keywords": "online calculator, free calculator, interactive calculator, math tools, pascal triangle, matrix calculator",
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${siteUrl}/?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            },
            "about": {
              "@type": "Thing",
              "name": "Interactive Mathematical Tools and Calculators"
            }
          })}
        </script>
      </Helmet>
      <div className="home-container">
        <header className="home-header">
          <h1>Interections</h1>
          <p className="subtitle">A collection of React interactive components</p>
        </header>
        <div className="pages-grid">
          {pages.map((page) => {
            const pageName = page.title || page.name.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            return (
              <article key={page.name} className="page-card">
                <h3>{pageName}</h3>
                {page.description && <p className="page-description">{page.description}</p>}
                <Link to={`/${page.name}`} className="page-link" aria-label={`View ${pageName} component`}>
                  View Component →
                </Link>
              </article>
            );
          })}
        </div>
        {pages.length === 0 && (
          <div className="empty-state">
            <h2>No components yet</h2>
            <p>Create your first component using: npm run create:page component-name</p>
          </div>
        )}
      </div>
    </>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/interections' || location.pathname === '/interections/';

  return (
    <div className="app-container">
      {!isHome && (
        <nav className="nav-bar">
          <Link to="/" className="nav-link">← Back to Home</Link>
        </nav>
      )}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

// Wrapper component to add SEO to each page
function PageRoute({ page }) {
  const PageComponent = page.component;
  
  return (
    <>
      {page.title && (
        <Helmet>
          <title>{page.title} | Interections</title>
          {page.description && <meta name="description" content={page.description} />}
          {page.keywords && <meta name="keywords" content={page.keywords} />}
          {page.description && <meta property="og:description" content={page.description} />}
          {page.title && <meta property="og:title" content={`${page.title} | Interections`} />}
          <link rel="canonical" href={`${process.env.PUBLIC_URL || 'https://toseef-ahmad.github.io/interections'}/${page.name}`} />
        </Helmet>
      )}
      <PageComponent />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        {pages.map((page) => {
          const isFullPage = page.name.includes('mechanical-gear');
          return (
            <Route
              key={page.name}
              path={`/${page.name}`}
              element={
                isFullPage ? (
                  <PageRoute page={page} />
                ) : (
                  <Layout>
                    <PageRoute page={page} />
                  </Layout>
                )
              }
            />
          );
        })}
        <Route path="*" element={<Layout><div className="not-found">Page not found</div></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

