import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx"; // <-- Added
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/list/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your_token_here", // Replace with real token if needed
          },
        });
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchDetails();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Header /> {/* <-- Displayed at top */}
      <div className={styles.detailsWrapper}>
        <img
          src={product.product_image}
          alt={product.product_name}
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>{product.product_name}</h2>
          <p className={styles.price}>₹{product.product_price}</p>
          <p>{product.description_address}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
