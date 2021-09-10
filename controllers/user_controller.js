const { code, errorMessage } = require('../errors');
const {
  emailService, userService, passwordService, jwtService, authService
} = require('../services');
const {
  emailActionsEnum: {
    ACTIVE, UPDATE, DELETE_USER, DELETE_ADMIN, TEST_MAIL, GOOGLE_URL
  }
} = require('../config');
const { userDataBase, actionTokenDataBase } = require('../dataBase');
const { ACTIONSECRETKEY } = require('../config/constEnv');
const { TIME_ACTION } = require('../config/variables');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordService.hash(password);

      const newUser = await userService.createUser({
        ...req.body,
        password: hashedPassword
      });

      const { _id } = newUser;
      const actionToken = jwtService.generateActionToken(ACTIONSECRETKEY, TIME_ACTION);
      const newActionToken = actionToken.actionToken;

      await authService.createActionToken({
        ...actionToken,
        user: _id
      });

      await emailService.sendMail(TEST_MAIL, ACTIVE, {
        TOKEN: `${GOOGLE_URL}/password?token=${newActionToken} `
      });

      res.status(code.CREATE).json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  getSingleUser: (req, res, next) => {
    try {
      res.json(req.checkOnUser);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await userService.getAllItems();

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.updateOneItem({
        _id: user_id
      }, req.body);

      await emailService.sendMail(TEST_MAIL, UPDATE, {
        userName: req.checkOnUser.name
      });

      res.status(code.CREATE)
        .json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const { _id } = req.AccessRefresh;

      await userService.deleteOneItem({
        _id: user_id
      });

      if (_id.toString() === user_id) {
        userService.deleteWithMail(DELETE_USER, req.checkOnUser.name, TEST_MAIL);
      } else {
        userService.deleteWithMail(DELETE_ADMIN, req.checkOnUser.name, TEST_MAIL);
      }

      res.sendStatus(code.DELETE);
    } catch (e) {
      next(e);
    }
  },

  userActive: async (req, res, next) => {
    try {
      const { _id } = req.ActionToken;

      await userDataBase.findByIdAndUpdate({
        _id
      }, {
        active: true
      });

      await actionTokenDataBase.findOneAndDelete({
        user: _id
      });

      res.json('OK');
    } catch (e) {
      next(e);
    }
  }
};
