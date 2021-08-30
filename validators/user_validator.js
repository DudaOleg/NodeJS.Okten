const Joi = require('joi');
const { CURRENT_YEAR, PASSWORD_REGEXP, EMAIL_REGEXP } = require('./variables');
const userRolesEnum = require('../dataBase/user_roles_enum');

const girlValidator = Joi.object({
  name: Joi.string(),
  age: Joi.number().min(15).max(60)
});

const createUserValidator = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),
  email: Joi.string().regex(EMAIL_REGEXP).required(),
  born_year: Joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
  role: Joi.string().allow(...Object.values(userRolesEnum)),

  car: Joi.boolean(),

  girls: Joi.array().items(girlValidator).when('car', { is: true, then: Joi.required() })
});

module.exports = {
  createUserValidator
};
