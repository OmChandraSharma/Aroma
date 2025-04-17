import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "./FloatingSellButton.module.css"; // Import styles

const FloatingSellButton = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleSellClick = () => {
    navigate("/sell"); // Navigate to the Sell page
  };

  return (
    <button className={styles.sellButton} onClick={handleSellClick}>
      <div className={styles.original}>+Sell</div>
      <div className={styles.letters}>
        <span>+</span>
        <span>S</span>
        <span>E</span>
        <span>L</span>
        <span>L</span>
      </div>
    </button>
  );
};

export default FloatingSellButton;
