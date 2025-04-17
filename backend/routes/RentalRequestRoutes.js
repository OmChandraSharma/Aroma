const express = require('express');
// const RentalRequest = require('../models/RentalRequest');
const Listing = require('../models/listing');
const User = require('../models/User');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

// Create rental request 

router.post('/rental/:listing_id', authMiddleware, async (req, res) => {
    const { rent_duration, seller_id } = req.body;
    const user_id = req.user.id;
    const { listing_id } = req.params;

    try {
        // 1. Find the listing
        const listing = await Listing.findById(listing_id);
        if (!listing) return res.status(404).json({ message: 'Listing not found' });

        // 2. Update listing rent status and availability date
        listing.rent_status = 1;
        listing.again_avail_to_rent = new Date(Date.now() + rent_duration * 24 * 60 * 60 * 1000); // Assuming rent_duration in days
        await listing.save();

        
        // 4. Get seller's email
        const seller = await User.findById(seller_id);
        if (!seller) return res.status(404).json({ message: 'Seller not found' });

        // 5. Return response
        res.status(201).json({
            message: 'Rental request submitted successfully',
            seller_email: seller.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
