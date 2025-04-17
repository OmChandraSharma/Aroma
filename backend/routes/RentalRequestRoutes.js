const express = require('express');
const RentalRequest = require('../models/RentalRequest');
const Listing = require('../models/listing');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

// Create rental request
router.post('/rental/:listing_id', authMiddleware, async (req, res) => {
    const { rent_duration, rent_charge } = req.body;
    const user_id = req.user.id;
    const { listing_id } = req.params;

    try {
        // Check if the listing exists and is available for rent
        const listing = await Listing.findById(listing_id);
        if (!listing) return res.status(404).json({ message: 'Listing not found' });

        const rentalRequest = new RentalRequest({ user_id, listing_id, rent_duration, rent_charge });
        await rentalRequest.save();

        res.status(201).json({ message: 'Rental request submitted successfully', rentalRequest });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
