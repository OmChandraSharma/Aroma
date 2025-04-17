import styles from "./Header.module.css";
import DarkModeToggle from "./DarkModeToggle";
import Header_logo from "./Header_logo";
import SearchBar from "./SearchBar";
//import LoginButton from "./LoginButton";
import Profile from "./Profile";

function Header() {
  return (
    <header className={styles.header}>
      <Header_logo />
      <SearchBar />
      <DarkModeToggle /> {/* <LoginButton /> */}
      
      <Profile />
    </header>
  );
}

export default Header;
