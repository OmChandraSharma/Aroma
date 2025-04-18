import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `http://localhost:3000/`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.items || []);
        console.log("loaded")
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <div key={product._id} className={styles.cardWrapper}>
          <ProductCard product={product} />
          console.log(product._id)
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
