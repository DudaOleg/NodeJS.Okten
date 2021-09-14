const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const User = require('../dataBase/User');
const { emailService } = require('../services');
const { UPDATE } = require('../config/email_actions_enum');

module.exports = async () => {
  const tenDaysAfter = datJs.utc()
    .subtract(10, 'day');

  const users = await User.find({ lastLogin: { $lt: tenDaysAfter } });

  if (!users) {
    console.log('users not found');
    return;
  }

  for await (const user of users) {
    await emailService.sendMail(user.email, UPDATE, { userName: user.name });
  }
};
