const mongoose = require('mongoose');

// Define the Listing Schema
const listingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,  // Refers to the user who owns the listing
    required: true,
    ref: 'User' // Assuming you have a User model
  },
  product_id: {
    type: String, // Unique product identifier
    required: true,
    unique: true
  },
  product_name: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  product_image: {
    type: String // URL of the product image
  },
  product_count: {
    type: Number,
    required: true,
    min: 0 // Prevents negative stock count
  }
}, { timestamps: true });

// Create and export the model
module.exports = mongoose.model('Listing', listingSchema);
