const { ErrorHandler, errorMessage, code } = require('../errors');
const { authService, passwordService: { compare } } = require('../services');
const { authValidator: { validAuth } } = require('../validators');

module.exports = {

  checkAuthDataValid: (req, res, next) => {
    try {
      const { error } = validAuth.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidField);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  authorization: async (req, res, next) => {
    try {
      const { login, password } = req.body;
      const findLogin = await authService.getOneItem({ login }).select('+password');

      if (!findLogin) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.wrongLoginOrPass);
      }

      await compare(findLogin.password, password);
      const withoutPass = findLogin.toObject({ getters: true });
      delete withoutPass.password;
      req.user = withoutPass;

      next();
    } catch (err) {
      next(err);
    }
  }
};
