const { userDataBase } = require('../dataBase');
const { sendMail } = require('./email_service');

module.exports = {
  createUser: (item) => userDataBase.create(item),
  getById: (item) => userDataBase.findById(item),
  getOneItem: (item) => userDataBase.findOne(item),
  getAllItems: () => userDataBase.find(),
  deleteOneItem: (item) => userDataBase.deleteOne(item),
  updateOneItem: (item, data) => userDataBase.updateOne(item, data),
  findByIdAndUpdateItem: (item, data, options) => userDataBase.findByIdAndUpdate(item, data, options),
  deleteWithMail: async (emailActions, req, emailUser) => {
    await sendMail(emailUser, emailActions, {
      userName: req
    });
  }
};
