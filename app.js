const express = require('express');
const mongoose = require('mongoose');

const { PORT, CONNECT } = require('./dataBase/connect');

const app = express();

mongoose.connect(CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, carRouter } = require('./routers');

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  console.log('Ok port', PORT);
});

function _notFoundError(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Not found'
  });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({ message: err.message });
}
