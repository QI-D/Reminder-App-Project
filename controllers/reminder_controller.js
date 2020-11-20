const { MakeReminder, MakeSubtask, MakeTag } = require("../make-data.js");
const Database = require("../database.js");
const url = require("url");

// exstract functions

let remindersController = {
  list: function (req, res) {
    // store the destination url in res.locals
    res.locals.url = req.url;

    res.render("reminder/index", {
      reminders: Database["cindy@gmail.com"].reminders,
    }); // no need to user .ejs because we already specified
  },

  new: function (req, res) {
    // store the destination url in res.locals
    res.locals.url = req.url;

    res.render("reminder/create");
  },

  create: function (req, res) {
    const subTaskArr = [];
    const tagsArr = [];

    const { reminder_subtask, reminder_tag } = req.body;

    // Check if the subtask req exist
    if (reminder_subtask) {
      reminder_subtask.forEach((description, subtask_id) => {
        subTaskArr.push(new MakeSubtask(subtask_id, description));
      });
    }

    // Check if the tag req exist
    if (reminder_tag) {
      reminder_tag.forEach((description, tag_id) => {
        tagsArr.push(new MakeTag(tag_id, description));
      });
    }

    const reminder = new MakeReminder(
      Database["cindy@gmail.com"].reminders.length + 1,
      req.body.title,
      req.body.description,
      subTaskArr,
      tagsArr
    );

    console.log(reminder);
    Database["cindy@gmail.com"].reminders.push(reminder);
    res.redirect("/reminders");
  },

  // signUpPage: function (req, res) {
  //   res.render("reminder/newuser");
  // },

  // signUp: function (req, res) {
  //   username = req.body.username;
  //   psw = req.body.password;

  //   if (!Database.hasOwnProperty(username)) {
  //     Database[username] = {
  //       reminders: [],
  //       psw: "",
  //     };
  //     Database[username].psw = psw;
  //     res.redirect("/reminder");
  //   } else {
  //     res.render("reminder/newuser", {
  //       err: "username has been registered",
  //     });
  //   }
  // },

  listOne: function (req, res) {
    let reminderToFind = req.params.id;
    let searchResult = Database["cindy@gmail.com"].reminders.find(
      (reminder) => {
        return reminder.id == reminderToFind;
      }
    );
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", {
        reminderItem: searchResult,
      });
    } else {
      res.redirect("/reminders");
    }
  },

  edit: function (req, res) {
    let reminderToFind = req.params.id;
    let searchResult = Database["cindy@gmail.com"].reminders.find(
      (reminder) => {
        return reminder.id == reminderToFind;
      }
    );
    res.render("reminder/edit-reminder", {
      reminderItem: searchResult,
    });
  },

  update: function (req, res) {
    const reminder_id = req.params.id;
    Database["cindy@gmail.com"].reminders.find((reminder) => {
      if (reminder.id == reminder_id) {
        (reminder.title = req.body.title),
          (reminder.description = req.body.description),
          (reminder.completed = req.body.completed == "true");
      }
    });

    res.redirect("/reminder/" + req.body.id); // this should be routes in index.js with redirects
  },

  delete: function (req, res) {
    let deleteId = req.params.id;
    let idx = Database["cindy@gmail.com"].reminders.findIndex((reminder) => {
      return reminder.id == deleteId;
    });
    Database["cindy@gmail.com"].reminders.splice(idx, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
