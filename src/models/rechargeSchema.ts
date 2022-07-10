import Joi from 'joi';

const rechargeSchema = Joi.object({
  amount: Joi.number().positive(),
});

export default rechargeSchema;
