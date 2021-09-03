const router = require('express').Router();

const {
  carController: {
    deleteCar, getSingleCar, updateCar, createCar, getAllCar
  }
} = require('../controllers');
const { carMiddleware: { isValidField, checkOnCar, validUpdateBody } } = require('../middlewares');
const {
  CAR_ID,
  PARAMS,
  ID
} = require('./variables');

router.post('/', isValidField, createCar);
router.get('/', getAllCar);
router.get('/:car_id', checkOnCar(CAR_ID, PARAMS, ID), getSingleCar);
router.patch('/:car_id', validUpdateBody, checkOnCar(CAR_ID, PARAMS, ID), updateCar);
router.delete('/:car_id', checkOnCar(CAR_ID, PARAMS, ID), deleteCar);

module.exports = router;
