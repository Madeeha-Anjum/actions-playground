export default class ApiError {
  constructor(message, code) {
    this.code = code;
    this.message = message;
  }

  static BadRequest(message) {
    return new ApiError(message, 400);
  }

  static ServerError(message) {
    return new ApiError(message, 500);
  }

  static NotFound(message = "Not Found") {
    return new ApiError(message, 404);
  }
}
