const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

//Post a note
router.post("/",async (req,res)=>{
    const note = new Note({
        title       :req.body.title,
        description :req.body.description,
        date        :req.body.date,
        ownerId     :req.body.ownerId
    });
    try{
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(err){
        res.json({message:err});
    }
});

//Get all the notes
router.get("/", async(req,res)=>{
    try{
        const notes = await Note.find();
        res.json(notes);
    }catch(err){
        res.json({message:err});
    }
    res.json()
});

//Get one specific note
router.get("/:noteId", async(req,res)=>{
    try{
        const note = await Note.findById({_id:req.params.noteId});
        res.json(note);
    }catch(err){
        res.json({message:err});
    }
});

//Update one specific note
router.patch("/:noteId", async(req,res)=>{
    try{
        const updatedNote = await Note.updateOne({_id:req.params.noteId},{$set:req.body});
        res.json(updatedNote);
    }catch(err){
        res.json({message: err});
    }
});

//Delete one specific note
router.delete("/:noteId", async(req,res)=>{
    try{
        const removedNote = await Note.remove({_id:req.params.noteId});
        res.json(removedNote);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router;