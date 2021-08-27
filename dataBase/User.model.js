const {
  Schema,
  model
} = require('mongoose');

const { dataBaseEnum } = require('../constants');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: {
    type: Number,
    default: 15
  }

}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

module.exports = model(dataBaseEnum.USER, userSchema);
