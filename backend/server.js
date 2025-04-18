const logger = require('./logger');
console.log("welcome! server is up!!");



var fs = require('fs'); // file handling package 
var _ = require("lodash"); // this package is used for data manipulation , explore different functionalities
var os = require('os') // this package to know the details of the system 

const cors = require("cors"); // allows cross origin request , Middleware to allow frontend (like React on port 3000) to make requests to backend (on port 5000).
const dotenv = require("dotenv"); // Loads variables from .env file (like secret keys or database URLs).



const express = require("express"); // creating server through express.js , imports express frameworks ,Framework to create APIs easily.
const app = express() // now app has all functionalities to  form a server 
const db = require('./db')// jaise hi server file run yeh db file bhi run huyi 

const cart = require('./models/cart');
const Listing = require('./models/listing');
const User = require('./models/User');

const cartRoutes = require('./routes/cartRoutes');
const listingRoutes = require('./routes/listingRoutes');
const authRoutes = require("./routes/auth");

dotenv.config(); //Loads variables like PORT, JWT_SECRET, MONGO_URI from a .env file into process.env.

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());



app.use(cors());  //Allows requests from other origins (e.g., frontend on different port).Parses incoming request body as JSON (important for POST/PUT APIs).
// app.use(express.json());

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Now you can access files like http://localhost:5000/uploads/image.jpg
// It tells Express: "If anyone requests http://localhost:5000/uploads/somefile.jpg, serve them the actual image stored in the uploads/ folder."
// console.log('__dirname:', __dirname); // 👈 This line shows the current directory
// Log every request (info-level) NEWWW
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// home page rendering of 12 images to post it in grid 
app.get('/', async (req, res) => {
    try {
      const listings = await Listing.find().limit(12); // Fetch top 12 listings
      res.status(200).json(listings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

app.use("/api/auth", authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/list',listingRoutes);
//NEWWWW
//  Error-handling middleware 
app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    logger.info("listening on port 3000"); //LOGGER.INFO KRA
})  // server iss room(port) pr hai

const updatelog = (product_name, seller_account, buyer_account, price) => {
    const logEntry = `${product_name} seller:${seller_account} buyer:${buyer_account} price:${price}\n`;

    fs.appendFile("logs.txt", logEntry, (err) => {
        if (err) {
            console.error("Error writing to log:", err);
        } else {
            console.log("Order logged successfully");
        }
    });
};





// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// app.use("/api/auth", require("./routes/auth"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
