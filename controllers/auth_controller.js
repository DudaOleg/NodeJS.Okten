const { errorMessage, code } = require('../errors');
const {
  variables: { AUTHORIZATION, TIME_FORGOT },
  emailActionsEnum: {
    WELCOME,
    TEST_MAIL,
    FORGOT,
    GOOGLE_URL
  },
  constEnv: {
    FORGOTSECRETKEY
  }
} = require('../config');
const {
  jwtService,
  authService,
  emailService,
  passwordService
} = require('../services');

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
      const { _id } = req.AccessRefresh;

      await authService.deleteOneToken({
        refreshToken
      });

      const tokenPair = jwtService.generateTokenPair();

      await authService.createToken({
        ...tokenPair, user: _id
      });

      res.status(code.CREATE).json({
        ...tokenPair, user: req.AccessRefresh
      });
    } catch (e) {
      next(e);
    }
  },

  forgotPass: async (req, res, next) => {
    try {
      const { _id } = req.checkOnUser;
      const actionToken = jwtService.generateActionToken(FORGOTSECRETKEY, TIME_FORGOT);
      const newActionToken = actionToken.actionToken;

      await authService.createActionToken({
        ...actionToken,
        user: _id
      });

      await emailService.sendMail(TEST_MAIL, FORGOT, {
        userName: req.checkOnUser.name, TOKEN: `${GOOGLE_URL}/password?token=${newActionToken} `
      });

      res.json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  updatePass: async (req, res, next) => {
    try {
      const password = req.newPass;
      const { name, _id } = req.ActionToken;

      const hashedPassword = await passwordService.hash(password);

      await authService.updateOneItem({ _id }, { password: hashedPassword });

      await emailService.sendMail(TEST_MAIL, WELCOME, {
        userName: name
      });

      await authService.findDeleteOneAction({
        user: _id
      });

      await authService.deleteAccessAndRefresh({
        user: _id
      });

      res.status(code.CREATE).json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  }
};
