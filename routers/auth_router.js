const router = require('express').Router();

const { authController: { loginUser, logOutUser, refresh },
  actionController: { forgotPass, updatePass } } = require('../controllers');
const { authMiddleware: { checkAuthDataValid, authorization, accessToken, refreshToken, loginValidator, actionToken },
  userMiddleware: { checkOn, validActionPass } } = require('../middlewares');
const { variables: { LOGIN } } = require('../config');

router.post('/', checkAuthDataValid, authorization, loginUser);
router.post('/logout', accessToken, logOutUser);
router.post('/refresh', refreshToken, refresh);
router.post('/forgot', loginValidator, checkOn(LOGIN), forgotPass);
router.patch('/forgot', actionToken, validActionPass, updatePass);

module.exports = router;
