const { userService } = require('../services');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.json(newUser);
    } catch (e) {
      next(e);
    }
  },

  getSingleUser: (req, res, next) => {
    try {
      res.json(req.user);
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
      await userService.updateOneItem({ _id: user_id }, req.body);
      res.status(201).json('OK-UPDATE');
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.deleteOneItem({ _id: user_id });
      res.status(200).json('OK-delete');
    } catch (e) {
      next(e);
    }
  }
};
