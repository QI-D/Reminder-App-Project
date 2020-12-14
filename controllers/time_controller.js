const Database = require("../database.js");

let timeController = {
    update: function (req, res) {
        // get user input for time and reminder id
        let inputTime = req.body.time;
        let page_id = req.params.id;
        let user = Database[req.session.user];
        // find the index of specific reminder that matched with a reminder id
        let searchResultID = user.reminders.findIndex((reminder) => {
            return reminder.id == page_id;
        });

        // get spcific reminder
        let searchReminder = user.reminders[searchResultID];

        searchReminder.time=inputTime;
        
        res.redirect("/reminder/" + page_id);
        // console.log(Database.cindy.reminders[searchResultID]);
        



    },

    
}

module.exports=timeController;