const AppError = require("../errors/AppError");
const errorHandler = (err, req, res, next) => {

  // Hide internal error details from users in production environments
  const message = err.isOperational ? err.message : 'Something went wrong';

  if (err instanceof AppError) {
    res.status(400).json({
      message: err.message,
    })
  }

  // Set defaults if missing
  err.statusCode = err.statusCode || 500;

  // Log error for internal tracking
  // console.error('💥 Error:', err.stack);

  res.status(err.statusCode).json({
    success: false,
    message: message,
    // Include stack trace only during local development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
