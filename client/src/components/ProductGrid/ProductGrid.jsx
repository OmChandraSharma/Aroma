import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

const dummyProducts = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Product ${index + 1}`,
  price: `$${(index + 1) * 10}`,
  imageUrl: "https://via.placeholder.com/150",
}));

const ProductGrid = () => {
  return (
    <div className={styles.gridContainer}>
      {dummyProducts.map((product) => (
        <div key={product.id} className={styles.cardWrapper}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
