const { code, errorMessage } = require('../errors');
const { userService, passwordService } = require('../services');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await passwordService.hash(password);

      const newUser = await userService.createUser({
        ...req.body, password: hashedPassword
      });

      const withoutPass = newUser.toObject({
        getters: false
      });
      delete withoutPass.password;
      res.status(code.CREATE).json(withoutPass);
    } catch (e) {
      next(e);
    }
  },

  getSingleUser: (req, res, next) => {
    try {
      res.json(req.checkOnuser);
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

      res.status(code.CREATE)
        .json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.deleteOneItem({
        _id: user_id
      });

      res.status(code.DELETE)
        .json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  }
};
