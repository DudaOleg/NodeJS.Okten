const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const { constEnv: { ACCESSSECRETKEY, REFRESHSECRETKEY }, variables: { ACCESS } } = require('../config');
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

  verifyToken: async (token, tokenType = ACCESS) => {
    try {
      const secret = tokenType === ACCESS ? ACCESSSECRETKEY : REFRESHSECRETKEY;

      const verify = promisify(jwt.verify);
      await verify(token, secret);
    } catch (e) {
      throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
    }
  }
};
