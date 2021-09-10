const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
  constEnv: {
    ACCESSSECRETKEY,
    REFRESHSECRETKEY,
    ACTIONSECRETKEY,
    FORGOTSECRETKEY
  }, variables: { ACCESS }
} = require('../config');
const { ErrorHandler, code, errorMessage } = require('../errors');
const {
  REFRESH,
  ACTION,
  FORGOT
} = require('../config/variables');

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

  generateActionToken: (word, time) => {
    const actionToken = jwt.sign({
    }, word, {
      expiresIn: time
    });

    return {
      actionToken
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    try {
      let secret = '';
      switch (tokenType) {
        case ACCESS:
          secret = ACCESSSECRETKEY;
          break;
        case REFRESH:
          secret = REFRESHSECRETKEY;
          break;
        case ACTION:
          secret = ACTIONSECRETKEY;
          break;
        case FORGOT:
          secret = FORGOTSECRETKEY;
      }

      await verify(token, secret);
    } catch (e) {
      throw new ErrorHandler(code.NOT_VALID, errorMessage.notValidToken);
    }
  }
};
