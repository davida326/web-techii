const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    "name"      :String,
    "email"     :String,
    "userName"  :String,
    "password"  :String
});

module.exports = mongoose.model("users",UserSchema);