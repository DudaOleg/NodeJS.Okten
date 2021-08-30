const { ErrorHandler, errorMessage } = require('../errors');
const { userService } = require('../services');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = await userService.getById(user_id);
      if (!user) {
        throw new ErrorHandler(404, errorMessage.notFoundUser);
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
        throw new ErrorHandler(409, errorMessage.emailIsUsed);
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
        throw new ErrorHandler(401, errorMessage.notValidField);
      }
      if (!email.includes('@')) {
        throw new ErrorHandler(401, errorMessage.specialSymbol);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
