const { userService } = require('../services');
const { codesEnum } = require('../errors');

module.exports = {

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findUser();

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const createdUser = await userService.createUser(req.body);

      res.status(codesEnum.CREATE)
        .json(createdUser);
    } catch (e) {
      next(e);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const findUser = await userService.findUserById(userId);

      res.status(codesEnum.OK)
        .json(findUser);
    } catch (e) {
      next(e);
    }
  },

  removeUserById: async (req, res, next) => {
    try {
      await userService.removeUser(req.params.userId);

      res.json('user remove');
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      await userService.updateUser(req.params.userId, req.body);

      res.json('update');
    } catch (e) {
      next(e);
    }
  },
};
