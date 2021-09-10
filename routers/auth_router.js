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
    accessToken,
    refreshToken,
    loginValidator,
    actionToken,
    checkPassForChange,
    ForgotPass
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
const { variables: { LOGIN }, constEnv: { FORGOTSECRETKEY } } = require('../config');

router.post('/', checkAuthDataValid, authorization, loginUser);
router.post('/logout', accessToken, logOutUser);
router.post('/refresh', refreshToken, refresh);
router.post('/password/reset', loginValidator, checkOn(LOGIN), forgotPass);
router.patch('/change', actionToken(FORGOTSECRETKEY), validator(onePasswordValidator), ForgotPass, updatePass);
router.patch('/password/change', accessToken, validator(twoPasswordsValidator), checkPassForChange, updatePass);

module.exports = router;
