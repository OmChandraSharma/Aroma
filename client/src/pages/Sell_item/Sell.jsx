import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import styles from "./Sell.module.css";

const Sell = () => {
  console.log("sell page called");

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [listingType, setListingType] = useState("normal");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted with:", {
      productName,
      description,
      listingType,
      hasImage: !!imagePreview,
    });

    alert("Form submitted successfully!");

    // Clear fields
    setProductName("");
    setDescription("");
    setListingType("normal");
    setImagePreview(null);
  };

  return (
    <div className={styles.sellPage}>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Add your listing to the site</h1>

        <form className={styles.sellForm} onSubmit={handleSubmit}>
          <div className={styles.formContent}>
            {/* Left - Image Upload */}
            <div className={styles.imageArea}>
              <div
                className={styles.imageUploadBox}
                onClick={() => document.getElementById("file-input").click()}
              >
                {imagePreview ? (
                  <div className={styles.previewContainer}>
                    <img
                      src={imagePreview}
                      alt="Product"
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <div className={styles.uploadIcon}>+</div>
                    <p>Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  id="file-input"
                  className={styles.hiddenInput}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Right - Product Details */}
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

              <div className={styles.inputGroup}>
                <label>Listing Type</label>
                <div className={styles.radioOptions}>
                  <div className={styles.radioOption}>
                    <input
                      type="radio"
                      id="normal"
                      name="listing-type"
                      value="normal"
                      checked={listingType === "normal"}
                      onChange={() => setListingType("normal")}
                    />
                    <label htmlFor="normal">Normal listing</label>
                  </div>

                  <div className={styles.radioOption}>
                    <input
                      type="radio"
                      id="bidding"
                      name="listing-type"
                      value="bidding"
                      checked={listingType === "bidding"}
                      onChange={() => setListingType("bidding")}
                    />
                    <label htmlFor="bidding">Bidding</label>
                  </div>

                  <div className={styles.radioOption}>
                    <input
                      type="radio"
                      id="rent"
                      name="listing-type"
                      value="rent"
                      checked={listingType === "rent"}
                      onChange={() => setListingType("rent")}
                    />
                    <label htmlFor="rent">Rent</label>
                  </div>
                </div>
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
