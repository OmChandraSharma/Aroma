const express = require('express');
const Cart = require('../models/cart'); // Cart schema
const Listing = require('../models/listing');
const authMiddleware = require('../authMiddleware');

const router = express.Router();


// add to cart 
router.post('/', authMiddleware, async (req, res) => {
  const { product_id, count } = req.body;
  const user_id = req.user.id;  // Extracted from JWT token

  try {
    // Check if product already in cart
    let cartItem = await Cart.findOne({ user_id, product_id });

    if (cartItem) {
      // Update the count if item exists
      cartItem.count += count || 1;
    } else {
      // Add new product to cart
      cartItem = new Cart({ user_id, product_id, count: count || 1 });
    }

    await cartItem.save();
    res.status(200).json({ message: 'Item added to cart successfully', cartItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// view cart 
router.get('/view-cart', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user.id;  // Extracted from JWT token
  
      // Fetch cart items for the user
      const cartItems = await Cart.find({ user_id: user_id });
  
      if (!cartItems.length) {
        return res.status(404).json({ message: 'Cart is empty' });
      }
  
      // Fetch product details from Listing collection
      const productDetails = await Promise.all(cartItems.map(async (item) => {
        const product = await Listing.findOne({ _id: item.product_id });
        return {
          product_id : product._id,
          product_name: product.product_name,
          product_image: product.product_image,
          product_price: product.product_price,
          count: item.count,
          bid_status:product.bid_status, // boolean 
          rent_status:product.rent_status,
          is_biddable:product.is_biddable,
          avail_to_rent:product.is_avail_to_rent, // boolean 
          again_avail_to_rent:product.again_avail_to_rent // data 
        };
      }));
  
      res.status(200).json(productDetails);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// update cart
router.put('/:product_id', authMiddleware, async (req, res) => {
    const { action } = req.body; // 'increase', 'decrease', or 'delete'
    const { product_id } = req.params;
    const userId = req.user.id;
  
    try {
      const cartItem = await Cart.findOne({ user_id: userId, product_id });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      if (action === 'increase') {
        cartItem.count += 1;
      } else if (action === 'decrease') {
        cartItem.count = Math.max(cartItem.count - 1, 1); // Minimum count is 1
      } else if (action === 'delete') {
        await Cart.deleteOne({ user_id: userId, product_id });
        return res.status(200).json({ message: 'Item removed from cart' });
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
  
      await cartItem.save();
      res.status(200).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  

module.exports = router;