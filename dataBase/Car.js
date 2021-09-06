const { Schema, model } = require('mongoose');
const { CARS } = require('./dataBaseName');

const carSchema = new Schema({
  car: {
    type: String,
    include: true,
    trim: true,
    required: true
  },

  model: {
    type: String,
    trim: true,
    required: true
  },

  price: {
    type: Number,
    trim: true,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model(CARS, carSchema);
