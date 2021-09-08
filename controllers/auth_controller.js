const { variables: { AUTHORIZATION }, emailActionsEnum: { WELCOME, TEST_MAIL } } = require('../config');
const { errorMessage, code } = require('../errors');
const { jwtService, authService, emailService } = require('../services');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { _id } = req.authorization;
      const tokenPair = jwtService.generateTokenPair();

      await authService.createToken({
        ...tokenPair, user: _id
      });

      await emailService.sendMail(TEST_MAIL, WELCOME, {
        userName: req.authorization.name
      });

      res.json({
        ...tokenPair, user: req.authorization
      });
    } catch (e) {
      next(e);
    }
  },

  logOutUser: async (req, res, next) => {
    try {
      const accessToken = req.get(AUTHORIZATION);

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
