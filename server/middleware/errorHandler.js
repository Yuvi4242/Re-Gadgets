const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return { statusCode: 400, message };
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0] : "field";
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return { statusCode: 400, message: "Email already registered" };
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return { statusCode: 400, message };
};

const handleJWTError = () => ({ statusCode: 401, message: 'Invalid token' });

const handleTokenExpiredError = () => ({ statusCode: 401, message: 'Session expired, please login again' });

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      success: false,
      message: 'Something went very wrong!',
    });
  }
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'An unexpected error occurred';
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    const errorData = handleCastErrorDB(error);
    statusCode = errorData.statusCode;
    message = errorData.message;
  }
  if (err.code === 11000) {
    const errorData = handleDuplicateFieldsDB(error);
    statusCode = errorData.statusCode;
    message = errorData.message;
  }
  if (err.name === 'ValidationError') {
    const errorData = handleValidationErrorDB(error);
    statusCode = errorData.statusCode;
    message = errorData.message;
  }
  if (err.name === 'JsonWebTokenError') {
    const errorData = handleJWTError();
    statusCode = errorData.statusCode;
    message = errorData.message;
  }
  if (err.name === 'TokenExpiredError') {
    const errorData = handleTokenExpiredError();
    statusCode = errorData.statusCode;
    message = errorData.message;
  }

  // Handle environment specific error response
  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
       success: false,
       message,
       stack: err.stack,
       error: err
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? 'Something went very wrong!' : message,
    });
  }
};
