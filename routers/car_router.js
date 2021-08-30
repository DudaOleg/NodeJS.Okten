const router = require('express').Router();

const { carController } = require('../controllers');
const { isValidField, isCarPresent } = require('../middlewares/car_middleware');

router.post('/', isValidField, carController.createCar);
router.get('/', carController.getAllCar);
router.get('/:car_id', isCarPresent, carController.getSingleCar);
router.patch('/:car_id', isCarPresent, carController.updateCar);
router.delete('/:car_id', isCarPresent, carController.deleteCar);

module.exports = router;
