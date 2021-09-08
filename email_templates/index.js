const { emailActionsEnum: { WELCOME, CREATE, DELETE_USER, DELETE_ADMIN, UPDATE, FORGOT, ACTIVE } } = require('../config');

module.exports = {
  [WELCOME]: {
    templateName: 'welcome',
    subject: 'WELCOME'
  },
  [CREATE]: {
    templateName: 'create',
    subject: 'CREATE'
  },
  [ACTIVE]: {
    templateName: 'active',
    subject: 'ACTIVE'
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
