const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the user placing the bid
    required: true,
    ref: 'User'
  },
  listing_id: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the item being bid on
    required: true,
    ref: 'Listing'
  },
  bid_amount: {
    type: Number, // The amount being bid
    required: true
  },
  bid_time: { 
    type: Date, 
    default: Date.now
  },
  bid_status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  }
}, { timestamps: true });

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
