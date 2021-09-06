const router = require('express').Router();

const { authMiddleware: { checkAuthDataValid, authorization, accessToken, refreshToken } } = require('../middlewares');

const { authController: { loginUser, logOutUser, refresh } } = require('../controllers');

router.post('/', checkAuthDataValid, authorization, loginUser);
router.post('/logout', accessToken, logOutUser);
router.post('/refresh', refreshToken, refresh);

module.exports = router;
