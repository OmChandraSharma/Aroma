import styles from "./Header.module.css";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import DarkModeToggle from "./DarkModeToggle";
import Header_logo from "./Header_logo";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";

>>>>>>> 71c6d58ef84a0a4c69a1e26e3d6f68eefc209c8c
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
<<<<<<< HEAD
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
=======
      <Header_logo />
      <SearchBar />
      <DarkModeToggle />
      <LoginButton />
>>>>>>> 71c6d58ef84a0a4c69a1e26e3d6f68eefc209c8c
    </header>
  );
};

export default Header;
