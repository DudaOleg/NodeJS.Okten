const { carService } = require('../services');
const { codesEnum } = require('../errors');

module.exports = {

  getAllCars: async (req, res, next) => {
    try {
      const cars = await carService.findCar();

      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const createdCar = await carService.createCar(req.body);

      res.status(codesEnum.CREATE)
        .json(createdCar);
    } catch (e) {
      next(e);
    }
  },
  getCarById: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const findCar = await carService.findCarById(carId);

      res.status(codesEnum.OK)
        .json(findCar);
    } catch (e) {
      next(e);
    }
  },

  removeCarById: async (req, res, next) => {
    try {
      await carService.removeCar(req.params.carId);

      res.json('car remove');
    } catch (e) {
      next(e);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      await carService.updateCar(req.params.carId, req.body);

      res.json('update');
    } catch (e) {
      next(e);
    }
  },
};
