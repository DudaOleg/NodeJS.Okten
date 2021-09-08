const { emailActionsEnum: { WELCOME, CREATE, DELETE_USER, DELETE_ADMIN, UPDATE, FORGOT } } = require('../config');

module.exports = {
  [WELCOME]: {
    templateName: 'welcome',
    subject: 'WELCOME'
  },
  [CREATE]: {
    templateName: 'create',
    subject: 'CREATE'
  },
  [DELETE_USER]: {
    templateName: 'delete_user',
    subject: 'DELETE_USER'
  },
  [DELETE_ADMIN]: {
    templateName: 'delete_admin',
    subject: 'DELETE_ADMIN'
  },
  [UPDATE]: {
    templateName: 'update',
    subject: 'UPDATE'
  },
  [FORGOT]: {
    templateName: 'forgot',
    subject: 'FORGOT'
  },
};
