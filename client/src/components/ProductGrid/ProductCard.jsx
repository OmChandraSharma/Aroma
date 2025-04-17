import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img
        src={product.imageUrl}
        alt={product.title}
        className={styles.image}
      />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>{product.price}</p>
    </div>
  );
};

export default ProductCard;
