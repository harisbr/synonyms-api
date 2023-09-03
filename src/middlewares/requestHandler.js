import logger from '../utils/logger/logger.js';
import { STATUS_CODES } from '../utils/constants/index.js';
import { errorHandler } from '../utils/helpers/index.js';

export default (action) => (req, res) => {
  try {
    logger.debug(`Request method: ${req.method}. Request path: ${req.baseUrl}`);
    const response = action(req);
    const { data, statusCode } = response;
    return res.status(statusCode || STATUS_CODES.OK).send(data);
  } catch (err) {
    logger.error(`ERROR OCURRED - ${err}`);
    const { message, status } = errorHandler(err);
    return res.status(status).send(message);
  }
};
