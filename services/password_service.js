const bcrypt = require('bcrypt');
const { code, errorMessage, ErrorHandler } = require('../errors');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: async (hash, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hash);

    if (!isPasswordMatched) {
      throw new ErrorHandler(code.BAD_REQUEST, errorMessage.wrongEmailOrPass);
    }
  }
};
