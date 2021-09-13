module.exports = {
  ADMIN: 'admin',
  ACCESS: 'access',
  ACTION: 'action',
  AUTHORIZATION: 'Authorization',
  CAR_ID: 'car_id',
  CURRENT_YEAR: new Date().getFullYear(),
  EMAIL_TEMPLATES: 'email_templates',
  EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
  EMAIL: 'email',
  FORGOT: 'forgot',
  LOGIN: 'login',
  GMAIL: 'gmail',
  ID: '_id',
  PARAMS: 'params',
  PASSWORD_REGEXP: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
  PHOTO_MAX_SIZE: 5 * 1024 * 1024,
  REFRESH: 'refresh',
  MIME_TYPES: {
    PHOTO: [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ]
  },
  TIME_FORGOT: '20m',
  TIME_ACTION: '20m',
  TIME_ADMIN: '20m',
  USER: 'user',
  USERS: 'users',
  USER_ID: 'user_id'
};
