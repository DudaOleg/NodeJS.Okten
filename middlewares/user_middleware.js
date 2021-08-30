const { ErrorHandler, errorMessage, code } = require('../errors');
const { userService } = require('../services');

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

  checkEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const findByEmail = await userService.getOneItem({ email });

      if (findByEmail) {
        throw new ErrorHandler(code.IS_USED, errorMessage.emailIsUsed);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isValidData: (req, res, next) => {
    try {
      const {
        name, surname, age, email, password
      } = req.body;

      if (!name || !surname || !age || !email || !password) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidField);
      }
      if (!email.includes('@')) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.specialSymbol);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
