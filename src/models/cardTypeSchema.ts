import Joi from 'joi';

const CardTypeSchema = Joi.object({
  cardType: Joi.string()
    .valid('groceries', 'restaurant', 'transport', 'education', 'health')
    .required(),
});

export default CardTypeSchema;
