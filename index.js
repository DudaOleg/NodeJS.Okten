const express = require('express');
const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { loginRouter, userRouter } = require('./routers');

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('*', notFoundError);
app.use(mainErrorHandler);

app.listen(PORT, () => {
  console.log('OK! port', PORT);
});

// next--Передай наступному обробнику;
function notFoundError(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Not Found'
  });
}

// eslint-disable-next-line no-unused-vars
function mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({ message: err.message });
}
