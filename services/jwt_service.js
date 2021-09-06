const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const { AccessSecretKey, RefreshSecretKey } = require('./variables');
const { ErrorHandler,
  code,
  errorMessage } = require('../errors');

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({
    }, AccessSecretKey, {
      expiresIn: '15m'
    });
    const refreshToken = jwt.sign({
    }, RefreshSecretKey, {
      expiresIn: '120m'
    });

    return {
      accessToken,
      refreshToken
    };
  },

  verifyToken: async (token, tokenType = 'access') => {
    try {
      const secret = tokenType === 'access' ? AccessSecretKey : RefreshSecretKey;

      const verify = promisify(jwt.verify);
      await verify(token, secret);
    } catch (e) {
      throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
    }
  }
};
