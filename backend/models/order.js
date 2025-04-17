const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the user who made the purchase
    required: true,
    ref: 'User'
  },
  listing_id: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the item that was purchased
    required: true,
    ref: 'Listing'
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  },
  date: { type: Date, default: Date.now } // Timestamp of the order
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
