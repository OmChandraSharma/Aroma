import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/cart/view-cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product_price * item.count, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartItems}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className={styles.cartCard} key={item.product_id}>
              <img
                src={item.product_image}
                alt={item.product_name}
                className={styles.image}
                onClick={() => navigate(`/product/${item.product_id}`)}
              />
              <div className={styles.details}>
                <h3>{item.product_name}</h3>
                <p><strong>Price:</strong> ₹{item.product_price}</p>
                <p><strong>Quantity:</strong> {item.count}</p>
                <p><strong>Bid:</strong> {item.is_biddable ? "Available" : "Not Available"}</p>
                <p><strong>Rent:</strong> {item.avail_to_rent ? "Available" : "Not Available"}</p>
                <button className={styles.bidButton}>Bid</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.cartSummary}>
        <h2>Cart Summary</h2>
        <p><strong>Total Items:</strong> {cartItems.length}</p>
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        <button className={styles.buyAllButton}>Buy All</button>
      </div>
    </div>
  );
};

export default CartPage;
