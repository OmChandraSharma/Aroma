import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`, {});
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={product.product_image}
        alt={product.product_name}
        className={styles.image}
      />
      <h3 className={styles.title}>{product.product_name}</h3>
      <p className={styles.price}>Rs. {product.product_price}</p>
    </div>
  );
};

export default ProductCard;
