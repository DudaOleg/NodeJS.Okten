const router = require('express').Router();

const {
  carController: {
    deleteCar, getSingleCar, updateCar, createCar, getAllCar
  }
} = require('../controllers');
const { carMiddleware: { isValidField, isCarPresent, validUpdateBody } } = require('../middlewares');

router.post('/', isValidField, createCar);
router.get('/', getAllCar);
router.get('/:car_id', isCarPresent, getSingleCar);
router.patch('/:car_id', isCarPresent, updateCar);
router.delete('/:car_id', validUpdateBody, isCarPresent, deleteCar);

module.exports = router;
