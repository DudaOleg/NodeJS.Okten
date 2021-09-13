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
    createAdmin
  }
} = require('../controllers');
const {
  userMiddleware: {
    validator,
    checkOn,
    checkEmailOrLogin,
    checkRole
  },
  authMiddleware: {
    verifyToken
  },
  fileMiddleware: {
    checkFile
  }
} = require('../middlewares');
const {
  userValidator: {
    create,
    update,
  }
} = require('../validators');

router.post('/admin', verifyToken(ACCESS), checkRole([ADMIN]), validator(create), checkEmailOrLogin, createAdmin);
router.post('/active', verifyToken(ACTION), userActive);
router.post('/signup', validator(create), checkFile, checkEmailOrLogin, createUser);
router.get('/', getAllUsers);
router.get('/:user_id', checkOn(USER_ID, PARAMS, ID), getSingleUser);
router.patch('/:user_id', validator(update), checkFile, verifyToken(ACCESS), checkOn(USER_ID, PARAMS, ID),
  checkRole([ADMIN]),
  updateUser);
router.delete('/:user_id', verifyToken(ACCESS), checkOn(USER_ID, PARAMS, ID), checkRole([ADMIN]), deleteUser);

module.exports = router;
