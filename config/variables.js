module.exports = {
  ADMIN: 'admin',
  ACCESS: 'access',
  AUTHORIZATION: 'Authorization',
  CAR_ID: 'car_id',
  CURRENT_YEAR: new Date().getFullYear(),
  EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
  ID: '_id',
  PARAMS: 'params',
  PASSWORD_REGEXP: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
  REFRESH: 'refresh',
  USER: 'user',
  USER_ID: 'user_id',
};
