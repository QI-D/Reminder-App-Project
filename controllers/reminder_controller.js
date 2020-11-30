const { MakeReminder, MakeSubtask, MakeTag } = require("../make-data.js");
const Database = require("../database.js");
const url = require("url");
// exstract functions

let remindersController = {

  list: function (req, res) {
    res.locals.url = req.url;
    console.log(req.session['user']);
    let user = Database[req.session.user];
    let friends = user.friendList;
    console.log(friends);
    let friendsList = [];
    for (friend of friends) {
      friendsList.push(Database[friend]);
    }


    res.render("reminder/index", {
      reminders: user.reminders,
      others: friendsList,
    });
  },

  // list: function (req, res) {
  //   res.locals.url = req.url;
  //   res.render("reminder/index", {
  //     reminders: user.reminders,
  //   });
  // },

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
    let user = Database[req.session.user];
    const reminder = new MakeReminder(
      user.reminders.length + 1,
      req.body.title,
      req.body.description,
      subTaskArr,
      tagsArr
    );

    // console.log(reminder); 

    user.reminders.push(reminder);

    console.log(user.reminders);


    res.redirect("/reminders");
  },

  listOne: function (req, res) {
    let reminderToFind = req.params.id;
    let user = Database[req.session.user];

    let searchResult = user.reminders.find(
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
    let user = Database[req.session.user];
    let reminderToFind = req.params.id;

    let searchResult = user.reminders.find(
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
    let user = Database[req.session.user];

    user.reminders.find((reminder) => {
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
    let user = Database[req.session.user];

    let idx = user.reminders.findIndex((reminder) => {
      return reminder.id == deleteId;
    });
    user.reminders.splice(idx, 1);
    res.redirect("/reminders");
  },

  showfriend: function (req, res) {
    res.locals.url = req.url;
    let user = Database[req.session.user];
    let friends = user["friendList"];

    res.render("reminder/friends", {
      userfriends: friends
    });
  },

  addfriend: function (req, res) {
    res.locals.url = req.url;
    friendEmail = req.body.friendEmail;
    // console.log("email", req.body);
    let user = Database[req.session.user]
    let useremail = req.session.user
    console.log("friendEmail:", friendEmail)
    console.log("user", req.session.user)

    if (user.friendList.includes(friendEmail)) {
      res.render("reminder/friends", {
        err: "The email has already been added",
        userfriends: user.friendList
      });
    } else if (friendEmail == useremail) {
      res.render("reminder/friends", {
        err: "You cannot add yourself",
        userfriends: user.friendList
      });
    } else {
      if (Database.hasOwnProperty(friendEmail)) {
        user.friendList.push(friendEmail);
      } else {
        res.render("reminder/friends", {
          err: "Email does not exist",
          userfriends: user.friendList
        });
      }

    }

    // The database must have that user with the friendEmail
    // Database.friendEmail["friendList"].push(user);

    console.log(user["friendList"]);
    res.redirect("/reminder/friends");


  },


  listFriendReminder: function (req, res) {
    let friendEmail = req.params.email;
    let reminderToFind = req.params.id;
    let userEmail = req.session.user;

    let searchResult = Database[friendEmail].reminders.find(
      (reminder) => {
        return reminder.id == reminderToFind;
      }
    );

    res.render("reminder/single-reminder", {
      reminderItem: searchResult,
    });
  }
};


module.exports = remindersController;
