const { Car } = require('../dataBase');

module.exports = {
  findCar: () => Car.find({}),
  findCarById: (carId) => Car.findOne({ _id: carId }),
  createCar: (objectCar) => Car.create(objectCar),
  updateCar: (carId, updateBody) => Car.updateOne({ _id: carId }, { ...updateBody }),
  removeCar: (id) => Car.deleteOne({ _id: id }),
};
