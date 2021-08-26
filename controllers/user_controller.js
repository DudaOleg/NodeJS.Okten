const { readFile, getUsers, writeFile } = require('../services/user_services');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { email } = req.body;
      const textFromFile = await readFile();

      const users = textFromFile ? JSON.parse(textFromFile.toString()) : [];
      const user = users.find((value) => value.email === email);

      if (user) {
        res.json('email is already in use');
        return;
      }
      users.push(req.body);
      await writeFile(users);
      res.json('REGISTRATION OK - go to login');
    } catch (e) {
      console.log(e);
    }
  },

  getSingleUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const users = await getUsers();
      const userId = users[user_id];

      if (!userId) {
        res.json('User Not Found');
        return;
      }

      res.json(userId);
    } catch (e) {
      console.log(e);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (e) {
      console.log('All users');
    }
  }
};
