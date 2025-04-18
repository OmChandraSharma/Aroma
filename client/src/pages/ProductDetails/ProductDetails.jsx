import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState(state || null);

  useEffect(() => {
    if (state) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://172.31.95.71:3000/api/list/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer your_token_here", // Replace with valid token
            },
          }
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchDetails();
  }, [productId, state]);

  if (!product) return <div>Loading...</div>;

  const {
    product_name,
    product_price,
    product_image,
    description_address,
    is_avail_to_rent,
    rent_status,
    again_avail_to_rent,
    rent_price_day,
    is_biddable,
    bid_status,
    bid_end_time,
  } = product;

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.detailsWrapper}>
        <img src={product_image} alt={product_name} className={styles.image} />
        <div className={styles.info}>
          <h2>{product_name}</h2>
          <p className={styles.price}>₹{product_price}</p>
          <p>{description_address}</p>

          <div className={styles.actions}>
            {/* Rent Logic */}
            {is_avail_to_rent === true && rent_status === false && (
              <div className={styles.rentSection}>
                <p>
                  <strong>Rent per day:</strong> ₹{rent_price_day}
                </p>
                <button className={styles.rentButton}>Rent Now</button>
              </div>
            )}

            {is_avail_to_rent === true &&
              rent_status === true &&
              again_avail_to_rent && (
                <p className={styles.notice}>
                  Available for rent again on:{" "}
                  <strong>
                    {new Date(again_avail_to_rent).toLocaleDateString()}
                  </strong>
                </p>
              )}

            {/* Bid/Buy Logic */}
            {is_biddable === false && (
              <button className={styles.buyButton}>Buy Now</button>
            )}

            {is_biddable === true && bid_status === false && (
              <button className={styles.bidButton}>Place a Bid</button>
            )}

            {is_biddable === true && bid_status === true && bid_end_time && (
              <div className={styles.bidInfo}>
                <p>Bidding is ongoing.</p>
                <p>
                  Bidding ends at:{" "}
                  <strong>{new Date(bid_end_time).toLocaleString()}</strong>
                </p>
                <button className={styles.bidButton}>Place a Bid</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
