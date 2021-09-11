const Joi = require("joi");

const joiContactScheme = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.number().min(7).required(),
});

module.exports = joiContactScheme;
