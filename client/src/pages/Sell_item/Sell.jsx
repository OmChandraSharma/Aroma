import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import styles from "./Sell.module.css";

const Sell = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [listingType, setListingType] = useState("normal");
  const [imagePreviews, setImagePreviews] = useState([]);

  const [price, setPrice] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [rentalRate, setRentalRate] = useState("");

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleListingTypeChange = (type) => {
    setListingType(type);
    // Reset specific fields
    setPrice("");
    setStartingBid("");
    setRentalRate("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with:", {
      productName,
      description,
      listingType,
      price,
      startingBid,
      rentalRate,
      imageCount: imagePreviews.length,
    });

    alert("Form submitted successfully!");

    setProductName("");
    setDescription("");
    setListingType("normal");
    setImagePreviews([]);
    setPrice("");
    setStartingBid("");
    setRentalRate("");
  };

  return (
    <div className={styles.sellPage}>
      <Header className={styles.fixedHeader} />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Add your listing to the site</h1>
        <form className={styles.sellForm} onSubmit={handleSubmit}>
          <div className={styles.formContent}>
            {/* Image Upload */}
            <div className={styles.imageArea}>
              <div
                className={styles.imageUploadBox}
                onClick={() => document.getElementById("file-input").click()}
              >
                {imagePreviews.length > 0 ? (
                  <div className={styles.previewStack}>
                    {imagePreviews.map((imgSrc, index) => (
                      <img
                        key={index}
                        src={imgSrc}
                        alt={`Preview ${index}`}
                        className={`${styles.previewImage} ${
                          styles[`stack${index % 5}`]
                        }`}
                      />
                    ))}
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreviews([]);
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <div className={styles.uploadIcon}>+</div>
                    <p>Click to upload images</p>
                  </div>
                )}
                <input
                  type="file"
                  id="file-input"
                  className={styles.hiddenInput}
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className={styles.detailsArea}>
              <div className={styles.inputGroup}>
                <label htmlFor="product-name">Name of product</label>
                <input
                  type="text"
                  id="product-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Listing Type Section */}
              <div className={styles.inputGroup}>
                <label>Listing Type</label>
                <div className={styles.radioOptions}>
                  {["normal", "bidding", "rent"].map((type) => (
                    <div className={styles.radioOption} key={type}>
                      <input
                        type="radio"
                        id={type}
                        name="listing-type"
                        value={type}
                        checked={listingType === type}
                        onChange={() => handleListingTypeChange(type)}
                      />
                      <label htmlFor={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)} listing
                      </label>
                    </div>
                  ))}
                </div>

                {/* Conditional Inputs */}
                {listingType === "normal" && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="price">Price (₹)</label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                )}

                {listingType === "bidding" && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="startingBid">Starting Bid (₹)</label>
                    <input
                      type="number"
                      id="startingBid"
                      value={startingBid}
                      onChange={(e) => setStartingBid(e.target.value)}
                      placeholder="Enter starting bid"
                      required
                    />
                  </div>
                )}

                {listingType === "rent" && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="rentalRate">Rental Rate (₹/day)</label>
                    <input
                      type="number"
                      id="rentalRate"
                      value={rentalRate}
                      onChange={(e) => setRentalRate(e.target.value)}
                      placeholder="Enter rate per day"
                      required
                    />
                  </div>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                Create Listing
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;
