const fs = require('fs/promises');
const path = require('path');

const fileDB = path.join(process.cwd(), 'db', 'db.json');

module.exports = {
  getUsers: async () => {
    try {
      return JSON.parse(await fs.readFile(fileDB, 'utf8'));
    } catch (e) {
      console.log(e);
    }
  },
  readFile: async () => {
    try {
      return await fs.readFile(fileDB, 'utf8');
    } catch (e) {
      console.log(e);
    }
  },
  writeFile: async () => {
    try {
      return await fs.writeFile(fileDB, JSON.stringify(users));
    } catch (e) {
      console.log(e);
    }
  },
};
