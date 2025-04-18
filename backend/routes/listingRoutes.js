const express = require('express');
const Cart = require('../models/cart'); // Cart schema
const Listing = require('../models/listing'); // listing schema
const authMiddleware = require('../authMiddleware');
const Order = require('../models/order');
const router = express.Router();
const User = require('../models/User')

// // ✅ Switch between cloud and local upload
// const upload = require('../middlewares/uploadLocal'); // Change to uploadCloudinary when needed

// router.post('/upload',authMiddleware, upload.single('image'), async (req, res) => {
//   // const { product_name, product_price, product_count, category } = req.body;

//   try {
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // URL to serve the image

//     // const newListing = new Listing({
//     //   user_id: req.userId,
//     //   product_name,
//     //   category,
//     //   product_price,
//     //   product_count,
//     //   product_image: imageUrl
//     // });

//     // await newListing.save();
//     res.status(201).json(imageUrl);
//     // res.status(201).json(newListing);
//   } catch (err) {
//     console.error('Error creating listing:', err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

upload = require('../middlewares/uploadCloudinary');
const { createListing } = require('../controllers/ListingController');
const { conformsTo } = require('lodash');
// Add listings by seller to the database
router.post('/upload',authMiddleware, upload.single('image'), createListing);



// Search route
router.get('/:product_name', async (req, res) => {
    const { product_name } = req.params;
  
    try {
      const products = await Listing.find({ product_name: { $regex: new RegExp(product_name, 'i') } }); // to identify similar strings , machine learning thing , i signifies lower case and upper case to be treated as same 
  
      if (!products.length) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      const productDetails = products.map(product => ({
        seller_id: product.seller_id,
        product_name: product.product_name,
        product_image: product.product_image,
        product_price: product.product_price,
        bid_status:product.bid_status, // boolean 
        rent_status:product.rent_status,
        is_biddable:product.is_biddable,
        avail_to_rent:product.is_avail_to_rent, // boolean 
        again_avail_to_rent:product.again_avail_to_rent // data 

      }));
  
      res.status(200).json(productDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  


// product card 
router.post('/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const listing = await Listing.findOne({ _id: product_id });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

  // Buy item, decrease count, and remove from cart if present
  router.post('/buy/:product_id', authMiddleware, async (req, res) => {
    const { product_id } = req.params;
  
    try {
      const product = await Listing.findOne({ _id: product_id });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      if (product.product_count <= 0) {
        return res.status(400).json({ message: 'Out of stock' });
      }
  
      // Decrease product count
      product.product_count -= 1;
      await product.save();
  
      // Remove from cart
      await Cart.findOneAndDelete({ user_id: req.user.id, product_id });
  
      // Create order
      const newOrder = new Order({
        user_id: req.user.id,
        listing_id: product._id,
        product_name: product.product_name,
        product_price: product.product_price,
        quantity: 1, // default is 1, or set dynamically if needed
      });
  
      await newOrder.save();
      const seller_id = product.seller_id
      const seller = await User.findById(seller_id);
      if (!seller) return res.status(404).json({ message: 'Seller not found' });
    
        //   return res.status(200).json({ message: 'Bid ended. Item sold to highest bidder.', seller_email: seller.email });
    
      res.status(200).json({ message: 'Purchase successful',seller_email: seller.email });
      // res.status(200).json({
      //   message: 'Purchase successful',
      //   order: newOrder,
      // });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

  
  // Filter products by price range and sort
router.get('/filter', async (req, res) => {
    const { min_price, max_price, sort } = req.query;
  
    const filter = {
      product_price: {
        $gte: min_price || 0,  // default values mentioned against them 
        $lte: max_price || Infinity
      }
    };
  
    const sortOption = sort === 'low-to-high' ? { product_price: 1 } : { product_price: -1 }; // equality in both values and type === 
  
    try {
      const products = await Listing.find(filter).sort(sortOption);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // In your listing routes
router.get('/:category_name', async (req, res) => {
  const { category_name } = req.params;

  try {
      // Fetch items that belong to the specified category
      const items = await Listing.find({ category: category_name });

      if (items.length === 0) {
          return res.status(404).json({ message: 'No items found for this category' });
      }

      res.status(200).json({ message: 'Items fetched successfully', items });
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.get('/All', async (req, res) => {
  try {
    const listings = await Listing.find(); // Fetch top 12 listings
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// In your listing routes
router.get('/items/filter', async (req, res) => {
  const { category, priceMin, priceMax } = req.query;

  try {
      let filter = {};

      // Filter by category if provided
      if (category) {
          filter.category = category;
      }

      // Filter by price range if provided
      if (priceMin && priceMax) {
          filter.product_price = { $gte: priceMin, $lte: priceMax };
      }

      // Fetch items that match the filter criteria
      const items = await Listing.find(filter);

      if (items.length === 0) {
          return res.status(404).json({ message: 'No items found with the applied filters' });
      }

      res.status(200).json({ message: 'Items fetched successfully', items });
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
});

  
  module.exports = router;