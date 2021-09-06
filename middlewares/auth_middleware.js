const { ErrorHandler, errorMessage, code } = require('../errors');
const { authService, passwordService: { compare } } = require('../services');
const { verifyToken } = require('../services/jwt_service');
const { authValidator: { validAuth } } = require('../validators');
const { authorization } = require('./variables');

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
      const findLogin = await authService.getOneItem({
        login
      })
        .select('+password');

      if (!findLogin) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.wrongLoginOrPass);
      }

      await compare(findLogin.password, password);
      const withoutPass = findLogin.toObject({
        getters: false
      });
      delete withoutPass.password;
      req.user = withoutPass;

      next();
    } catch (err) {
      next(err);
    }
  },

  accessToken: async (req, res, next) => {
    try {
      const accessToken = req.get(authorization);
      if (!accessToken) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }
      await verifyToken(accessToken);

      const findToken = await authService.getOneItem({
        accessToken
      });

      if (!findToken) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }
      next();
    } catch (err) {
      next(err);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.get(authorization);
      if (!refreshToken) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }
      await verifyToken(refreshToken);

      const findToken = await authService.getOneItem({
        refreshToken
      }).populate('user');

      if (!findToken) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }

      req.user = findToken.user;

      next();
    } catch (err) {
      next(err);
    }
  }
};
