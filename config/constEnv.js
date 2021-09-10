module.exports = {
  ACCESSSECRETKEY: process.env.AccessSecretKey || '1secret',
  ACTIONSECRETKEY: process.env.ActionSecretKey || '3secret',
  CONNECT: process.env.CONNECT || 'mongodb://localhost:27017/Okten-2021',
  FORGOTSECRETKEY: process.env.ForgotSecretKey || '4secret',
  REFRESHSECRETKEY: process.env.RefreshSecretKey || '2secret',
  PORT: process.env.PORT || 5000,
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'asddf@gmail.com',
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'asdf66',
  VIZIT_URL: process.env.VIZIT_URL || 'https://www.youtube.com'
};
