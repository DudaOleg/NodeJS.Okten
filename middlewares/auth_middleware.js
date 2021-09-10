const { variables: { USER, AUTHORIZATION } } = require('../config');
const { ErrorHandler, errorMessage, code } = require('../errors');
const {
  authService, passwordService: { compare }, jwtService: { verifyToken },
  userService
} = require('../services');
const { authValidator: { validAuth, loginValidator } } = require('../validators');

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
      req.authorization = withoutPass;

      next();
    } catch (err) {
      next(err);
    }
  },

  verifyToken: (word) => async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
      }

      await verifyToken(token, word);

      const findAction = await authService.getOneActionToken({
        $or: [
          { actionToken: token },
          { token }
        ]
      }).populate(USER);

      if (token !== findAction.token || findAction.actionToken) {
        const findAccessOrRefresh = await authService.getOneToken({
          $or: [
            { accessToken: token },
            { refreshToken: token }
          ]
        }).populate(USER);

        if (!findAccessOrRefresh) {
          throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
        }

        req.AccessRefresh = findAccessOrRefresh.user;
        return next();
      }

      req.ActionToken = findAction.user;
      next();
    } catch (err) {
      next(err);
    }
  },

  loginValidator: (req, res, next) => {
    try {
      const { error } = loginValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidField);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  checkPassForChange: async (req, res, next) => {
    try {
      const user = req.AccessRefresh;

      const userWithPass = await userService.getById({ _id: user._id }).select('+password');

      const { password, oldPassword } = req.body;

      await compare(userWithPass.password, oldPassword);

      if (password === oldPassword) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.oldAndNewPassword);
      }

      req.newPass = password;
      next();
    } catch (err) {
      next(err);
    }
  },

  ForgotPass: (req, res, next) => {
    try {
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        throw new ErrorHandler(code.NOT_VALID, errorMessage.differentPasswords);
      }

      req.newPass = password;
      next();
    } catch (err) {
      next(err);
    }
  }
};
