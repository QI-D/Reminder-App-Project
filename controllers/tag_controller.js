const Database = require("../database.js");

let tagController = {
    add: function (req, res) {
        let tagName = req.body.tag_name;
        let tagID = req.params.id;

    let searchResultID = Database.cindy.reminders.findIndex((reminder) => {
        return reminder.id == tagID;
      });

      let searchReminder = Database.cindy.reminders[searchResultID];

      if (!searchReminder.hasOwnProperty("tag")) {
        searchReminder.tag = [];
      }
  
      let newtag = {
        id: searchReminder.tag.length + 1,
        name: tagName
      };
  
      searchReminder.tag.push(newtag);

      console.log(searchReminder.tag);
  
      res.redirect("/reminder/" + tagID);
    },
  
    delete: function (req, res) {
      let deleteId = req.params.id;
      let tagId = req.body.id;
  
      let searchResult = Database.cindy.reminders.find((reminder) => {
        return reminder.id == deleteId;
      });
  
      let searchtagID = searchResult.tag.findIndex((tag) => {
        return tag.id == tagId;
      });
  
      searchResult.tag.splice(searchtagID, 1);
      res.redirect("/reminder/" + deleteId);
    },
  };

  
module.exports = tagController
       