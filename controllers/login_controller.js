const { getUsers } = require('../services/user_services');

module.exports = {
  userLogin: async (req, res, next) => {
    try {
      const { password, email } = req.body;
      const users = await getUsers();
      const find = users.findIndex((user) => user.email === email && user.password === password);

      if (find !== -1) {
        res.json('Hello  login-true');
        return;
      }
      res.json('Hello login-false');
    } catch (e) {
      next(e);
    }
  }
};
