const router = require('express').Router();

const { loginController } = require('../controllers');

router.post('/', loginController.userLogin);

module.exports = router;
