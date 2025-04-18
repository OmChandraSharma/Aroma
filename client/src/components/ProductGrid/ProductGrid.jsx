import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("➡️ Fetching products for category:", selectedCategory);

        const url = `http://172.31.95.71:3000/`;
        console.log("🔗 API URL:", url);

        const res = await fetch(url);
        const data = await res.json();

        console.log("📦 Raw response data:", data);

        const items = data.items || data;
        console.log("✅ Parsed items:", items);

        setProducts(items);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setProducts([]);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    } else {
      console.warn("⚠️ No category selected. Skipping fetch.");
    }
  }, [selectedCategory]);

  return (
    <div className={styles.gridContainer}>
      {products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No products found.
        </p>
      )}
      {products.map((product) => {
        console.log("🧱 Rendering product:", product._id, product.product_name);
        return (
          <div key={product._id} className={styles.cardWrapper}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
