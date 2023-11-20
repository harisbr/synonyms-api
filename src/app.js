import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import logger from './utils/logger/logger.js';
import config from './config/config.js';
import routes from './routes/index.js';
import { STATUS_CODES, ERROR_MESSAGES } from './utils/constants/index.js';
import swaggerDocument from '../docs/swagger.json' assert { type: 'json' };

const app = express();

app.use(bodyParser.json());

app.use('/health', (req, res) => {
  logger.debug('Testing log');
  res.json('Success').send();
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api', routes);

app.use((err, req, res) => {
  logger.error(`Unexpected error ocurred: ${JSON.stringify(err)}`);
  res
    .status(STATUS_CODES.INTERNAL_ERROR)
    .send(ERROR_MESSAGES.GLOBAL_ERROR_MESSAGE);
});

app.listen(config.port, () => {
  logger.debug(`Server listening on port: ${config.port}`);
});
