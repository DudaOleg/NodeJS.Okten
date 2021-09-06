const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const { constEnv: { ACCESSSECRETKEY, REFRESHSECRETKEY } } = require('../config');
const { ErrorHandler, code, errorMessage } = require('../errors');

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({
    }, ACCESSSECRETKEY, {
      expiresIn: '15m'
    });
    const refreshToken = jwt.sign({
    }, REFRESHSECRETKEY, {
      expiresIn: '120m'
    });

    return {
      accessToken,
      refreshToken
    };
  },

  verifyToken: async (token, tokenType = 'access') => {
    try {
      const secret = tokenType === 'access' ? ACCESSSECRETKEY : REFRESHSECRETKEY;

      const verify = promisify(jwt.verify);
      await verify(token, secret);
    } catch (e) {
      throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
    }
  }
};
