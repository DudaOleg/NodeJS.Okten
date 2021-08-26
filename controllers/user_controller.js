const { getUsers, writeFile } = require('../services/user_services');
const ErrorHandler = require('../errors/errorHandler');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { email } = req.body;

      const users = await getUsers();
      const user = users.find((value) => value.email === email);

      if (user) {
        throw new ErrorHandler(409, 'email is already in use');
      }
      users.push(req.body);
      await writeFile(users);
      res.json('REGISTRATION OK - go to login');
    } catch (e) {
      next(e);
    }
  },

  getSingleUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const users = await getUsers();
      const userId = users[user_id];

      if (!userId) {
        throw new ErrorHandler(404, 'User not found');
      }

      res.json(userId);
    } catch (e) {
      next(e);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
};
