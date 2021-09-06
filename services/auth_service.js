const { userDataBase, tokenDataBase } = require('../dataBase');

module.exports = {
  getOneItem: (item) => userDataBase.findOne(item),
  getOneToken: (item) => tokenDataBase.findOne(item),
  createToken: (item) => tokenDataBase.create(item),
  deleteOneToken: (item) => tokenDataBase.deleteOne(item)
};
