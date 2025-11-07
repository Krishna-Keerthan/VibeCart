export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.status || err.statusCode || 500;
  
  const response = {
    success: false,
    error: err.message || 'Internal server error',
    ...(err.available && { available: err.available }),
    ...(err.inCart && { inCart: err.inCart }),
    ...(err.product && { product: err.product }),
    ...(err.requested && { requested: err.requested })
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

// 404 Not Found handler
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};