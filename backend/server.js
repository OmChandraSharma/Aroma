console.log("welcome! server is up!!");



var fs = require('fs'); // file handling package 
var _ = require("lodash"); // this package is used for data manipulation , explore different functionalities
var os = require('os') // this package to know the details of the system 




const express = require("express"); // creating server through express.js
const app = express() // now app has all functionalities to be form a server 
const db = require('./db')// jaise hi server file run yeh db file bhi run huyi 

const cart = require('./models/cart');
const listItem = require('./models/listing');
const User = require('./models/user_data');

const cartRoutes = require('./routes/cartRoutes');
const listingRoutes = require('./routes/listingRoutes');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());



app.use('/cart', cartRoutes);
app.use('/list',listingRoutes);


app.listen(3000,()=>{
    console.log("listening on port 3000");
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


