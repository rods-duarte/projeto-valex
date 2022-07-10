import Joi from 'joi';

const cardPasswordSchema = Joi.object({
  password: Joi.string()
    .regex(/\b\d{4}\b/) // 4 digits
    .required(),
});

export default cardPasswordSchema;
