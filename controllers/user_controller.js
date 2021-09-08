const { code, errorMessage } = require('../errors');
const { emailService, userService, passwordService, jwtService, authService } = require('../services');
const { emailActionsEnum: { ACTIVE, UPDATE, DELETE_USER, DELETE_ADMIN, TEST_MAIL } } = require('../config');
const { userDataBase, forgotTokenDataBase } = require('../dataBase');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordService.hash(password);

      const newUser = await userService.createUser({
        ...req.body,
        password: hashedPassword
      });

      const withoutPass = newUser.toObject({
        getters: false
      });
      delete withoutPass.password;

      const { _id } = newUser;
      const forgotToken = jwtService.generateForgotToken();
      const newForgotToken = forgotToken.forgotToken;

      await authService.createForgotToken({
        ...forgotToken,
        user: _id
      });

      await emailService.sendMail(TEST_MAIL, ACTIVE, {
        TOKEN: newForgotToken
      });

      res.status(code.CREATE)
        .json(forgotToken);
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
      const { _id } = req.accessTokenUser;

      await userService.deleteOneItem({
        _id: user_id
      });

      if (_id.toString() === user_id) {
        userService.deleteWithMail(DELETE_USER, req.checkOnUser.name, TEST_MAIL);
      } else {
        userService.deleteWithMail(DELETE_ADMIN, req.checkOnUser.name, TEST_MAIL);
      }

      res.status(code.DELETE)
        .json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  userActiveOk: async (req, res, next) => {
    try {
      const { _id } = req.forgotTokenUser;

      await userDataBase.findByIdAndUpdate({
        _id
      }, {
        active: true
      });

      await forgotTokenDataBase.findOneAndDelete({
        user: _id
      });

      res.json('OK');
    } catch (e) {
      next(e);
    }
  }
};
