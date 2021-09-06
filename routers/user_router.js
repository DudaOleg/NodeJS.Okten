const router = require('express').Router();

const { userController: { createUser, getAllUsers, updateUser, deleteUser, getSingleUser } } = require('../controllers');
const { userMiddleware: { validBody, checkOn, checkUniqueEmailOrLogin, validUpdateBody, checkUserRole },
  authMiddleware: { accessToken } } = require('../middlewares');

const { ID, PARAMS, USER_ID } = require('./variables');

const { userRoles: { ADMIN } } = require('../dataBase');

router.post('/', validBody, checkUniqueEmailOrLogin, createUser);
router.get('/', getAllUsers);
router.get('/:user_id', checkOn(USER_ID, PARAMS, ID), getSingleUser);
router.patch('/:user_id', validUpdateBody, checkOn(USER_ID, PARAMS, ID), accessToken, checkUserRole([ADMIN]), updateUser);
router.delete('/:user_id', checkOn(USER_ID, PARAMS, ID), accessToken, checkUserRole([ADMIN]), deleteUser);

module.exports = router;
