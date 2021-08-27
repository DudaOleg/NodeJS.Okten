const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carController.getAllCars);

router.post('/',
  carMiddleware.isCarValid,
  carController.createCar);

router.get('/:carId',
  carMiddleware.checkIsValid,
  carController.getCarById);

router.delete('/:carId',
  carMiddleware.isCarValidId,
  carController.removeCarById);

router.patch('/:carId',
  carMiddleware.isCarValidId,
  carController.updateCar);

module.exports = router;
