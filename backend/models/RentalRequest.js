const mongoose = require('mongoose');

const rentalRequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the user requesting the rental
    required: true,
    ref: 'User'
  },
  listing_id: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the item being rented
    required: true,
    ref: 'Listing'
  },
  rent_end_day:{
    type: timestamps, 
  },
  rent_duration:{ 
    type: Number, // Duration in days or weeks
    required: true 
  },
  rent_charge: {
    type: Number, // Rent price per day/week
    required: true
  },
  // status: {
  //   type: String,
  //   enum: ['pending', 'approved', 'rejected'],
  //   default: 'pending'
  // },
  date: { type: Date, default: Date.now } // Timestamp of the rent request
}, { timestamps: true });

const RentalRequest = mongoose.model('RentalRequest', rentalRequestSchema);
module.exports = RentalRequest;
