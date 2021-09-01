const {
  ErrorHandler,
  errorMessage,
  code
} = require('../errors');
const { userService } = require('../services');
const {
  userValidator: {
    createUserValidator,
    updateUserValidator
  }
} = require('../validators');

module.exports = {
  validBody: (req, res, next) => {
    try {
      const { error } = createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.BAD_REQUEST, error.details[0].message);
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
  },

  checkUserRole: (rolesArray = []) => (req, res, next) => {
    try {
      const { roles } = req.user;

      if (!roles.length) {
        return next();
      }

      if (!rolesArray.includes(roles)) {
        throw new ErrorHandler(code.FORBIDDEN, errorMessage.forbidden);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkOn: (params, searchIn, dbField = params) => async (req, res, next) => {
    try {
      const value = req[searchIn][params];

      const user = await userService.getById({ [dbField]: value });

      if (!user) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessage.notFoundUser);
      }

      req.user = user;
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
          { email },
          { login }
        ]
      });

      if (user) {
        throw new ErrorHandler(code.IS_USED, errorMessage.emailOrLoginIsUsed);
      }

      next();
    } catch (e) {
      next(e);
    }
  },


};
