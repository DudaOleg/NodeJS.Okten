const { variables: { USER, AUTHORIZATION } } = require('../config');
const { ErrorHandler, errorMessage, code } = require('../errors');
const { authService, passwordService: { compare }, jwtService: { verifyToken } } = require('../services');
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
      const accessToken = req.get(AUTHORIZATION);

      if (!accessToken) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }

      await verifyToken(accessToken);

      const findToken = await authService.getOneToken({
        accessToken
      }).populate(USER);

      if (!findToken) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }

      req.accessTokenUser = findToken.user;
      next();
    } catch (err) {
      next(err);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.get(AUTHORIZATION);
      if (!refreshToken) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }
      await verifyToken(refreshToken);

      const findToken = await authService.getOneToken({
        refreshToken
      }).populate(USER);

      if (!findToken) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }

      req.refreshTokenUser = findToken.user;

      next();
    } catch (err) {
      next(err);
    }
  }
};
