const { userDataBase, tokenDataBase, forgotTokenDataBase } = require('../dataBase');

module.exports = {
  getOneItem: (item) => userDataBase.findOne(item),
  getOneToken: (item) => tokenDataBase.findOne(item),
  createToken: (item) => tokenDataBase.create(item),
  createForgotToken: (item) => forgotTokenDataBase.create(item),
  getOneForgotToken: (item) => forgotTokenDataBase.findOne(item),
  deleteOneToken: (item) => tokenDataBase.deleteOne(item)
};
