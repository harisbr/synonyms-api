import express from 'express';
import logger from '../utils/logger/logger.js';
import SynonymsService from '../services/synonymsService.js';
import SynonymsController from '../controllers/synonymsController.js';
import requestHandler from '../middlewares/requestHandler.js';

const synonymsService = new SynonymsService(logger);
const synonymsCtrl = new SynonymsController(synonymsService);

const synonymsRouter = express.Router();

synonymsRouter
  .route('/')
  /**
   * @body
   * {
   *    word: string,
   *    synonyms: Array<string>
   * }
   */
  .post(requestHandler((req) => synonymsCtrl.insert(req)));

synonymsRouter
  .route('/:word')
  /**
   * @param /:word
   */
  .get(requestHandler((req) => synonymsCtrl.get(req)))
  /**
   * @param /:word
   * @body
   * {
   *    synonyms: Array<string>
   * }
   */
  .put(requestHandler((req) => synonymsCtrl.put(req)))
  /**
   * @param /:word
   */
  .delete(requestHandler((req) => synonymsCtrl.delete(req)));

export default synonymsRouter;
