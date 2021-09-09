const { userDataBase, tokenDataBase, actionTokenDataBase } = require('../dataBase');

module.exports = {
  getOneItem: (item) => userDataBase.findOne(item),
  getOneToken: (item) => tokenDataBase.findOne(item),
  createToken: (item) => tokenDataBase.create(item),
  createActionToken: (item) => actionTokenDataBase.create(item),
  getOneActionToken: (item) => actionTokenDataBase.findOne(item),
  deleteOneToken: (item) => tokenDataBase.deleteOne(item)
};
