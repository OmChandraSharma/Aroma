import React from "react";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

// Dummy cart data for testing
const cartItems = [
  {
    id: 1,
    name: "Product 1",
    description: "Some description for Product 1",
    price: 500,
    rent: 50,
    image: "/sample1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Another product details",
    price: 700,
    rent: 70,
    image: "/sample2.jpg",
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div className={styles.cartCard} key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              onClick={() => navigate(`/product/${item.id}`)}
              className={styles.image}
            />
            <div className={styles.details}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p><strong>Rent:</strong> ₹{item.rent}/day</p>
              <button className={styles.bidButton}>Bid</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <h2>Cart Total</h2>
        <p>Total Price: ₹{totalPrice}</p>
        <button className={styles.buyAllButton}>Buy All</button>
      </div>
    </div>
  );
};

export default CartPage;
