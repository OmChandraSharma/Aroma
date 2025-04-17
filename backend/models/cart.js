const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },

  // price: { type: Number, required: true },
  count: { type: Number, default: 1, min: 1 }
  
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
