import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url;

        if (!selectedCategory) {
          console.warn("⚠️ No category selected. Skipping fetch.");
          return;
        } else if (selectedCategory === "All") {
          url = "http://172.31.95.71:3000/api/list/render/All";
        } else {
          url = `http://172.31.95.71:3000/api/list/category/${selectedCategory}`;
        }

        console.log("🔗 Fetching from:", url);

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        const items = data.items || data; // Adjust if `.items` only comes from /category
        setProducts(items);
        console.log("✅ Products received:", items);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err.message);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className={styles.gridContainer}>
      {products.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No products found.
        </p>
      ) : (
        products.map((product) => (
          <div key={product._id} className={styles.cardWrapper}>
            <ProductCard product={product} />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductGrid;
