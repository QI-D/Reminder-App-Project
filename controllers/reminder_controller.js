const { MakeReminder, MakeSubtask, MakeTag } = require("../make-data.js");
const Database = require("../database.js");
// exstract functions

let remindersController = {
  list: function (req, res) {
    res.render("reminder/index", {
      reminders: Database.cindy.reminders,
    }); // no need to user .ejs because we already specified
  },

  new: function (req, res) {
    res.render("reminder/create");
  },

  create: function (req, res) {
    const subTaskArr = [];
    const tagsArr = [];

    const { reminder_subtask, reminder_tag } = req.body;

    // Check if the subtask req exist
    if (reminder_subtask) {
      // Check if there are many subtasks
      if (typeof reminder_subtask === "object") {
        reminder_subtask.forEach((description, subtask_id) => {
          subTaskArr.push(new MakeSubtask(subtask_id, description));
        });
      } else {
        subTaskArr.push(new MakeSubtask(0, reminder_subtask));
      }
    }

    // Check if the tag req exist
    if (reminder_tag) {
      if (typeof reminder_tag === "object") {
        // Check if there are many tags
        reminder_tag.forEach((description, tag_id) => {
          tagsArr.push(new MakeTag(tag_id, description));
        });
      } else {
        tagsArr.push(new MakeSubtask(0, reminder_tag));
      }
    }

    const reminder = new MakeReminder(
      Database.cindy.reminders.length + 1,
      req.body.title,
      req.body.description,
      subTaskArr,
      tagsArr
    );

    Database.cindy.reminders.push(reminder);
    res.redirect("/reminder");
  },

  signUpPage: function (req, res) {
    res.render("reminder/newuser");
  },

  signUp: function (req, res) {
    username = req.body.username;
    psw = req.body.password;

    if (!Database.hasOwnProperty(username)) {
      Database[username] = {
        reminders: [],
        psw: "",
      };
      Database[username].psw = psw;
      res.redirect("/reminder");
    } else {
      res.render("reminder/newuser", {
        err: "username has been registered",
      });
    }
  },

  listOne: function (req, res) {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find((reminder) => {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", {
        reminderItem: searchResult,
      });
    } else {
      res.redirect("/reminder");
    }
  },

  edit: function (req, res) {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find((reminder) => {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit-reminder", {
      reminderItem: searchResult,
    });
  },

  update: function (req, res) {
    const reminder_id = req.params.id;
    Database.cindy.reminders.find((reminder) => {
      if (reminder.id == reminder_id) {
        (reminder.title = req.body.title),
          (reminder.description = req.body.description),
          (reminder.completed = req.body.completed == "true");
      }
      return reminder;
    });
    res.redirect("/reminder/" + req.body.id); // this should be routes in index.js with redirects
  },

  delete: function (req, res) {
    let deleteId = req.params.id;
    let idx = Database.cindy.reminders.findIndex((reminder) => {
      return reminder.id == deleteId;
    });
    Database.cindy.reminders.splice(idx, 1);
    res.redirect("/reminder");
  },
};

module.exports = remindersController;
