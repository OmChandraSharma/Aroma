const Listing = require('../models/listing');

exports.createListing = async (req, res) => {
  try {
    const imageUrl = req.file.path; // Cloudinary image URL
    const imagePublicId = req.file.filename; // for deletion (optional)

    // Extract fields from the frontend request
    const {
      seller_id,
      product_name,
      category,
      product_price,
      product_count,
      is_biddable,
      is_avail_to_rent,
      rent_price_per_day,
      bid_time,
      description_address,
      bid_status,
      rent_status,
      again_avail_to_rent
    } = req.body;

    // Create new listing
    const newListing = new Listing({
      seller_id: seller_id,
      product_name,
      category,
      product_price,
      product_image: imageUrl,
      product_count,
      is_biddable,
      is_avail_to_rent,
      rent_price_per_day,
      bid_duration_time: bid_time, // assuming you want to store it in seconds
      description_address,
      bid_status,
      rent_status,
      again_avail_to_rent
    });

    await newListing.save();

    res.status(201).json({ message: "Listing created successfully", listing: newListing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create listing" });
  }
};
