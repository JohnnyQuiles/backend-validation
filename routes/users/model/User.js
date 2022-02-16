const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String
},{timestamps: true});

module.exports = mongoose.model("user", userSchema);
