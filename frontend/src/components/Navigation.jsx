import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          📚 LibraryManager
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/books" className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}>
            Books Catalog
          </Link>
          <Link to="/borrow" className={`nav-link ${location.pathname === '/borrow' ? 'active' : ''}`}>
            Borrow Book
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
