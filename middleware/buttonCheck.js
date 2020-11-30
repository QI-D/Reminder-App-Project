const reminderController = require("../controllers/reminder_controller");
module.exports = function(req, res){
    let addClicked = req.body.add;
    let delClicked = req.body.delete;
    if (addClicked=="add" && delClicked == undefined) {
        reminderController.addfriend(req,res);
    } 
    if (addClicked==undefined && delClicked == "delete") {
        reminderController.removeFriend(req,res);
    }
}