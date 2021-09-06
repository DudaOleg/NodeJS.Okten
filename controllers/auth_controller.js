const { jwtService, authService } = require('../services');
const { AUTHORIZATION } = require('../routers/variables');
const { errorMessage, code } = require('../errors');

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

      await authService.getOneItem({
        accessToken
      });

      res.status(code.DELETE).json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const refreshToken = req.ge(AUTHORIZATION);
      const { _id } = req.user;

      await authService.deleteOneToken({
        refreshToken
      });

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
  }
};
