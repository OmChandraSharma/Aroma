import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState(state || null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");

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

  const handleBidSubmit = async () => {
    if (!bidAmount || isNaN(bidAmount)) {
      setBidMessage("Please enter a valid bid amount.");
      return;
    }

    try {
      const res = await fetch(`http://172.31.95.71:3000/api/bid/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_token_here", // Replace with valid token
        },
        body: JSON.stringify({ bid_amount: parseFloat(bidAmount) }),
      });
      const data = await res.json();

      if (res.ok) {
        setBidMessage(data.message);
        setBidAmount(""); // Clear input
      } else {
        setBidMessage(data.message || "Failed to place bid");
      }
    } catch (err) {
      setBidMessage("Server error while placing bid");
      console.error(err);
    }
  };

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
    current_bid_price,
  } = product;

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.detailsWrapper}>
        <img src={product_image} alt={product_name} className={styles.image} />
        <div className={styles.info}>
          <h2>{product_name}</h2>
          <p className={styles.location}>{description_address}</p>

          {/* Bid Price Block */}
          {is_biddable && (
            <p className={styles.price}>
              <strong>{bid_status ? "Current Bid" : "Starting Bid"}:</strong> ₹
              {bid_status && current_bid_price
                ? current_bid_price
                : product_price}
            </p>
          )}

          {/* Rent Info */}
          {is_avail_to_rent && rent_status === false && (
            <p className={styles.rent}>
              <strong>Rent per day:</strong> ₹{rent_price_day}
            </p>
          )}
          {is_avail_to_rent && rent_status === true && again_avail_to_rent && (
            <p className={styles.notice}>
              Available for rent again on:{" "}
              <strong>
                {new Date(again_avail_to_rent).toLocaleDateString()}
              </strong>
            </p>
          )}

          {/* Action Buttons */}
          <div className={styles.actions}>
            {is_avail_to_rent && rent_status === false && (
              <button className={styles.rentButton}>Rent Now</button>
            )}
            {!is_biddable && (
              <button className={styles.buyButton}>Buy Now</button>
            )}
            <button className={styles.cartButton}>Add to Cart</button>
          </div>

          {/* Bidding Input and Submission */}
          {is_biddable && (
            <div className={styles.bidForm}>
              <input
                type="number"
                placeholder="Enter your bid (₹)"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className={styles.bidInput}
              />
              <button className={styles.bidButton} onClick={handleBidSubmit}>
                Submit Bid
              </button>
              {bidMessage && <p className={styles.bidInfo}>{bidMessage}</p>}
            </div>
          )}

          {/* Bidding End Info */}
          {is_biddable && bid_status && bid_end_time && (
            <div className={styles.bidInfo}>
              <p>Bidding is ongoing.</p>
              <p>
                Bidding ends at:{" "}
                <strong>{new Date(bid_end_time).toLocaleString()}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
