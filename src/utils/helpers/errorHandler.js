import { NotFoundError, BadRequestError } from '../errors/index.js';
import { STATUS_CODES } from '../constants/index.js';

export default (err) => {
  switch (true) {
    case err instanceof NotFoundError:
    case err instanceof BadRequestError:
      return { message: err.message, status: err.statusCode };
    default:
      return {
        message:
          'We have encountered an unexpected error. Please contact our support.',
        status: STATUS_CODES.INTERNAL_ERROR,
      };
  }
};
