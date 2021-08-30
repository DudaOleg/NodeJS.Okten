const { carService } = require('../services');

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
      res.status(201).json('OK-UPDATE');
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      await carService.deleteOneItem({ _id: req.car });
      res.status(200).json('OK-DELETE');
    } catch (e) {
      next(e);
    }
  }

};
