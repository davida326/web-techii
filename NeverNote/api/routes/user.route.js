const express = require("express");
const User = require("../models/User");
const Note = require("../models/Note");
const router = express.Router();

//Post a user
router.post("/",async (req,res)=>{
    const user = new User({
        name        :req.body.name,
        email       :req.body.email,
        userName    :req.body.userName,
        password    :req.body.password
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.json({message:err});
    }
});

//Get all the users
router.get("/", async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message:err});
    }
    res.json()
});


//Get one specific user
router.get("/:userId", async(req,res)=>{
    try{
        const user = await User.findById({_id:req.params.userId});
        res.json(user);
    }catch(err){
        res.json({message:err});
    }
});

//Update one specific user
router.patch("/:userId", async(req,res)=>{
    try{
        const updatedUser = await User.updateOne({_id:req.params.userId},{$set:req.body});
        res.json(updatedUser);
    }catch(err){
        res.json({message: err});
    }
});

//Remove one specific user
router.delete("/:userId", async(req,res)=>{
    try{
        const removedUser = await User.remove({_id:req.params.userId});
        res.json(removedUser);
    }catch(err){
        res.json({message:err});
    }
});

//Get specific user's notes
router.get("/notes/:userId", async(req,res)=>{
    try{
        const userNotes = await Note.find({"ownerId":req.params.userId})
        res.send(userNotes)
    }catch(err){
        res.json({message:err});
    }
    res.json()
});

module.exports = router;