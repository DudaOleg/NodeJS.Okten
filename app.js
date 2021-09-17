const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const { constEnv: { PORT, CONNECT, ALLOWED_ORIGINS } } = require('./config');
const cronJobs = require('./cron');

const app = express();

mongoose.connect(CONNECT);

app.use(cors({ origin: _configureCors }));

app.use(helmet());

app.use(expressRateLimit({
  windowMs: 15 * 60 * 100,
  max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

const { userRouter, carRouter, authRouter, } = require('./routers');
const {
  code, errorMessage,
  ErrorHandler
} = require('./errors');
const swaggerJSON = require('./docs/swagger.json');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use('/authorization', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ok port', PORT);
  cronJobs();
  require('./utils/admin');
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
    .json({
      message: err.message
    });
}

function _configureCors(origin, callback) {
  const whiteList = ALLOWED_ORIGINS.split(';');

  if (!origin && process.env.NODE_ENV === 'dev') {
    return callback(null, true);
  }

  if (!whiteList.includes(origin)) {
    return callback(new ErrorHandler(code.FORBIDDEN, errorMessage.Cors), false);
  }

  return callback(null, true);
}
