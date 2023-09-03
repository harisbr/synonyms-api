import winston from 'winston';
import config from '../../config/config.js';
import { LOGGER_LEVELS } from '../constants/index.js';

const { combine, timestamp, prettyPrint } = winston.format;

const logger = winston.createLogger({
  level: config.env === 'dev' ? LOGGER_LEVELS.DEV : LOGGER_LEVELS.PROD,
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: { service: 'synonyms-api' },
  transports: [new winston.transports.Console()],
});

export default logger;
