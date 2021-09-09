const { jwtService, authService, emailService, passwordService, userService } = require('../services');
const { emailActionsEnum: { TEST_MAIL, FORGOT, GOOGLE_URL, WELCOME } } = require('../config');
const { code, errorMessage } = require('../errors');
const { tokenDataBase, actionTokenDataBase } = require('../dataBase');

module.exports = {
  forgotPass: async (req, res, next) => {
    try {
      const { _id } = req.checkOnUser;
      const actionToken = jwtService.generateActionToken();
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
      const { name, _id } = req.actionTokenUser;

      const { password } = req.body;

      const hashedPassword = await passwordService.hash(password);

      await userService.updateOneItem({
        password: hashedPassword
      });

      await emailService.sendMail(TEST_MAIL, WELCOME, {
        userName: name
      });

      await actionTokenDataBase.findOneAndDelete({
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
