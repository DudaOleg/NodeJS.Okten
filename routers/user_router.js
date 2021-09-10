const router = require('express').Router();

const {
  variables: {
    ID,
    PARAMS,
    USER_ID,
    ADMIN,
    ACCESS,
    ACTION
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
    verifyToken
  }
} = require('../middlewares');
const {
  userValidator: {
    createUserValidator,
    updateUserValidator,
  }
} = require('../validators');

router.post('/admin',
  verifyToken(ACCESS),
  checkUserRole([ADMIN]),
  validator(createUserValidator),
  checkUniqueEmailOrLogin,
  createUserForAdmin);
router.post('/active',
  verifyToken(ACTION),
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
  verifyToken(ACCESS),
  checkOn(USER_ID, PARAMS, ID),
  checkUserRole([ADMIN]),
  updateUser);
router.delete('/:user_id',
  verifyToken(ACCESS),
  checkOn(USER_ID, PARAMS, ID),
  checkUserRole([ADMIN]),
  deleteUser);

module.exports = router;
