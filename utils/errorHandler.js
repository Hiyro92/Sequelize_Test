  
  module.exports = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      status: statusCode,
      message: err.message || "Something went wrong",
      stack: process.env.NODE_ENV === 'production' ? '🙊' : err.stack,
      errors: err.errors || undefined,
    });
  };