import { STATUS_CODES } from '../utils/constants/index.js';
import { validationHelper } from '../utils/helpers/index.js';
import synonymsSchema from '../utils/validations/index.js';

class SynonymsController {
  constructor(synonymsService) {
    this.synonymsService = synonymsService;
  }

  /**
   *
   * @param { params: {word} } req
   * @returns {
   *  data: {
   *    word: 'requested word value' : string
   *    synonyms: ['synonym1', 'synonym2'] : Array<string>
   *  }
   * }
   */
  get(req) {
    const { word } = req.params;
    validationHelper(word, synonymsSchema.getOrDelete);
    return this.synonymsService.get(word);
  }

  /**
   *
   * @param { body: { word, synonyms } } req
   * @returns {
   *  data: 'Successfully inserted.',
   *  statusCode: 200
   * }
   */
  insert(req) {
    const {
      body: { word, synonyms },
    } = req;
    validationHelper({ word, synonyms }, synonymsSchema.insert);
    const data = this.synonymsService.insert(word, synonyms);
    return { data, statusCode: STATUS_CODES.CREATED };
  }

  /**
   *
   * @param { body: { synonyms }, params: { word} } req
   * @returns {
   *  data: 'Successfully updated.'
   * }
   */
  put(req) {
    const {
      body: { synonyms },
      params: { word },
    } = req;
    validationHelper({ word, synonyms }, synonymsSchema.insert);
    const data = this.synonymsService.update(word, synonyms);
    return { data };
  }

  /**
   *
   * @param { params: { word } } req
   * @returns {
   *  data: 'Successfully deleted.'
   * }
   */
  delete(req) {
    const { word } = req.params;
    validationHelper(word, synonymsSchema.getOrDelete);
    const data = this.synonymsService.delete(word);
    return { data };
  }
}

export default SynonymsController;
