const express = require('express');
const Bid = require('../models/bid'); // Bid schema
const Listing = require('../models/listing');
const User = require('../models/User.js');
const authMiddleware = require('../authMiddleware');
const router = express.Router();
const Order = require('../models/order.js');

// const Bid = require('../models/Bid');
// const Listing = require('../models/listing');
// const Order = require('../models/order');

// Place a bid on a product
router.post('/:listing_id', authMiddleware, async (req, res) => {
    const { bid_amount } = req.body;
    const user_id = req.user.id;
    const { listing_id } = req.params;
  
    try {
      const listing = await Listing.findById(listing_id);
      if (!listing) return res.status(404).json({ message: 'Listing not found' });
      if (!listing.is_biddable) return res.status(400).json({ message: 'Item is not biddable' });
  
      let existingBid = await Bid.findOne({ listing_id });
  
      // Check if bid duration is over
      if (existingBid && new Date() > existingBid.bid_end_time) {
        // Bid time over: sell item to highest bidder
        const order = new Order({
          user_id: existingBid.user_id,
          listing_id,
          product_name: listing.product_name,
          product_price: listing.product_price,
          quantity: 1,
          ordered_at: Date.now()
        });
        await order.save();
        await Listing.findByIdAndDelete(listing_id);
        await Bid.deleteOne({ listing_id });
        const seller_id = listing.seller_id
        const seller = await User.findById(seller_id);
        if (!seller) return res.status(404).json({ message: 'Seller not found' });
  
        return res.status(200).json({ message: 'Bid ended. Item sold to highest bidder.', seller_email: seller.email });
      }
  
      // New bid must be higher
      if (existingBid && existingBid.bid_amount >= bid_amount) {
        return res.status(400).json({ message: 'Bid must be higher than current bid' });
      }
  
      const bid_end_time = existingBid
        ? existingBid.bid_end_time
        : new Date(Date.now() + listing.bid_duration_time * 1000); // Assuming bid_duration_time is in seconds
  
      // If no previous bid, create new
      if (!existingBid) {
        const newBid = new Bid({ user_id, listing_id, bid_amount, bid_end_time });
        await newBid.save();
        listing.product_price = bid_amount,
        listing.bid_status = 1;
        await listing.save();
      } else {
        // Update existing bid
        existingBid.user_id = user_id;
        existingBid.bid_amount = bid_amount;
        listing.product_price = bid_amount,
        await listing.save();
        await existingBid.save();
      }
  
      res.status(201).json({ message: 'Bid placed successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// Get all bids for a listing
// router.get('/bid/:listing_id', async (req, res) => {
//     const { listing_id } = req.params;

//     try {
//         const bids = await Bid.find({ listing_id, bid_status: 'active' }).sort({ bid_amount: -1 });
//         res.status(200).json(bids);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// Close the bid on a product (auction end)
router.put('/close-bid/:bid_id', authMiddleware, async (req, res) => {
    const { bid_id } = req.params;

    try {
        const bid = await Bid.findById(bid_id);

        if (!bid) return res.status(404).json({ message: 'Bid not found' });

        // Only allow the seller to close the bid
        const listing = await Listing.findById(bid.listing_id);
        if (!listing || listing.seller_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Only the seller can close the bid' });
        }

        // bid.bid_status = 'closed';
        // await bid.save();
        // res.status(200).json({ message: 'Bid closed successfully', bid });

        const order = new Order({
            user_id: bid.user_id,
            listing_id: listing._id,
            product_name: listing.product_name,
            product_price: listing.product_price,
            quantity: 1,
            ordered_at: Date.now()
          });
          await order.save();
    
          await Listing.findByIdAndDelete(listing._id);
          await Bid.findByIdAndDelete(bid_id);
          const seller_id = listing.seller_id
          const seller = await User.findById(seller_id);
          if (!seller) return res.status(404).json({ message: 'Seller not found' });
    
        //   return res.status(200).json({ message: 'Bid ended. Item sold to highest bidder.', seller_email: seller.email });
    
          return res.status(200).json({ message: 'Bid ended. Item sold to highest bidder.',seller_email: seller.email });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
