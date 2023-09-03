import { BadRequestError } from '../errors/index.js';

export default (dataToValidate, schema) => {
  const { error } = schema.validate(dataToValidate);
  if (!error) return;

  const { details } = error;
  const message = details.map((detail) => detail.message).join(', ');
  throw new BadRequestError(message);
};
