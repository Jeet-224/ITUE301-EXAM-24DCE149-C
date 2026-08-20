import React, { useState } from 'react';

const BorrowPage = () => {
  // Task 2: Managing form data with multiple state values
  const [memberName, setMemberName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // UI state for response feedback
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      // Send borrowing data to backend
      const response = await fetch('http://localhost:5000/api/v1/borrowings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberName,
          bookTitle,
          borrowDate,
          returnDate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Borrowing record saved successfully!' });
        // Reset form
        setMemberName('');
        setBookTitle('');
        setBorrowDate('');
        setReturnDate('');
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to submit.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Could not connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-layout">
        <div className="form-card">
          <h2>Request Borrowing</h2>
          <p className="form-subtitle">Enter details to record a book checkout.</p>
          
          {submitStatus && (
            <div className={`form-alert ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="borrow-form">
            <div className="form-group">
              <label htmlFor="memberName">Member Name</label>
              <input
                type="text"
                id="memberName"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter member's full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bookTitle">Book Title</label>
              <input
                type="text"
                id="bookTitle"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="borrowDate">Borrow Date</label>
                <input
                  type="date"
                  id="borrowDate"
                  value={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Submitting...' : 'Register Borrowing'}
            </button>
          </form>
        </div>

        {/* Live Preview Display (Task 2 Requirement) */}
        <div className="preview-card">
          <h3>Form Live Preview</h3>
          <p className="preview-desc">This card dynamically updates as you type to reflect the state variables.</p>
          
          <div className="preview-content">
            <div className="preview-item">
              <span className="preview-label">Member:</span>
              <span className="preview-value">{memberName || <em className="placeholder">Pending input...</em>}</span>
            </div>
            
            <div className="preview-item">
              <span className="preview-label">Book Title:</span>
              <span className="preview-value">{bookTitle || <em className="placeholder">Pending input...</em>}</span>
            </div>
            
            <div className="preview-item">
              <span className="preview-label">Borrow Date:</span>
              <span className="preview-value">{borrowDate || <em className="placeholder">Not selected</em>}</span>
            </div>
            
            <div className="preview-item">
              <span className="preview-label">Return Date:</span>
              <span className="preview-value">{returnDate || <em className="placeholder">Not selected</em>}</span>
            </div>
          </div>

          {(memberName || bookTitle) && (
            <div className="preview-summary">
              <strong>Quick Summary:</strong> {memberName || 'Member'} is borrowing <em>"{bookTitle || 'Book'}"</em>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowPage;
