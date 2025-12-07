import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import pages from './pages';
import './App.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Interections</h1>
        <p className="subtitle">A collection of React interactive components</p>
      </header>
      <div className="pages-grid">
        {pages.map((page) => {
          const pageName = page.name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
          return (
            <div key={page.name} className="page-card">
              <h3>{pageName}</h3>
              <Link to={`/${page.name}`} className="page-link">
                View Component →
              </Link>
            </div>
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

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {pages.map((page) => (
            <Route
              key={page.name}
              path={`/${page.name}`}
              element={<page.component />}
            />
          ))}
          <Route path="*" element={<div className="not-found">Page not found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

