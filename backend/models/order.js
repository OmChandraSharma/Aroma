const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId, // Refers to the user who made the purchase
//     required: true,
//     ref: 'User'
//   },
//   listing_id: {
//     type: mongoose.Schema.Types.ObjectId, // Refers to the item that was purchased
//     required: true,
//     ref: 'Listing'
//   },
//   quantity: { type: Number, required: true },
//   price: { type: Number, required: true },
//   // status: {
//   //   type: String,
//   //   enum: ['pending', 'shipped', 'delivered'],
//   //   default: 'pending'
//   // },d
//   date: { type: Date, default: Date.now } // Timestamp of the order
// }, { timestamps: true });

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listing_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  product_name: String,
  product_price: Number,
  quantity: { type: Number, default: 1 },
  ordered_at: { type: Date, default: Date.now }
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
