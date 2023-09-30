const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let productsSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  }
}, {
  collection: 'products',
  timestamps: true
});

module.exports = mongoose.model('Product', productsSchema);