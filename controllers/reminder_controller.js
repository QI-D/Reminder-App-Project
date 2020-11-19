const { MakeReminder, MakeSubtask, MakeTag } = require("../make-data.js");
const Database = require("../database.js");
const url = require("url");

// exstract functions

let remindersController = {
  list: function (req, res) {

    // store the destination url in res.locals 
    res.locals.url=req.url;

    res.render("reminder/index", {
      reminders: Database["cindy@gmail.com"].reminders,
    }); // no need to user .ejs because we already specified
  },

  new: function (req, res) {

    // store the destination url in res.locals
    res.locals.url=req.url;

    res.render("reminder/create");
  },

  create: function (req, res) {
    const subTaskArr = [];
    const tagsArr = [];

    const subtaskReq = req.body.reminder_subtask;
    const tagReq = req.body.reminder_tag;

    // Check if the subtask req exist
    if (subtaskReq) {
      // Check if there are many subtasks
      if (typeof subtaskReq === "object") {
        subtaskReq.forEach((description, subtask_id) => {
          subTaskArr.push(new MakeSubtask(subtask_id, description));
        });
      } else {
        subTaskArr.push(new MakeSubtask(0, subtaskReq));
      }
    }

    // Check if the tag req exist
    if (tagReq) {
      if (typeof tagReq === "object") {
        // Check if there are many tags
        tagReq.forEach((description, tag_id) => {
          tagsArr.push(new MakeTag(tag_id, description));
        });
      } else {
        tagsArr.push(new MakeSubtask(0, tagReq));
      }
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
    let searchResult = Database["cindy@gmail.com"].reminders.find((reminder) => {
      return reminder.id == reminderToFind;
    });
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
    let searchResult = Database["cindy@gmail.com"].reminders.find((reminder) => {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit-reminder", {
      reminderItem: searchResult,
    });
  },

  update: function (req, res) {
    let isCompleted = req.body.completed == "true";

    // The updateReminder should be modified to have time,tag and subtask ?
    let updateReminder = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      completed: isCompleted,
    };
    let idx = Database["cindy@gmail.com"].reminders.findIndex((reminder) => {
      return reminder.id == updateReminder.id;
    });
    Database["cindy@gmail.com"].reminders[idx] = updateReminder;
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
