const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // product_id: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  product_name: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  product_image: {
    type: String
  },
  product_count: {
    type: Number,
    required: true,
    min: 0
  },
  is_biddable: {  // New field for bidding
    type: Boolean,
    default: false
  },
  is_avail_to_rent: {
    type: String,
  },
  rent_price_day: {
    type: Number,
    default: 0
  },
  bid_time: {  // New field for bid window
    type: Number, // time in seconds
    default: null
  },
  description_address:{
    type: String,
    default: null
  },
  bid_status: { type: Boolean, default: 0 }, // 'active', 'expired', etc.
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
