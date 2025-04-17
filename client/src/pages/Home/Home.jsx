import Header from "../../components/Header/Header.jsx";
import FilterPanel from "../../components/FilterPanel/FilterPanel.jsx";
import FloatingSellButton from "../../components/FloatingSellButton/FloatingSellButton.jsx";
import ProductGrid from "../../components/ProductGrid/ProductGrid.jsx";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <div className={styles.scrollableSection}>
        <FilterPanel />
        <ProductGrid />
      </div>
      <FloatingSellButton />
    </div>
  );
};

export default Home;
