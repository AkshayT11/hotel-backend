const express = require("express");
const router = express.Router();
const Person = require("../models/person")

// Post route to add
router.post("/", async (req,res)=>{

    try {
        const data = req.body;
    
        // create new person document using Mongoose Model
        const newPerson = new Person(data);
    
        // save new Person to the Address
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response) 
 
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
  
});

// Get method to get the Person
router.get("/", async (req,res)=>{
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
});

// to get worktype person
router.get("/:workType", async (req,res)=>{
    try {
      const workType = req.params.workType  // extract the worktye from the URL parameter
      if(workType === "chef" || workType === "manager" || workType === "waiter" ){
          
         const response = await Person.find({work: workType});
         console.log("workType Fetched");
         res.status(200).json(response)
      }
      else{
         res.status(404).json({error:"Invalid Work Type"})
      }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
 });

//  To Update the person information

 router.put("/:id", async (req,res)=>{
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData ,{
            new:true, //Return the updated Document
            runValidators:true, //run mongoose validation
        });

        if(!response) {
            return res.status(404).json({error: "Person not Found"})
        }

        console.log("data updated");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Updated server error"})
    }
 });

 router.delete("/:id", async (req,res)=>{
    try {
        const personId = req.params.id  // extract the person id from URL

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:"Person not Found"})
        }

        console.log("data deleted");
        res.status(200).json({message: "person deleted Successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Updated server error"})
    }
 })


module.exports = router;