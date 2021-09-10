const { code, errorMessage } = require('../errors');
const {
  passwordService, userService, jwtService, authService, emailService
} = require('../services');
const {
  emailActionsEnum: { GOOGLE_URL, TEST_MAIL, ACTIVE_WITH_ADMIN },
  constEnv: { ACTIONSECRETKEY },
  variables: { TIME_ADMIN }
} = require('../config');

module.exports = {
  createAdmin: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { name } = req.Token;

      const hashedPassword = await passwordService.hash(password);

      const newUser = await userService.createUser({
        ...req.body,
        password: hashedPassword
      });

      const { _id } = newUser;
      const actionToken = jwtService.generateActionToken(ACTIONSECRETKEY, TIME_ADMIN);
      const newActionToken = actionToken.actionToken;

      await authService.createActionToken({
        ...actionToken,
        user: _id
      });

      await emailService.sendMail(TEST_MAIL, ACTIVE_WITH_ADMIN, {
        name,
        TOKEN: `${GOOGLE_URL}/password?token=${newActionToken} `
      });

      res.status(code.CREATE)
        .json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  }
};
