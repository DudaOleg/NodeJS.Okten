const Joi = require('joi');

const { variables: { CURRENT_YEAR, PASSWORD_REGEXP, EMAIL_REGEXP } } = require('../config');
const { userRoles } = require('../dataBase');

const createUserValidator = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).trim().required(),
  name: Joi.string().alphanum().min(3).max(30).trim().required(),
  surname: Joi.string().alphanum().min(3).max(30).trim().required(),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),
  email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
  born_year: Joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
  role: Joi.string().allow(...Object.values(userRoles)),
});

const updateUserValidator = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  surname: Joi.string().alphanum().min(3).max(30).trim(),
  email: Joi.string().regex(EMAIL_REGEXP),
  password: Joi.string().regex(PASSWORD_REGEXP),
});

const actionValidator = Joi.object({
  password: Joi.string().regex(PASSWORD_REGEXP).required()
});

module.exports = {
  createUserValidator, updateUserValidator, actionValidator
};
