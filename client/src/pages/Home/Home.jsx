import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import FilterPanel from "../../components/FilterPanel/FilterPanel.jsx";
// import ProductCard from "../../components/ProductCard/ProductCard.jsx";
// import styles from "./Home.module.css";
// import axios from "axios";


const Home = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       // Replace with your backend endpoint
  //       const res = await axios.get("http://localhost:5000/api/products");
  //       setProducts(res.data.products);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <div>
      <Header />
      <FilterPanel />
       {/* <div className={styles.productGrid}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div> */}
    </div> 
  );
};

export default Home;
