import { STATUS_CODES } from '../constants/index.js';

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

export default BadRequestError;
