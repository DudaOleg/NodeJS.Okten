const { Schema, model } = require('mongoose');

const { USER } = require('./dataBaseName');
const userRolesEnum = require('./user_roles_enum');

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  photo: {
    type: String
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    trim: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: userRolesEnum.USER,
    enum: Object.values(userRolesEnum)
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

module.exports = model(USER, userSchema);
