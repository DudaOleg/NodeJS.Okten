const Joi = require('joi');

const { PASSWORD_REGEXP } = require('./variables');

const validAuth = Joi.object({
  login: Joi.string().alphanum().min(2).max(30).trim().required(),
  password: Joi.string().regex(PASSWORD_REGEXP).trim().required()
});

module.exports = { validAuth };
