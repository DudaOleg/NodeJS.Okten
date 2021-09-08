const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const { constEnv: { ACCESSSECRETKEY, REFRESHSECRETKEY, FORGOTSECRETKEY }, variables: { ACCESS } } = require('../config');
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

  generateForgotToken: () => {
    const forgotToken = jwt.sign({
    }, FORGOTSECRETKEY, {
      expiresIn: '20m'
    });

    return {
      forgotToken
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

  verifyForgetToken: async (token) => {
    try {
      await verify(token, FORGOTSECRETKEY);
    } catch (e) {
      throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
    }
  },
};
