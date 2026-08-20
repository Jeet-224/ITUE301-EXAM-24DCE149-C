import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  // Task 4: Maintain three states: data, loading, and error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book catalog from backend API on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:5000/api/v1/books');
        if (!response.ok) {
          throw new Error(`Failed to fetch books (Status: ${response.status})`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message || 'Something went wrong while fetching books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="page-container">
      <div className="catalog-header">
        <h2>Books Catalog</h2>
        <p>Explore the list of academic books, references, and textbooks available in the library.</p>
      </div>

      {/* 1. Display a loading indicator while request is in progress */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading library catalog...</p>
        </div>
      )}

      {/* 2. Display an error message if the request fails */}
      {error && (
        <div className="error-card">
          <h4>⚠️ Error Loading Data</h4>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-secondary btn-sm">
            Try Again
          </button>
        </div>
      )}

      {/* 3. Display the book data after a successful request */}
      {!loading && !error && (
        <>
          {data.length === 0 ? (
            <div className="empty-catalog">
              <p>No books found in the library catalog.</p>
            </div>
          ) : (
            <div className="books-grid">
              {data.map((book) => (
                <BookCard
                  key={book.isbn || book.id || book._id || book.title}
                  title={book.title}
                  author={book.author}
                  category={book.category}
                  available={book.available}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BooksPage;
