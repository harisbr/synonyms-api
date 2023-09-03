import { STATUS_CODES } from '../../utils/constants/index.js';
import SynonymsController from '../../controllers/synonymsController.js';

const synonymsService = {
  get: (word) => ({ data: { word, synonyms: ['home'] } }),
  insert: (word, synonyms) => 'Successfully inserted.',
  update: (word, synonyms) => 'Successfully updated.',
  delete: (word) => 'Successfully deleted.',
};

describe.only('SynonymsController', () => {
  const synonymsCtrl = new SynonymsController(synonymsService);

  test('should return word and its syonyms', () => {
    const expectedResult = {
      data: {
        word: 'house',
        synonyms: ['home'],
      },
    };
    const result = synonymsCtrl.get({ params: { word: 'house' } });
    expect(result).toMatchObject(expectedResult);
  });

  test('should successfully insert new word and synonyms', () => {
    const expectedResult = {
      data: 'Successfully inserted.',
      statusCode: STATUS_CODES.CREATED,
    };
    const result = synonymsCtrl.insert({
      body: { word: 'house', synonyms: ['home'] },
    });
    expect(result).toMatchObject(expectedResult);
  });

  test('should successfully update word and synonyms', () => {
    const expectedResult = { data: 'Successfully updated.' };
    const result = synonymsCtrl.put({
      body: { synonyms: ['homestead'] },
      params: { word: 'house' },
    });
    expect(result).toMatchObject(expectedResult);
  });

  test('should successfully delete word', () => {
    const expectedResult = { data: 'Successfully deleted.' };
    const result = synonymsCtrl.delete({ params: { word: 'house' } });
    expect(result).toMatchObject(expectedResult);
  });
});
