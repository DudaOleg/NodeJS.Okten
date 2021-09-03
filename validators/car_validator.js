const Joi = require('joi');

const carValidator = Joi.object({
  car: Joi.string().alphanum().min(3).max(30).trim().required(),
  model: Joi.string().alphanum().min(1).max(30).trim().required(),
  price: Joi.number().min(1).max(10000000).required()
});

const updateCarValidator = Joi.object({
  model: Joi.string().alphanum().min(1).max(30).trim(),
  price: Joi.number()
});

module.exports = {
  carValidator, updateCarValidator
};
