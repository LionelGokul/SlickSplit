interface ErrorInfo {
  stack?: string;
  message?: string;
}

class HttpError extends Error {
  code: number;
  stackTrace: String | undefined;
  errMessage: String | undefined;
  priority: String;

  constructor(
    message: any,
    errorCode: number,
    error: ErrorInfo,
    priority: String,
  ) {
    super(message);
    this.code = errorCode;
    this.stackTrace = error.stack;
    this.errMessage = error.message;
    this.priority = priority;
  }
}

module.exports = HttpError;
