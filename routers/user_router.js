const router = require('express').Router();

const { variables: { ID, PARAMS, USER_ID, ADMIN } } = require('../config');
// eslint-disable-next-line max-len
const { userController: { createUser, getAllUsers, updateUser, deleteUser, getSingleUser, userActiveOk } } = require('../controllers');
const { userMiddleware: { validBody, checkOn, checkUniqueEmailOrLogin, validUpdateBody, checkUserRole },
  authMiddleware: { accessToken, forgotToken } } = require('../middlewares');

router.post('/', validBody, checkUniqueEmailOrLogin, createUser);
router.post('/active', forgotToken, userActiveOk);
router.get('/', getAllUsers);
router.get('/:user_id', checkOn(USER_ID, PARAMS, ID), getSingleUser);
router.patch('/:user_id', validUpdateBody, accessToken, checkOn(USER_ID, PARAMS, ID), checkUserRole([ADMIN]), updateUser);
router.delete('/:user_id', accessToken, checkOn(USER_ID, PARAMS, ID), checkUserRole([ADMIN]), deleteUser);

module.exports = router;
