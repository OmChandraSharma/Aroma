import { useState, useEffect, useRef } from "react";
import styles from "./FilterPanel.module.css";

const FilterPanel = ({ selectedCategory, setSelectedCategory }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = ["All", "Electronics", "Bicycle", "Gadgets"];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.filterPanel}>
      <div className={styles.leftSection}>
        <div className={styles.dropdown} ref={dropdownRef}>
          <button
            className={styles.dropdownButton}
            onClick={() => setDropdownOpen((prev) => !prev)}
            type="button"
          >
            Filter <span className={styles.triangle}>▼</span>
          </button>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <div
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                Price Range (Custom)
              </div>
              <div
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                Price: Low to High
              </div>
              <div
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                Price: High to Low
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick(category)}
              type="button"
            >
              {category}
            </button>
          ))}
          <button className={styles.filterButton}>More Categories</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
