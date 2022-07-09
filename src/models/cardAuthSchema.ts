import Joi from 'joi';

const cardAuthSchema = Joi.object({
  password: Joi.string()
    .regex(/\b\d{4}\b/) // 4 digits
    .required(),
  securityCode: Joi.string().required(),
});

export default cardAuthSchema;
