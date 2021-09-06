const { Schema, model } = require('mongoose');

const { USER, TOKEN } = require('./dataBaseName');

const tokenSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
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

module.exports = model(TOKEN, tokenSchema);
