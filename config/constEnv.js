module.exports = {
  ACCESS_SECRET_KEY: process.env.AccessSecretKey || '1secret',
  ACTIONSECRETKEY: process.env.ActionSecretKey || '3secret',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'asasaas',
  AWS_S3_NAME: process.env.AWS_S3_NAME || 'olo',
  AWS_S3_REGION: process.env.AWS_S3_REGION || 'olo',
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || 'olo',
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || 'olo',
  CONNECT: process.env.CONNECT || 'mongodb://localhost:27017/Okten-2021',
  FORGOTSECRETKEY: process.env.ForgotSecretKey || '4secret',
  REFRESHSECRETKEY: process.env.RefreshSecretKey || '2secret',
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'asddf@gmail.com',
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'asdf66',
  VIZIT_URL: process.env.VIZIT_URL || 'https://www.youtube.com',
};
