const {
  ErrorHandler,
  errorMess
} = require('../errors');
const { userService } = require('../services');

module.exports = {
  isUserValid: async (req, res, next) => {
    try {
      const {
        name,
        email
      } = req.body;

      const users = await userService.findUser();

      if (!name || !email) {
        throw new ErrorHandler(404, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
      }

      if (!email.includes('@')) {
        throw new ErrorHandler(400, errorMess.NOT_EMAIL.message, errorMess.NOT_EMAIL.code);
      }

      users.forEach((value) => {
        if (value.name === name) {
          throw new ErrorHandler(409, errorMess.NOT_EXISTS.message, errorMess.NOT_EXISTS.code);
        }
      });
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsValid: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userById = await userService.findUserById(userId);

      if (userId < 0) {
        throw new ErrorHandler(400, errorMess.NOT_VALID_ID.message, errorMess.NOT_VALID_ID.code);
      }

      if (!userById) {
        throw new ErrorHandler(404, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
      }

      req.user = userById;

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserValidId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userById = await userService.findUserById(userId);

      if (!userById) {
        throw new ErrorHandler(404, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
