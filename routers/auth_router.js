const router = require('express').Router();

const { authController: { loginUser, logOutUser, refresh } } = require('../controllers');
const { authMiddleware: { checkAuthDataValid, authorization, accessToken, refreshToken } } = require('../middlewares');

router.post('/', checkAuthDataValid, authorization, loginUser);
router.post('/logout', accessToken, logOutUser);
router.post('/refresh', refreshToken, refresh);

module.exports = router;
