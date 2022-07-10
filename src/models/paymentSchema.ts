import Joi from 'joi';

const paymentSchema = Joi.object({
  businessId: Joi.number().required(),
  amount: Joi.number().min(0),
  cardPassword: Joi.string()
    .regex(/\b\d{4}\b/)
    .required(), // 4 digits
});

export default paymentSchema;
