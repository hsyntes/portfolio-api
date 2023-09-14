// * Custom Error Class
module.exports = class ErrorProvider extends Error {
  constructor(statusCode, status, message) {
    super(message);

    this.statusCode = statusCode;
    this.status = status;

    // * Subscribing capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
};
