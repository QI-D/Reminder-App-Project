// The mongoose schema and model for user

const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    email:String,
    password:String,
    profilePhotoUrl:String

});

module.exports.userModel=mongoose.model("User",userSchema);