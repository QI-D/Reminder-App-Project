// The mongoose schema and model for user

const mongoose=require("mongoose");

const reminderSchema=new mongoose.Schema({
    email:String,
    title:String,
    description:String,
    completed:Boolean,
    subtask:Array,
    tag:Array,
    time:Number
});

module.exports.reminderModel=mongoose.model("Reminder",reminderSchema);