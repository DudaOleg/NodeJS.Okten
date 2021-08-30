const { carDataBase } = require('../dataBase');

module.exports = {
  createCar: (item) => carDataBase.create(item),
  getById: (item) => carDataBase.findById(item),
  getAllItems: () => carDataBase.find(),
  updateOneItem: (item, data) => carDataBase.updateOne(item, data),
  deleteOneItem: (item) => carDataBase.deleteOne(item),
};
