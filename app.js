const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');
const { constants } = require('./constants');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.use('*', _notFoundError);
app.use(_hadleErrors);

app.listen(constants.PORT, () => {
  console.log(constants.PORT);
});

function _connectDB() {
  mongoose.connect(constants.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('bd ok'))
    .catch((error) => console.log(error));
}

function _notFoundError(err, req, res, next) {
  next(
    {
      status: err.status || 404,
      message: err.message || 'Not found'
    }
  );
}

// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 500
    });
}
