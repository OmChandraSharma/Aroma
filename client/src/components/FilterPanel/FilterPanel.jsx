import styles from "./FilterPanel.module.css";

const FilterPanel = () => {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.dropdown}>
        <button className={styles.dropdownButton}>
          Filter <span className={styles.triangle}>▼</span>
        </button>
      </div>
      <div className={styles.dropdownContent}>
        <a href="#">Price</a>
        <a href="#">Ratings</a>
        <a href="#">Newest</a>
      </div>
      <div className={styles.categoryButtons}>
        <button className={styles.filterButton}>Electronics</button>
        <button className={styles.filterButton}>Bicycle</button>
        <button className={styles.filterButton}>Gadgets</button>
      </div>
    </div>
  );
};

export default FilterPanel;
