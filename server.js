const express = require("express")
const app = express();
const db = require("./db");
const bodyParser = require("body-parser")

require('dotenv').config();
const PORT = process.env.PORT || 3500;

app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.send("How are YOu")
});





// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes")
 
// use the routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes); 



app.listen(PORT, ()=>{
    console.log("listening on port 3500");
})