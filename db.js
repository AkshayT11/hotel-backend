const mongoose = require("mongoose")

// MongoDB URL 
const mongoURL = "mongodb://0.0.0.0:27017/hotels"

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