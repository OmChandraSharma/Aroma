import styles from "./DarkModeToggle.module.css"; // Import CSS file for styling
import { useState, useEffect } from "react";
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add(styles.dark_mode);
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove(styles.dark_mode);
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <label className={styles.toggle_switch}>
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default DarkModeToggle;
