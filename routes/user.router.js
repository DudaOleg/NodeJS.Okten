const router = require('express')
  .Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
  userMiddleware.isUserValid,
  userController.createUser);

router.get('/:userId',
  userMiddleware.checkIsValid,
  userController.getUserById);

router.delete('/:userId',
  userMiddleware.isUserValidId,
  userController.removeUserById);

router.patch('/:userId',
  userMiddleware.isUserValidId,
  userController.updateUser);

module.exports = router;
