const { carService } = require('../services');
const { ErrorHandler, errorMessage, code } = require('../errors');
const { carValidator: { carValidator } } = require('../validators');

module.exports = {
  isCarPresent: async (req, res, next) => {
    try {
      const { car_id } = req.params;
      const findCarById = await carService.getById(car_id);

      if (!findCarById) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessage.notFoundCar);
      }
      req.car_id = findCarById;
      next();
    } catch (e) {
      next(e);
    }
  },

  isValidField: (req, res, next) => {
    try {
      const { error } = carValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.BAD_REQUEST, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
