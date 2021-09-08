const router = require('express').Router();

const { authController: { loginUser, logOutUser, refresh },
  forgotController: { forgotPass, newPass } } = require('../controllers');
const { authMiddleware: { checkAuthDataValid, authorization, accessToken, refreshToken, loginValidator, forgotToken },
  userMiddleware: { checkOn, validForgotPass } } = require('../middlewares');
const { variables: { LOGIN } } = require('../config');

router.post('/', checkAuthDataValid, authorization, loginUser);
router.post('/logout', accessToken, logOutUser);
router.post('/refresh', refreshToken, refresh);
router.post('/forgot', loginValidator, checkOn(LOGIN), forgotPass);
router.put('/forgot', forgotToken, validForgotPass, newPass);

module.exports = router;
