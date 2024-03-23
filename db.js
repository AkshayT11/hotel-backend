const mongoose = require("mongoose")
require('dotenv').config()

// MongoDB URL 
// const mongoURL = process.env.MONGODB_URL_LOCAL

const mongoURL = process.env.MONGODB_URL 

//  mongodb+srv://akshaytelawade28:Hotel@123@cluster1.eti2gvi.mongodb.net/  

mongoose.connect(mongoURL, {
//    useNewUrlParser:true,
//    useUnifiedTopology:true
})

// Get default connection
const db = mongoose.connection;

// define event listeners for database connection

db.on("connected", ()=>{
    console.log("Connected to MongoDB server");
})

db.on("error", ()=>{
    console.log(" MongoDB connection error");
})

db.on("disconnected", ()=>{
    console.log(" MongoDB server disconnected");
})

// Export the database connection

module.exports = db;