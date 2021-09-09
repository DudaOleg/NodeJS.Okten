const { userDataBase, tokenDataBase, actionTokenDataBase } = require('../dataBase');

module.exports = {
  getOneActionToken: (item) => actionTokenDataBase.findOne(item),
  getOneItem: (item) => userDataBase.findOne(item),
  getOneToken: (item) => tokenDataBase.findOne(item),
  createToken: (item) => tokenDataBase.create(item),
  createActionToken: (item) => actionTokenDataBase.create(item),
  updateOneItem: (item, data) => userDataBase.updateOne(item, data),
  deleteOneToken: (item) => tokenDataBase.deleteOne(item),
  findDeleteOneAction: (item) => actionTokenDataBase.findOneAndDelete(item),
  deleteAccessAndRefresh: (item) => tokenDataBase.deleteMany(item)
};
