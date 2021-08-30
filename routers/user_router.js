const router = require('express').Router();

const {
  userController: {
    createUser, getAllUsers, updateUser, deleteUser, getSingleUser
  }
} = require('../controllers');
const { userMiddleware: { validateUserBody, isUserPresent, checkEmail } } = require('../middlewares');

router.post('/', validateUserBody, checkEmail, createUser);
router.get('/', getAllUsers);
router.get('/:user_id', isUserPresent, getSingleUser);
router.patch('/:user_id', isUserPresent, updateUser);
router.delete('/:user_id', isUserPresent, deleteUser);

module.exports = router;
