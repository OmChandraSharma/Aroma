import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `http://localhost:3000/`; // Replace with actual API URL if needed
        const res = await fetch(url);
        const data = await res.json();

        const transformed = (data.items || []).map((item) => ({
          _id: item._id?.$oid || item._id,
          title: item.product_name,
          imageUrl: item.product_image,
          price: `₹${item.product_price}`,
        }));

        setProducts(transformed);
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
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
