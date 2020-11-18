const Database = require("../database.js");
const url = require("url");

// exstract functions

let remindersController = {
  list: function (req, res) {

    // store the destination url in res.locals 
    res.locals.url=req.url;

    res.render("reminder/index", {
      reminders: Database.cindy.reminders,
    }); // no need to user .ejs because we already specified
  },

  new: function (req, res) {

    // store the destination url in res.locals
    res.locals.url=req.url;

    res.render("reminder/create");
  },

  create: function (req, res) {
    let reminder = {
      id: Database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    Database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
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
        psw: ""
      }
      Database[username].psw = psw;
      res.redirect("/reminders");
    } else {
      res.render("reminder/newuser", {
        err: "username has been registered"
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
      res.redirect("/reminders");
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
    let isCompleted = req.body.completed == "true";
    let updateReminder = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      completed: isCompleted,
    };
    let idx = Database.cindy.reminders.findIndex((reminder) => {
      return reminder.id == updateReminder.id;
    });
    Database.cindy.reminders[idx] = updateReminder;
    res.redirect("/reminder/" + req.body.id); // this should be routes in index.js with redirects
  },

  delete: function (req, res) {
    let deleteId = req.params.id;
    let idx = Database.cindy.reminders.findIndex((reminder) => {
      return reminder.id == deleteId;
    });
    Database.cindy.reminders.splice(idx, 1);
    res.redirect("/reminders");
  },


};

module.exports = remindersController;
