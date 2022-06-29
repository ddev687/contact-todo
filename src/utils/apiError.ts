class ApiError extends Error {
  statusCode: any;
  error: any;
  constructor(statusCode, message, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.error = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
