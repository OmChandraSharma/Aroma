const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  phone: {type : String , required: true},

  // Optional: future role support
  // role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
