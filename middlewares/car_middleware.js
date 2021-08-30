const { carService } = require('../services');
const { ErrorHandler, errorMessage } = require('../errors');

module.exports = {
  isCarPresent: async (req, res, next) => {
    try {
      const { car_id } = req.params;
      const findCarById = await carService.getById(car_id);

      if (!findCarById) {
        throw new ErrorHandler(404, errorMessage.notFoundCar);
      }
      req.car_id = findCarById;
      next();
    } catch (e) {
      next(e);
    }
  },

  isValidField: (req, res, next) => {
    try {
      const { car, model, price } = req.body;

      if (!car || !model || !price) {
        throw new ErrorHandler(401, errorMessage.notValidField);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
