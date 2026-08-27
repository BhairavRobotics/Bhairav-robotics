const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    err.message = "Resume file must be 5MB or smaller";
  }

  res.status(statusCode).json({
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
