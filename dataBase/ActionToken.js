const { Schema, model } = require('mongoose');

const { USER, ACTION_TOKEN } = require('./dataBaseName');

const actionTokenSchema = new Schema({
  actionToken: {
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

module.exports = model(ACTION_TOKEN, actionTokenSchema);
