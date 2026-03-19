const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    phoneNumber: {type:String, required:true},
    ownerNumber:{type:String,default:""},
    sessionPath:{type:String, default:""},
    botStatus:{type:String, default:"inactive"},
});

module.exports = mongoose.model("User", userSchema);