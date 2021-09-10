const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const { constEnv: { ACCESSSECRETKEY, REFRESHSECRETKEY }, variables: { ACCESS } } = require('../config');
const { ErrorHandler, code, errorMessage } = require('../errors');

const verify = promisify(jwt.verify);

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
      refreshToken,
    };
  },

  generateActionToken: (word) => {
    const actionToken = jwt.sign({
    }, word, {
      expiresIn: '20m'
    });

    return {
      actionToken
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    try {
      const secret = tokenType === ACCESS ? ACCESSSECRETKEY : REFRESHSECRETKEY;

      await verify(token, secret);
    } catch (e) {
      throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
    }
  },

  verifyActionToken: async (token, word) => {
    try {
      await verify(token, word);
    } catch (e) {
      throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
    }
  },
};
