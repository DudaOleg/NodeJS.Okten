const router = require('express').Router();

const { userController } = require('../controllers');
const { checkEmail, isUserPresent, isValidData } = require('../middlewares/user_middleware');

router.post('/', isValidData, checkEmail, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.patch('/:user_id', isUserPresent, userController.updateUser);
router.delete('/:user_id', isUserPresent, userController.deleteUser);

module.exports = router;
