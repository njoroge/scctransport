// Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next error handling middleware
};

// General error handling middleware
// This will catch any errors passed by next(error)
const errorHandler = (err, req, res, next) => {
  // Sometimes an error might come with a status code, otherwise default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Send a JSON response with the error message
  // In development, you might want to send the stack trace as well
  res.json({
    message: err.message,
    // Send stack trace only in development mode for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
