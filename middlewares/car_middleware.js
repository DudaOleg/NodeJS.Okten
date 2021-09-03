const { carService } = require('../services');
const { ErrorHandler, errorMessage, code } = require('../errors');
const { carValidator: { carValidator } } = require('../validators');
const { updateCarValidator } = require('../validators/car_validator');

module.exports = {
  checkOnCar: (params, searchIn, dbField = params) => async (req, res, next) => {
    try {
      const value = req[searchIn][params];

      const car = await carService.getById({ [dbField]: value });

      if (!car) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessage.notFoundUser);
      }

      req.car = car;
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
  },

  validUpdateBody: (req, res, next) => {
    try {
      const { error } = updateCarValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.BAD_REQUEST, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
