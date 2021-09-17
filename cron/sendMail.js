const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const AccessRefresh = require('../dataBase/Token');
const { emailService } = require('../services');
const {
  emailActionsEnum: {
    TEST_MAIL,
    UPDATE
  },
  variables: {
    USERS,
    DAY
  }
} = require('../config');

module.exports = async () => {
  const tenDaysAfter = datJs.utc()
    .subtract(10, DAY);

  const users = await AccessRefresh.find({ createdAt: { $lt: tenDaysAfter } }).populate(USERS);

  if (!users) {
    console.log('users not found');
    return;
  }

  await Promise.allSettled(users.map(async (item) => {
    await emailService.sendMail(TEST_MAIL, UPDATE, { userName: item.user.name });
  }));
};
