const express = require('express');
const { PORT } = require('./config/variables');

const { loginRouter, registrationRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/users', registrationRouter);

app.listen(PORT, () => {
  console.log('OK! port', PORT);
});
