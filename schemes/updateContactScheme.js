const Joi = require("joi");

const joiContactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

module.exports = joiContactUpdateScheme;
