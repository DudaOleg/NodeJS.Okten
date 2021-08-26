const fs = require('fs/promises');
const path = require('path');

const fileDB = path.join(process.cwd(), 'db', 'db.json');

module.exports = {
  getUsers: async () => {
    try {
      const data = await fs.readFile(fileDB, 'utf8');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.log(e);
    }
  },

  writeFile: async (users) => {
    try {
      await fs.writeFile(fileDB, JSON.stringify(users));
    } catch (e) {
      console.log(e);
    }
  },
};
