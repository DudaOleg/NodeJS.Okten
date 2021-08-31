const Joi = require('joi');

const carValidator = Joi.object({
  car: Joi.string().alphanum().min(3).max(30).trim().required(),
  model: Joi.string().alphanum().min(3).max(30).trim().required(),
  price: Joi.number().min(1).max(10).required()
});

module.exports = {
  carValidator
};
