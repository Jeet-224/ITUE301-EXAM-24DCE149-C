// Global error-handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : (err.message || 'Request failed');

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message
  });
};

module.exports = errorHandler;
