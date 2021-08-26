const express = require('express');
const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { loginRouter, userRouter } = require('./routers');

app.use('/login', loginRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log('OK! port', PORT);
});
