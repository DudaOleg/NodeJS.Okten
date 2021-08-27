const { User } = require('../dataBase');

module.exports = {
  findUser: () => User.find({}),
  findUserById: (userId) => User.findOne({ _id: userId }),
  createUser: (objectUser) => User.create(objectUser),
  updateUser: (userId, updateBody) => User.updateOne({ _id: userId }, { ...updateBody }),
  removeUser: (id) => User.deleteOne({ _id: id }),
};
