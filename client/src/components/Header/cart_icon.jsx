import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "./cart.svg"; // adjust path if needed

const CartIcon = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.Cart} onClick={() => navigate("/Cart")}>
      <img src={cartIcon} alt="Cart" className={styles.cartImage} />
    </button>
  );
};

export default CartIcon;
