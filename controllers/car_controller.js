const { carService } = require('../services');
const {
  code,
  errorMessage
} = require('../errors');

module.exports = {
  createCar: async (req, res, next) => {
    try {
      const newCar = await carService.createCar(req.body);

      res.json(newCar);
    } catch (e) {
      next(e);
    }
  },

  getSingleCar: (req, res, next) => {
    try {
      res.json(req.car);
    } catch (e) {
      next(e);
    }
  },

  getAllCar: async (req, res, next) => {
    try {
      const cars = await carService.getAllItems();

      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      await carService.updateOneItem({ _id: req.car_id }, req.body);

      res.status(code.CREATE).json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      await carService.deleteOneItem({ _id: req.car });

      res.status(code.DELETE).json(errorMessage.ok);
    } catch (e) {
      next(e);
    }
  }

};
