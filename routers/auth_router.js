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
    onePasswordValidator,
    twoPasswordsValidator
  },
  auth_validator: {
    loginValidator,
    validAuth
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

router.post('/', validator(validAuth), authorization, loginUser);
router.post('/logout', verifyToken(ACCESS), logOutUser);
router.post('/refresh', verifyToken(REFRESH), refresh);
router.post('/password/reset', validator(loginValidator), checkOn(LOGIN), forgotPass);
router.patch('/change', verifyToken(FORGOT), validator(onePasswordValidator), newPass, updatePass);
router.patch('/password/change', verifyToken(ACCESS), validator(twoPasswordsValidator), checkPassForChange, updatePass);

module.exports = router;
