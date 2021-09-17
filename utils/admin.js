const { userDataBase } = require('../dataBase');
const { passwordService: { hash } } = require('../services');
const {
  variables: {
    ADMIN
  },
  constEnv: {
    NAME_FIRST_ADMIN, PASS_FIRST_ADMIN, EMAIL_FIRST_ADMIN, LOGIN_FIRST_ADMIN
  }
} = require('../config');

module.exports = (async () => {
  const user = await userDataBase.findOne();

  if (!user) {
    const defaultAdmin = {
      name: NAME_FIRST_ADMIN,
      password: await hash(PASS_FIRST_ADMIN),
      email: EMAIL_FIRST_ADMIN,
      login: LOGIN_FIRST_ADMIN,
      role: ADMIN
    };

    await userDataBase.create(defaultAdmin);
  }
})();
