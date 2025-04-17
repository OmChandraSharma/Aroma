const express = require('express');
const Bid = require('../models/bid'); // Bid schema
const Listing = require('../models/listing');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

// Place a bid on a product
router.post('/bid/:listing_id', authMiddleware, async (req, res) => {
    const { bid_amount } = req.body;
    const user_id = req.user.id;
    const { listing_id } = req.params;

    try {
        // Check if the listing exists and is biddable
        const listing = await Listing.findById(listing_id);
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        if (!listing.is_biddable) return res.status(400).json({ message: 'This item is not biddable' });

        // Check if the bid is higher than the current bid
        const existingBid = await Bid.findOne({ listing_id }).sort({ bid_amount: -1 });
        if (existingBid && existingBid.bid_amount >= bid_amount) {
            return res.status(400).json({ message: 'Bid must be higher than the current highest bid' });
        }

        const bid = new Bid({ user_id, listing_id, bid_amount });
        await bid.save();

        res.status(201).json({ message: 'Bid placed successfully', bid });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get all bids for a listing
router.get('/bid/:listing_id', async (req, res) => {
    const { listing_id } = req.params;

    try {
        const bids = await Bid.find({ listing_id, bid_status: 'active' }).sort({ bid_amount: -1 });
        res.status(200).json(bids);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Close the bid on a product (auction end)
router.put('/close-bid/:bid_id', authMiddleware, async (req, res) => {
    const { bid_id } = req.params;

    try {
        const bid = await Bid.findById(bid_id);

        if (!bid) return res.status(404).json({ message: 'Bid not found' });

        // Only allow the seller to close the bid
        const listing = await Listing.findById(bid.listing_id);
        if (!listing || listing.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Only the seller can close the bid' });
        }

        bid.bid_status = 'closed';
        await bid.save();
        res.status(200).json({ message: 'Bid closed successfully', bid });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
