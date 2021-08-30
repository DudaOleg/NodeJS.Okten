const { userDataBase } = require('../dataBase');

module.exports = {
  getOneItem: (item) => userDataBase.findOne(item)
};
