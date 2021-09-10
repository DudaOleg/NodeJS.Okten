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
  },
  adminController: {
    createUserForAdmin
  }
} = require('../controllers');
const {
  userMiddleware: {
    validator,
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
    updateUserValidator,
  }
} = require('../validators');

router.post('/admin',
  accessToken,
  checkUserRole([ADMIN]),
  validator(createUserValidator),
  checkUniqueEmailOrLogin,
  createUserForAdmin);
router.post('/active',
  actionToken,
  userActive);
router.post('/signup',
  validator(createUserValidator),
  checkUniqueEmailOrLogin,
  createUser);
router.get('/',
  getAllUsers);
router.get('/:user_id',
  checkOn(USER_ID, PARAMS, ID),
  getSingleUser);
router.patch('/:user_id',
  validator(updateUserValidator),
  accessToken, checkOn(USER_ID, PARAMS, ID),
  checkUserRole([ADMIN]),
  updateUser);
router.delete('/:user_id',
  accessToken,
  checkOn(USER_ID, PARAMS, ID),
  checkUserRole([ADMIN]),
  deleteUser);

module.exports = router;
