import React from 'react';

const BookCard = ({ title, author, category, available }) => {
  return (
    <div className="book-card">
      <div className="book-card-header">
        <span className="book-category">{category}</span>
        <span className={`status-badge ${available ? 'available' : 'unavailable'}`}>
          {available ? 'Available' : 'Not Available'}
        </span>
      </div>
      <h3 className="book-title">{title}</h3>
      <p className="book-author">By {author}</p>
    </div>
  );
};

export default BookCard;
