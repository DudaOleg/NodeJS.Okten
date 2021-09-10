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
    checkAuthDataValid,
    authorization,
    loginValidator,
    checkPassForChange,
    ForgotPass,
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

router.post('/', checkAuthDataValid, authorization, loginUser);
router.post('/logout', verifyToken(ACCESS), logOutUser);
router.post('/refresh', verifyToken(REFRESH), refresh);
router.post('/password/reset', loginValidator, checkOn(LOGIN), forgotPass);
router.patch('/change', verifyToken(FORGOT), validator(onePasswordValidator), ForgotPass, updatePass);
router.patch('/password/change', verifyToken(ACCESS), validator(twoPasswordsValidator), checkPassForChange, updatePass);

module.exports = router;
