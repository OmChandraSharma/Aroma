import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <img src="/public/aroma_logo.jpg" className={styles.logo} />
      <input
        type="text"
        placeholder="Search products..."
        className={styles.searchBar}
      />
      <div className={styles.authButtons}>
        {/* <button className={styles.button} onClick={() => navigate("/cart")}>Cart</button> */}
        <button className={styles.button} onClick={() => navigate("/login")}>Login</button>
        <button className={styles.button} onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
