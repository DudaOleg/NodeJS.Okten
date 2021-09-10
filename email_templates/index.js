const {
  emailActionsEnum: {
    WELCOME, CREATE, DELETE_USER, DELETE_ADMIN, UPDATE, FORGOT, ACTIVE, ACTIVE_WITH_ADMIN
  }
} = require('../config');

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
    subject: 'DELETE USER'
  },
  [DELETE_ADMIN]: {
    templateName: 'delete_admin',
    subject: 'DELETE ADMIN'
  },
  [UPDATE]: {
    templateName: 'update',
    subject: 'UPDATE'
  },
  [FORGOT]: {
    templateName: 'forgot',
    subject: 'FORGOT'
  },
  [ACTIVE_WITH_ADMIN]: {
    templateName: 'activeWithAdmin',
    subject: 'active with Admin'
  }
};
