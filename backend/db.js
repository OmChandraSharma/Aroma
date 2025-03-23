const mongoose = require("mongoose"); // driver that connects node.js with mongodb server
// define the mongodb connection url 
// create database of name hotel 
const mongoURL = 'mongodb://localhost:27017/aroma';
//set up mongoDB connection 
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// get the default connection
//Mongoose maintain a default connection object representing mongodb connection
const db = mongoose.connection; // CONNECTION OBJECT

// define event listeners for database connection 
db.on('connected',() =>{
    console.log("connected to the mongodb server");
})

db.on('error',(err)=>{
    console.log("mongodb connection error",err);
})

db.on('disconnected',()=>{
    console.log("server disconnected")
})

module.exports = db; //Export the Database Connection



