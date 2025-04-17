exports.createListing = async (req, res) => {
    try {
      const imageUrl = req.file.path; // Cloudinary URL
      const imagePublicId = req.file.filename; // In case you want to delete it later
  
      // Save this URL to your product schema or whatever you want
      // Example:
      // const newItem = new ListingModel({
      //   name: req.body.name,
      //   image: imageUrl,
      //   ...
      // });
    //   const newListing = new Listing({
    //     user_id: req.userId,
    //     product_name,
    //     category,
    //     product_price,
    //     product_count,
    //     product_image: imageUrl
    //   });
  
      res.status(200).json({ imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to upload image" });
    }
  };
  