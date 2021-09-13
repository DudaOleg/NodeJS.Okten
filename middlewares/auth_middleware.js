const { variables: { USER, AUTHORIZATION } } = require('../config');
const { ErrorHandler, errorMessage, code } = require('../errors');
const {
  authService, passwordService: { compare }, jwtService: { verifyToken },
  userService
} = require('../services');

module.exports = {

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

      let findAction = await authService.getOneActionToken({ actionToken: token });

      if (findAction === null) {
        findAction = '';
      }

      if (token !== findAction.actionToken) {
        const findAccessOrRefresh = await authService.getOneToken({
          $_or: [
            { accessToken: token },
            { refreshToken: token }
          ]
        }).populate(USER);

        if (!findAccessOrRefresh) {
          throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
        }

        req.Token = findAccessOrRefresh.user;
        return next();
      }

      req.Token = findAction.user;
      req.forDelete = token;
      next();
    } catch (err) {
      next(err);
    }
  },

  checkPassForChange: async (req, res, next) => {
    try {
      const user = req.Token;

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

  newPass: (req, res, next) => {
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
