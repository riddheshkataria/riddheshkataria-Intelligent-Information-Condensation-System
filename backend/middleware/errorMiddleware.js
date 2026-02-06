// This middleware will catch any error that occurs and send a clean JSON response.
const errorHandler = (err, req, res, next) => {
  // Log the error to the console so we can see what happened
  console.error('💥 AN ERROR OCCURRED 💥:', err.stack);

  // Set a default status code if one isn't already set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Send the JSON response
  res.json({
    message: err.message,
    // Only show the detailed stack trace in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { errorHandler };

