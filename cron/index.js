const cron = require('node-cron');

const sendMail = require('./sendMail');

module.exports = () => {
  cron.schedule(' 30 6 * * 1,3,5 ', async () => {
    await sendMail();
  });
};
