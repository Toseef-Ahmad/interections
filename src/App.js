import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import pages from './pages';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import './App.css';

function Home() {
  const siteUrl = process.env.PUBLIC_URL || 'https://toseef-ahmad.github.io/interections';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(pages.map(p => p.category).filter(Boolean))];
    return cats.sort();
  }, []);

  // Filter and sort pages
  const filteredPages = useMemo(() => {
    let filtered = [...pages];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(page => {
        const title = (page.title || page.name).toLowerCase();
        const desc = (page.description || '').toLowerCase();
        const tags = (page.tags || []).join(' ').toLowerCase();
        return title.includes(query) || desc.includes(query) || tags.includes(query);
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(page => page.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'recent':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'name':
        default:
          const nameA = (a.title || a.name).toLowerCase();
          const nameB = (b.title || b.name).toLowerCase();
          return nameA.localeCompare(nameB);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Featured tools
  const featuredPages = useMemo(() => {
    return pages.filter(p => p.featured).slice(0, 3);
  }, []);

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
          <p className="subtitle">Free online calculators and math tools. No installation required.</p>
        </header>

        <SearchBar onSearch={setSearchQuery} />

        {featuredPages.length > 0 && !searchQuery && selectedCategory === 'all' && (
          <section className="tools-section">
            <h2 className="section-title">Featured Tools</h2>
            <div className="pages-grid">
              {featuredPages.map((page) => {
                const pageName = page.title || page.name.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                return (
                  <article key={page.name} className="tool-card featured" onClick={() => window.location.href = `/${page.name}`}>
                    <div className="tool-card-header">
                      <div className="tool-badge">Featured</div>
                      <h3>{pageName}</h3>
                    </div>
                    {page.description && (
                      <p className="tool-description">{page.description}</p>
                    )}
                    <div className="tool-card-footer">
                      <Link to={`/${page.name}`} className="tool-link" aria-label={`Open ${pageName}`} onClick={(e) => e.stopPropagation()}>
                        Open Tool
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {categories.length > 0 && (
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        )}

        {filteredPages.length > 0 ? (
          <section className="tools-section">
            <h2 className="section-title">
              {searchQuery ? `Search Results (${filteredPages.length})` : 'All Tools'}
            </h2>
            <div className="pages-grid">
              {filteredPages.map((page) => {
                const pageName = page.title || page.name.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                return (
                  <article key={page.name} className="tool-card" onClick={() => window.location.href = `/${page.name}`}>
                    <div className="tool-card-header">
                      {page.category && (
                        <span className="tool-category">{page.category}</span>
                      )}
                      <h3>{pageName}</h3>
                    </div>
                    {page.description && (
                      <p className="tool-description">{page.description}</p>
                    )}
                    {page.tags && page.tags.length > 0 && (
                      <div className="tool-tags">
                        {page.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tool-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="tool-card-footer">
                      <Link to={`/${page.name}`} className="tool-link" aria-label={`Open ${pageName}`} onClick={(e) => e.stopPropagation()}>
                        Open Tool
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="empty-state">
            <h2>No tools found</h2>
            <p>{searchQuery ? 'Try a different search term or clear filters.' : 'Tools will appear here once they are added.'}</p>
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
  // In development, use empty basename. In production (GitHub Pages), use /interections
  const basename = process.env.NODE_ENV === 'production' ? (process.env.PUBLIC_URL || '/interections') : '';
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        {pages.map((page) => {
          const isFullPage = page.name.includes('mechanical-gear-calculator');
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

