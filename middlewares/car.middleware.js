const { ErrorHandler, errorMess } = require('../errors');
const { carService } = require('../services');

module.exports = {
  isCarValid: async (req, res, next) => {
    try {
      const { car, model, price } = req.body;

      const cars = await carService.findCar();

      if (!car || !model || price) {
        throw new ErrorHandler(404, errorMess.NOT_FOUND.message, errorMess.NOT_FOUND.code);
      }

      cars.forEach((value) => {
        if (value.model === model) {
          throw new ErrorHandler(409, errorMess.NOT_EXISTS.message, errorMess.NOT_EXISTS.code);
        }
      });
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsValid: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const carById = await carService.findCarById(carId);

      if (carId < 0) {
        throw new ErrorHandler(400, errorMess.NOT_VALID_ID.message, errorMess.NOT_VALID_ID.code);
      }

      if (!carById) {
        throw new ErrorHandler(404, errorMess.NOT_FOUND.message, errorMess.NOT_FOUND.code);
      }

      req.car = carById;

      next();
    } catch (e) {
      next(e);
    }
  },

  isCarValidId: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const carById = await carService.findCarById(carId);

      if (!carById) {
        throw new ErrorHandler(404, errorMess.NOT_FOUND.message, errorMess.NOT_FOUND.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
