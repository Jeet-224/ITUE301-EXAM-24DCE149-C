import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="page-container">
      <header className="hero-section">
        <h1>Library Book Management System</h1>
        <p>Welcome to the digital portal. Easily catalog books, track active members, and manage borrowings.</p>
        <div className="hero-actions">
          <Link to="/books" className="btn btn-primary">
            View Books Catalog
          </Link>
          <Link to="/borrow" className="btn btn-secondary">
            Request Book Borrowing
          </Link>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p className="stat-number">150+</p>
          <span className="stat-label">In circulation</span>
        </div>
        <div className="stat-card">
          <h3>Active Members</h3>
          <p className="stat-number">45</p>
          <span className="stat-label">Registered students</span>
        </div>
        <div className="stat-card">
          <h3>Borrowed Books</h3>
          <p className="stat-number">18</p>
          <span className="stat-label">Pending return</span>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h4>📖 Catalog Access</h4>
            <p>Access the complete list of available books in the library. Filter by category, status, and authors.</p>
          </div>
          <div className="feature-item">
            <h4>📝 Borrow Tracker</h4>
            <p>Submit borrowing requests digitally and keep track of return dates to avoid overdue status.</p>
          </div>
          <div className="feature-item">
            <h4>⚙️ Mongoose Schemas</h4>
            <p>Uses modern MongoDB validation to enforce data integrity across members and book borrowing histories.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
