const router = require('express').Router();
const { authMiddleware: { checkAuthDataValid, authorization } } = require('../middlewares');
const { authController: { loginUser } } = require('../controllers');

router.post('/', checkAuthDataValid, authorization, loginUser);

module.exports = router;
