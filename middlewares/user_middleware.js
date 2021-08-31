const { ErrorHandler, errorMessage, code } = require('../errors');
const { userService } = require('../services');
const { userValidator: { createUserValidator, updateUserValidator } } = require('../validators');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = await userService.getById(user_id);
      if (!user) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessage.notFoundUser);
      }
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkEmailOrLogin: async (req, res, next) => {
    try {
      const { email, login } = req.body;
      const findByEmail = await userService.getOneItem({ email });
      const findByLogin = await userService.getOneItem({ login });

      if (findByEmail || findByLogin) {
        throw new ErrorHandler(code.IS_USED, errorMessage.emailOrLoginIsUsed);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validBody: (req, res, next) => {
    try {
      const { error } = createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.BAD_REQUEST, error.details[0].context);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validUpdateBody: (req, res, next) => {
    try {
      const { error } = updateUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.NOT_VALID, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
