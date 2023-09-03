import { STATUS_CODES } from '../constants/index.js';

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

export default NotFoundError;
