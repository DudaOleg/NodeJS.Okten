const {
  Schema,
  model
} = require('mongoose');

const { dataBaseEnum } = require('../constantsa');

const carSchema = new Schema({
  car: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 1500
  }

}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

module.exports = model(dataBaseEnum.USER, carSchema);
