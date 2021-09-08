const { jwtService, authService, emailService, passwordService, userService } = require('../services');
const { emailActionsEnum: { TEST_MAIL, FORGOT, CREATE } } = require('../config');
const { code } = require('../errors');
const { tokenDataBase, forgotTokenDataBase } = require('../dataBase');

module.exports = {
  forgotPass: async (req, res, next) => {
    try {
      const { _id } = req.checkOnUser;
      const forgotToken = jwtService.generateForgotToken();
      const newForgotToken = forgotToken.forgotToken;

      await authService.createForgotToken({
        ...forgotToken,
        user: _id
      });

      await emailService.sendMail(TEST_MAIL, FORGOT, {
        userName: req.checkOnUser.name, TOKEN: newForgotToken
      });

      res.json({
        ...forgotToken,
        user: _id
      });
    } catch (e) {
      next(e);
    }
  },

  newPass: async (req, res, next) => {
    try {
      const { name, _id } = req.forgotTokenUser;

      const { password } = req.body;

      const hashedPassword = await passwordService.hash(password);

      await userService.updateOneItem({
        password: hashedPassword
      });

      await emailService.sendMail(TEST_MAIL, CREATE, {
        userName: name
      });

      await forgotTokenDataBase.findOneAndDelete({
        user: _id
      });

      await tokenDataBase.deleteMany({
        user: _id
      });

      res.status(code.CREATE).json('ok');
    } catch (e) {
      next(e);
    }
  }
};
