export const errorHandler = (err, req, res, next) => {
  if (err.statusCode >= 500) {
    console.error(err); //Only logs server bugs
  }
  return res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error"
  });
};
