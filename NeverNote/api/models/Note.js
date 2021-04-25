const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    "title"      : String,
    "description": String,
    "date"       : String,
    "ownerId"    : String
});

module.exports = mongoose.model("notes",NoteSchema);