const { ErrorHandler, errorMessage, code } = require('../errors');
const { userService } = require('../services');
const { userValidator: { passwordValidator } } = require('../validators');

module.exports = {
  validator: (validator) => (req, res, next) => {
    try {
      const { error } = validator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.NOT_VALID, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserRole: (roleArray = []) => (req, res, next) => {
    try {
      const {
        role,
        _id
      } = req.AccessRefresh;
      const { user_id } = req.params;

      if (!roleArray.length) {
        return next();
      }

      if (_id.toString() === user_id) {
        return next();
      }

      if (!roleArray.includes(role)) {
        throw new ErrorHandler(code.FORBIDDEN, errorMessage.forbidden);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkOn: (params, searchIn = 'body', dbField = params) => async (req, res, next) => {
    try {
      const value = req[searchIn][params];

      const user = await userService.getOneItem({
        [dbField]: value
      });

      if (!user) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessage.notFoundUser);
      }

      req.checkOnUser = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkUniqueEmailOrLogin: async (req, res, next) => {
    try {
      const {
        email,
        login
      } = req.body;

      const user = await userService.getOneItem({
        $or: [
          {
            email
          },
          {
            login
          }
        ]
      });

      if (user) {
        throw new ErrorHandler(code.IS_USED, errorMessage.emailOrLoginIsUsed);
      }
      req.checkEmailorLogin = req.body;
      next();
    } catch (e) {
      next(e);
    }
  },

  validActionPass: (req, res, next) => {
    try {
      const { error } = passwordValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.NOT_VALID, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
