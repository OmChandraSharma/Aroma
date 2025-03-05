import Header from "../../components/Header/Header.jsx";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.content}>
        <h1>Welcome to Aroma</h1>
        <p>Discover amazing products at the best prices.</p>
      </div>
    </div>
  );
};

export default Home;
