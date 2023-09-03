import SynonymsService from '../../services/synonymsService.js';

const logger = {
  log: (msg) => {},
  error: (msg) => {},
  debug: (msg) => {},
};

describe('SynonymsService test', () => {
  let synonymsService = new SynonymsService(logger);

  test('should successfully insert new word with synonyms', () => {
    const input = {
      word: 'house',
      synonyms: ['home'],
    };
    const result = synonymsService.insert(input.word, input.synonyms);
    expect(result).toEqual('Successfully inserted.');
  });

  test('should throw an error that a word already exists', () => {
    const input = {
      word: 'house',
      synonyms: ['home'],
    };
    expect(() => synonymsService.insert(input.word, input.synonyms)).toThrow(
      'Already exists. Please update existing one.',
    );
  });

  test('should throw an error for invalid input', () => {
    expect(() => synonymsService.insert('invalid')).toThrow(
      'Please provide valid request input.',
    );
  });

  test('should return requested word and its synonyms', () => {
    const result = {
      data: {
        word: 'house',
        synonyms: ['home'],
      },
    };
    const response = synonymsService.get('house');
    expect(response).toStrictEqual(result);
  });

  test('should return that the requested word has not been found', () => {
    expect(() => synonymsService.get('word')).toThrow(
      'Requested word not found.',
    );
  });

  test('should successfully update existing word', () => {
    const input = {
      word: 'house',
      synonyms: ['residence', 'homestead'],
    };
    const result = synonymsService.update(input.word, input.synonyms);
    expect(result).toBe('Successfully updated.');
  });

  test('should successfully delete existing word', () => {
    const expectedResult = 'Successfully deleted.';
    const result = synonymsService.delete('house');
    expect(result).toBe(expectedResult);
  });

  test('should return that requested word for deletion was not found', () => {
    expect(() => synonymsService.delete('word')).toThrow(
      'Requested word not found.',
    );
  });

  test('should not allow update of nonexisting word', () => {
    expect(() => synonymsService.update('word')).toThrow(
      'Requested word not found.',
    );
  });
});
