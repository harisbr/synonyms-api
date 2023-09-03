import Joi from 'joi';

export default {
  getOrDelete: Joi.string()
    .regex(/^[a-zA-Z0-9_.-\s\',]*$/)
    .required(),
  insert: Joi.object().keys({
    word: Joi.string()
      .regex(/^[a-zA-Z0-9_.-\s\',]*$/)
      .required(),
    synonyms: Joi.array().required().min(1).items(Joi.string()),
  }),
};
