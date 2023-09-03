import { errorHandler, validationHelper } from '../../utils/helpers/index.js';
import { NotFoundError } from '../../utils/errors/index.js';
import synonymsSchema from '../../utils/validations/index.js';

describe('util/helpers methods', () => {
  test('it should return error message and status code', () => {
    const expectedResult = {
      message: 'Not found.',
      status: 404,
    };
    const result = errorHandler(new NotFoundError('Not found.'));
    expect(result).toStrictEqual(expectedResult);
  });

  test('it should return global error', () => {
    const expectedResult = {
      message:
        'We have encountered an unexpected error. Please contact our support.',
      status: 500,
    };
    const result = errorHandler(new Error());
    expect(result).toStrictEqual(expectedResult);
  });

  test('it should pass the schema validation', () => {
    const { getOrDelete } = synonymsSchema;
    const result = validationHelper('word', getOrDelete);
    expect(result).toBe();
  });

  test('it should throw error on invalid data', () => {
    const { getOrDelete } = synonymsSchema;
    expect(() => validationHelper(12345, getOrDelete)).toThrow(
      `"value" must be a string`,
    );
  });
});
