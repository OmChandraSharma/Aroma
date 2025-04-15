const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  price:{type:Number, required:true },
  count: { type: Number, default: 1 },
});

const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart
