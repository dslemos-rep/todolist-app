export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')
      ? 'fail'
      : 'error';

    this.isOperational = true; //separates operational (expected) errors from programming errors

    Error.captureStackTrace(this, this.constructor); //Cleaner debugging
  }
}
