const router = require('express').Router();

const {
  variables: {
    ID,
    PARAMS,
    USER_ID,
    ADMIN
  }
} = require('../config');
const {
  userController: {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getSingleUser,
    userActive
  }
} = require('../controllers');
const {
  userMiddleware: {
    validBody,
    checkOn,
    checkUniqueEmailOrLogin,
    checkUserRole
  },
  authMiddleware: {
    accessToken,
    actionToken,
  }
} = require('../middlewares');
const {
  userValidator: {
    createUserValidator,
    updateUserValidator
  }
} = require('../validators');

router.post('/signup',
  validBody(createUserValidator),
  checkUniqueEmailOrLogin,
  createUser);
router.post('/active',
  actionToken,
  userActive);
router.get('/',
  getAllUsers);
router.get('/:user_id',
  checkOn(USER_ID, PARAMS, ID),
  getSingleUser);
router.patch('/:user_id',
  validBody(updateUserValidator),
  accessToken, checkOn(USER_ID, PARAMS, ID),
  checkUserRole([ADMIN]),
  updateUser);
router.delete('/:user_id',
  accessToken,
  checkOn(USER_ID, PARAMS, ID),
  checkUserRole([ADMIN]),
  deleteUser);

module.exports = router;
