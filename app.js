const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, CONNECT } = require('./dataBase/connect');

const app = express();

mongoose.connect(CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, carRouter, authRouter } = require('./routers');
const { code, errorMessage } = require('./errors');

app.use('/authorization', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  console.log('Ok port', PORT);
});

function _notFoundError(err, req, res, next) {
  next({
    status: err.status || code.NOT_FOUND,
    message: err.message || errorMessage.notFound
  });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || code.SERVER_ERROR)
    .json({ message: err.message });
}
