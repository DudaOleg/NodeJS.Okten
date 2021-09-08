const { Schema, model } = require('mongoose');

const { USER, FORGOT_TOKEN } = require('./dataBaseName');

const forgotTokenSchema = new Schema({
  forgotToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  }
}, {
  timestamps: true
});

module.exports = model(FORGOT_TOKEN, forgotTokenSchema);
