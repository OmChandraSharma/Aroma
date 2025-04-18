import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import styles from "./ProductDetails.module.css";
import { getToken } from "../../utils/auth.js";

const ProductDetails = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState(state || null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [rentDuration, setRentDuration] = useState("");
  const [rentMessage, setRentMessage] = useState("");

  useEffect(() => {
    if (state) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://172.31.95.71:3000/api/list/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
        });
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
    current_bid_price,
    seller_id,
  } = product;

  const handlePlaceBid = async () => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      setBidMessage("Please enter a valid bid amount.");
      return;
    }

    try {
      const res = await fetch(`http://172.31.95.71:3000/api/bid/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ bid_amount: parseFloat(bidAmount) }),
      });

      const data = await res.json();
      if (res.ok) {
        setBidMessage(data.message);
        setBidAmount("");

        // Update bid price locally
        setProduct((prev) => ({
          ...prev,
          current_bid_price: parseFloat(bidAmount),
          bid_status: true,
        }));
      } else {
        setBidMessage(data.message || "Failed to place bid.");
      }
    } catch (err) {
      console.error("Bid error:", err);
      setBidMessage("Server error while placing bid.");
    }
  };

  const handleRentNow = async () => {
    if (!rentDuration || isNaN(rentDuration) || rentDuration <= 0) {
      setRentMessage("Please enter a valid rent duration in days.");
      return;
    }

    try {
      const res = await fetch(`http://172.31.95.71:3000/api/list/rental/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          rent_duration: parseInt(rentDuration),
          seller_id: seller_id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRentMessage(data.message);
        setRentDuration("");

        // Optional: update rent status locally
        setProduct((prev) => ({
          ...prev,
          rent_status: true,
          again_avail_to_rent: data.again_avail_to_rent || prev.again_avail_to_rent,
        }));
      } else {
        setRentMessage(data.message || "Failed to rent.");
      }
    } catch (err) {
      console.error("Rent error:", err);
      setRentMessage("Server error while renting.");
    }
  };

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.detailsWrapper}>
        <img src={product_image} alt={product_name} className={styles.image} />
        <div className={styles.info}>
          <h2>{product_name}</h2>
          <p className={styles.location}>{description_address}</p>

          {is_biddable && (
            <p className={styles.price}>
              <strong>{bid_status ? "Current Bid" : "Starting Bid"}:</strong> ₹
              {bid_status && current_bid_price
                ? current_bid_price
                : product_price}
            </p>
          )}

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

          <div className={styles.actions}>
            {is_avail_to_rent && rent_status === false && (
              <div className={styles.rentForm}>
                <input
                  type="number"
                  placeholder="Rent duration (in days)"
                  value={rentDuration}
                  onChange={(e) => setRentDuration(e.target.value)}
                  className={styles.rentInput}
                />
                <button className={styles.rentButton} onClick={handleRentNow}>
                  Rent Now
                </button>
                {rentMessage && (
                  <p className={styles.rentMessage}>{rentMessage}</p>
                )}
              </div>
            )}

            {is_biddable && (
              <div className={styles.bidForm}>
                <input
                  type="number"
                  placeholder="Your bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className={styles.bidInput}
                />
                <button className={styles.bidButton} onClick={handlePlaceBid}>
                  Place a Bid
                </button>
                {bidMessage && (
                  <p className={styles.bidMessage}>{bidMessage}</p>
                )}
              </div>
            )}

            {!is_biddable && (
              <button className={styles.buyButton}>Buy Now</button>
            )}

            <button className={styles.cartButton}>Add to Cart</button>
          </div>

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
