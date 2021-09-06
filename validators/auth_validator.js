const Joi = require('joi');

const { variables: { PASSWORD_REGEXP } } = require('../config');

const validAuth = Joi.object({
  login: Joi.string().alphanum().min(2).max(30).trim().required(),
  password: Joi.string().regex(PASSWORD_REGEXP).trim().required()
});

module.exports = {
  validAuth
};
