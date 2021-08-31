const router = require('express').Router();

const {
  userController: {
    createUser, getAllUsers, updateUser, deleteUser, getSingleUser
  }
} = require('../controllers');
const {
  userMiddleware: {
    validBody, isUserPresent, checkEmailOrLogin, validUpdateBody
  }
} = require('../middlewares');

router.post('/', validBody, checkEmailOrLogin, createUser);
router.get('/', getAllUsers);
router.get('/:user_id', isUserPresent, getSingleUser);
router.patch('/:user_id', validUpdateBody, isUserPresent, updateUser);
router.delete('/:user_id', isUserPresent, deleteUser);

module.exports = router;
