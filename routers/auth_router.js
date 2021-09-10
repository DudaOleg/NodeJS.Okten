const router = require('express').Router();

const {
  authController: {
    loginUser,
    logOutUser,
    refresh,
    forgotPass,
    updatePass
  }
} = require('../controllers');
const {
  authMiddleware: {
    authorization,
    checkPassForChange,
    newPass,
    verifyToken
  },
  userMiddleware: {
    checkOn,
    validator
  }
} = require('../middlewares');
const {
  userValidator: {
    confirmPass,
    oldPass
  },
  auth_validator: {
    login,
    Auth
  }
} = require('../validators');
const {
  variables: {
    LOGIN,
    ACCESS,
    REFRESH,
    FORGOT
  },
} = require('../config');

router.post('/', validator(Auth), authorization, loginUser);
router.post('/logout', verifyToken(ACCESS), logOutUser);
router.post('/refresh', verifyToken(REFRESH), refresh);
router.post('/password/reset', validator(login), checkOn(LOGIN), forgotPass);
router.patch('/change', verifyToken(FORGOT), validator(confirmPass), newPass, updatePass);
router.patch('/password/change', verifyToken(ACCESS), validator(oldPass), checkPassForChange, updatePass);

module.exports = router;
