import styles from "./Header.module.css";
import DarkModeToggle from "./DarkModeToggle";
import Header_logo from "./Header_logo";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import Profile from "./Profile";
import { isLoggedIn } from "../../utils/auth";


function Header() {
  const loggedIn = isLoggedIn();
  return (
    <header className={styles.header}>
      <Header_logo />
      <SearchBar />
      <DarkModeToggle />
      {loggedIn ? <Profile /> : <LoginButton />}
     
    </header>
  );
}

export default Header;
