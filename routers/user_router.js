const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/:user_id', userController.getSingleUser);
// router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;
