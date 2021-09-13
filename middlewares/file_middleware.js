const { variables: { PHOTO_MAX_SIZE, MIME_TYPES } } = require('../config');
const { ErrorHandler, code, errorMessage } = require('../errors');

module.exports = {
  checkFile: (req, res, next) => {
    try {
      if (!req.files || !req.files.photo) {
        return next();
      }

      const { size, mimetype } = req.files.photo;

      if (size > PHOTO_MAX_SIZE) {
        throw new ErrorHandler(code.BAD_REQUEST, errorMessage.FileIsTooBig);
      }

      if (!MIME_TYPES.PHOTO.includes(mimetype)) {
        throw new ErrorHandler(code.BAD_REQUEST, errorMessage.WrongFile);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
