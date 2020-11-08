const Database = require("../database.js");

let timeController = {
    update: function (req, res) {
        // get user input for time and reminder id
        let inputTime = req.body.time;
        let page_id = req.params.id;

        // find the index of specific reminder that matched with a reminder id
        let searchResultID = Database.cindy.reminders.findIndex((reminder) => {
            return reminder.id == page_id;
        });

        // get spcific reminder
        let searchReminder = Database.cindy.reminders[searchResultID];

        searchReminder.time=inputTime;
        
        res.redirect("/reminder/" + page_id);
        // console.log(Database.cindy.reminders[searchResultID]);
        



    },

    
}

module.exports=timeController;