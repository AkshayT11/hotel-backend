const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu")


// post the menu item
router.post("/",async (req,res)=>{
    try {
      const data = req.body;
  
      const menuItem = new MenuItem(data)
  
      // save new Person to the Address
      const response = await menuItem.save();
      console.log("data saved");
      res.status(200).json(response)
  
    } catch (error) {
      console.log(error);
          res.status(500).json({error:"Internal Server Error"})
    }  
  });

  //get data from menu address
router.get("/", async (req,res)=>{
    try {
        const data = await MenuItem.find()
        console.log("data fetched");
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
});

  //get data from menu taste
  router.get("/:tasteType", async (req,res)=>{
    try {
      const tasteType = req.params.tasteType
      if(tasteType === "sweet" || tasteType === "spicy" || tasteType === "sour"){

        const response = await MenuItem.find({taste:tasteType});
        console.log("testType Fetched");
        res.status(200).json(response)
      }
       else{
        res.status(404).json({error:"Invalid Taste Type"})
       }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
});


// To update the menuITems
router.put("/:id", async (req,res)=>{
  try {
    const menuId = req.params.id;
    updatedMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new:true,
      runValidators:true
    });

    if(!response){
      return res.status(404).json({error: "MenuItems not Found"})
    };

    console.log("Menu Data Updated");
    res.status(200).json(response)

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Updated server error"})
  }
});

// To delete the MenuItems
router.delete("/:id", async (req,res)=>{
   try {
    const menuId = req.params.id  //extract the person Id
 
    const response = await MenuItem.findByIdAndDelete(menuId)
 
    if(!response){
     return res.status(404).json({error: "MenuItems not Found"})
   };
 
   console.log("Data deleted");
   res.status(200).json({message: "Menuitem deleted successfully"})

   } catch (error) {
    console.log(error);
    res.status(500).json({error: "Delted server error"})
   }


} )


module.exports = router;