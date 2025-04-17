const express = require('express');
const Order = require('../models/order');
const Listing = require('../models/listing');
const Cart = require('../models/cart');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

// Create an order
router.post('/order', authMiddleware, async (req, res) => {
    const { cartItems } = req.body;
    const user_id = req.user.id;

    try {
        // Check if cart items exist
        const cart = await Cart.find({ user_id, _id: { $in: cartItems } });
        if (!cart.length) return res.status(404).json({ message: 'No items in cart' });

        let totalAmount = 0;

        // Create order for each cart item
        const orders = [];
        for (let item of cart) {
            const product = await Listing.findById(item.product_id);
            if (!product) continue;

            const order = new Order({
                user_id,
                listing_id: product._id,
                quantity: item.count,
                price: product.product_price * item.count
            });

            totalAmount += order.price;
            await order.save();
            orders.push(order);
        }

        // Remove items from cart
        await Cart.deleteMany({ user_id, _id: { $in: cartItems } });

        res.status(201).json({ message: 'Order placed successfully', orders, totalAmount });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
