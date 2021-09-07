const { userDataBase } = require('../dataBase');
const { emailService } = require('./email_service');

module.exports = {
  createUser: (item) => userDataBase.create(item),
  getById: (item) => userDataBase.findById(item),
  getOneItem: (item) => userDataBase.findOne(item),
  getAllItems: () => userDataBase.find(),
  deleteOneItem: (item) => userDataBase.deleteOne(item),
  updateOneItem: (item, data) => userDataBase.updateOne(item, data),
  deleteWithMail: async (emailActions, req, emailUser) => {
    await emailService.sendMail(emailUser, emailActions, {
      userName: req
    });
  }
};
