import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/product/${product._id}`)}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        {product.forRent && <span className={styles.tag}>Rent</span>}
        {product.biddingEnabled && <span className={styles.tag}>Bid</span>}
      </div>
    </div>
  );
};

export default ProductCard;
