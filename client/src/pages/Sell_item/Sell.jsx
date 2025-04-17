import { useState } from "react"; // Import useState hook for managing state
import Header from "../../components/Header/Header.jsx"; // Import Header component
import "./Sell.module.css"; // Import CSS file for styling

const Sell = () => {
  console.log("sell page called");

  // State variables for form inputs
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [listingType, setListingType] = useState("normal");
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image file selection
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    // If a file was selected
    if (selectedFile) {
      // Create a URL for the image to display preview
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Log the form data
    console.log("Form submitted with:", {
      productName,
      description,
      listingType,
      hasImage: imagePreview ? true : false,
    });

    // Here you would typically send the data to a server
    alert("Form submitted successfully!");
  };

  return (
    <div className="sell-page">
      {/* Include the Header component */}
      <Header />

      <div className="container">
        <h1 className="page-title">Sell Your Product</h1>

        {/* Product listing form */}
        <form className="sell-form" onSubmit={handleSubmit}>
          <div className="form-content">
            {/* Left side - Image upload area */}
            <div className="image-area">
              <div
                className="image-upload-box"
                onClick={() => document.getElementById("file-input").click()}
              >
                {imagePreview ? (
                  // Show image preview if an image is selected
                  <div className="preview-container">
                    <img
                      src={imagePreview}
                      alt="Product"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent's onClick
                        setImagePreview(null); // Clear the image preview
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  // Show upload placeholder if no image is selected
                  <div className="upload-placeholder">
                    <div className="upload-icon">+</div>
                    <p>Click to upload image</p>
                  </div>
                )}

                {/* Hidden file input - activated by clicking on the box */}
                <input
                  type="file"
                  id="file-input"
                  className="hidden-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Right side - Product details */}
            <div className="details-area">
              {/* Product name input */}
              <div className="input-group">
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

              {/* Listing type options */}
              <div className="input-group">
                <label>Listing Type</label>
                <div className="radio-options">
                  {/* Normal listing option */}
                  <div className="radio-option">
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

                  {/* Bidding option */}
                  <div className="radio-option">
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

                  {/* Rent option */}
                  <div className="radio-option">
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

              {/* Description textarea */}
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <button type="submit" className="submit-button">
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
