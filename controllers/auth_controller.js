const { variables: { AUTHORIZATION } } = require('../config');
const { errorMessage, code } = require('../errors');
const { jwtService, authService } = require('../services');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const tokenPair = jwtService.generateTokenPair();

      await authService.createToken({
        ...tokenPair, user: _id
      });

      res.json({
        ...tokenPair, user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

  logOutUser: async (req, res, next) => {
    try {
      const accessToken = req.ge(AUTHORIZATION);

      await authService.deleteOneToken({
        accessToken
      });

      res.status(code.DELETE).json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const refreshToken = req.get(AUTHORIZATION);
      const { _id } = req.refreshTokenUser;

      await authService.deleteOneToken({
        refreshToken
      });

      const tokenPair = jwtService.generateTokenPair();

      await authService.createToken({
        ...tokenPair, user: _id
      });

      res.status(code.CREATE).json({
        ...tokenPair, user: req.refreshTokenUser
      });
    } catch (e) {
      next(e);
    }
  }
};
