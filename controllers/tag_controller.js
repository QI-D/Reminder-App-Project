const { MakeTag } = require("../make-data.js");

const Database = require("../database.js");

let tagController = {
  add: function (req, res) {
    let tagName = req.body.tag_name;
    let tagID = req.params.id;
    let user = Database[req.session.user];

    let searchResultID = user.reminders.findIndex((reminder) => {
      return reminder.id == tagID;
    });

    let searchReminder = user.reminders[searchResultID];
    
    console.log(searchReminder);
    let newtag = new MakeTag(searchReminder.tag.length + 1, tagName);
    // {
    //   id: searchReminder.tag.length + 1,
    //   name: tagName
    // };

    searchReminder.tag.push(newtag);

    res.redirect("/reminder/" + tagID);
  },

  delete: function (req, res) {
    let deleteId = req.params.id;
    let tagId = req.body.id;
    let user = Database[req.session.user];

    let searchResult = user.reminders.find((reminder) => {
      return reminder.id == deleteId;
    });

    let searchtagID = searchResult.tag.findIndex((tag) => {
      return tag.id == tagId;
    });

    searchResult.tag.splice(searchtagID, 1);
    res.redirect("/reminder/" + deleteId);
  },
};

module.exports = tagController;
