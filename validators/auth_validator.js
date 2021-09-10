const Joi = require('joi');

const { variables: { PASSWORD_REGEXP } } = require('../config');

const Auth = Joi.object({
  login: Joi.string().alphanum().min(2).max(30).trim().required(),
  password: Joi.string().regex(PASSWORD_REGEXP).trim().required()
});

const checkLog = Joi.object({
  login: Joi.string().alphanum().min(2).max(30).trim().required()
});

module.exports = {
  Auth, checkLog
};
