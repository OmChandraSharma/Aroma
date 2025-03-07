import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src="/public/aroma_logo.jpg" className={styles.logo} />
      <input
        type="text"
        placeholder="Search products..."
        className={styles.searchBar}
      />
      <div className={styles.authButtons}>
        <button className={styles.loginButton}>Login/Signup</button>
      </div>
    </header>
  );
};

export default Header;
