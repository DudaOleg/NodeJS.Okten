const router = require('express').Router();

const { authController: { loginUser, logOutUser, refresh, forgotPass, updatePass } } = require('../controllers');
const { authMiddleware: { checkAuthDataValid, authorization, accessToken, refreshToken, loginValidator, actionToken },
  userMiddleware: { checkOn, validActionPass } } = require('../middlewares');
const { variables: { LOGIN } } = require('../config');

router.post('/', checkAuthDataValid, authorization, loginUser);
router.post('/logout', accessToken, logOutUser);
router.post('/refresh', refreshToken, refresh);
router.post('/password/reset', loginValidator, checkOn(LOGIN), forgotPass);
router.patch('/password/change', actionToken, validActionPass, updatePass);

module.exports = router;
