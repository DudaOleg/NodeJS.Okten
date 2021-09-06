module.exports = {
  ACCESSSECRETKEY: process.env.AccessSecretKey || 'Asecret',
  CONNECT: process.env.CONNECT || 'mongodb://localhost:27017/Okten-2021',
  REFRESHSECRETKEY: process.env.RefreshSecretKey || 'Rsecret',
  PORT: process.env.PORT || 5000
};
