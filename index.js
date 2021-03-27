const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controllers/reminder_controller");
const authController = require("./controllers/auth_controller");

const cookieSession = require("cookie-session");
const authCheck = require("./middleware/auth");
const buttonCheck = require("./middleware/buttonCheck");
const middlewares = require("./middlewares.js");

// express is going to return back to us a web server
const subtaskApp = require("./subtask-routes.js");
const timeApp = require("./time-routes");
const tagApp = require("./tag-routes");
const { loginPage } = require("./controllers/reminder_controller");
const youtubeApp = require("./youtubeAPI");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.use(
  cookieSession({
    name: "session",
    keys: ["aaa", "bbb", "ccc"],
    maxAge: 30 * 60 * 1000, // cookie expires in 30 min
  })
);

app.use(middlewares.currenUser);

//Case 1: user goes to localhost -> information about site, marketing, login page ...
app.get("/", (req, res) => {
  res.send("Go to http://localhost:3000/reminders");
});

// Case 2: user goes to localhost/reminder/friends -> Friends list, friend search box, add/delete button
app.get("/reminder/friends", authCheck, reminderController.showfriend);

//Case 3: user add or remove friend from friend list by entering friend email
app.post("/reminder/friends", authCheck, buttonCheck);

//Case 4: User goes to Localhost:8080/reminder -> show a list of reminders
app.get("/reminders/", authCheck, reminderController.list);

//Case 5: user goes to localhost:8080/reminder -> show a CREATE REMINDER RAGE
app.get("/reminder/new", authCheck, reminderController.new);

//Case 6: User SENDS NEW REMINDER DATA TO US (CREATING A REMINDER)
app.post(
  "/reminders",
  authCheck,
  middlewares.parseBodyToArr,
  reminderController.create
);

// Case 7: User wants to see an individual reminder
app.get("/reminder/:id", authCheck, reminderController.listOne);

// Case 8: User wnats to EDIT an individual reminder
app.get("/reminder/:id/edit", authCheck, reminderController.edit);

// Case 9: User wants to view a friend reminder
app.get(
  "/reminder/:email/:id",
  authCheck,
  reminderController.listFriendReminder
);

//Case 10: User clicks the update button from Case 6, and expects their reminder to be updated
app.post("/reminder/update/:id", authCheck, reminderController.update);

//Case 11: User clicks the delete button and we expect the reminder to be deleted
app.post("/reminder/delete/:id", authCheck, reminderController.delete);

//Case 12: User wants to go to register page
app.get("/register", authController.register);

//Case 13: User wants to go to login page
app.get("/login", authController.login);

//Case 14: User wants to register for an account
app.post("/register", authController.registerSubmit);

//Case 15: User wants to login with account info
app.post("/login", authController.loginSubmit);

// Case 16: User wants to logout
app.post("/logout", authController.logout);

//======= Subtask =============

//Case 1: User wants to add subtasks
subtaskApp.post(app);

//Case 2: User wnats to delete subtasks
subtaskApp.deletePost(app);

//===========time=============

//Case:1: User add a reminder time
timeApp.post(app);

//===========tags=============

//Case:1: User wants to add a tag
tagApp.post(app);

//Case 2: User wants to delete a tag
tagApp.deletePost(app);

//========= Youtube Api =======

// // Case 1: User wants to search for youtube videos
// youtubeApp.get(app, authCheck);

// // Case 2: User gets youtube videos
// youtubeApp.post(app, authCheck);

// // Case 3: User wants add their favorite videos
// youtubeApp.add(app, authCheck);

// web service request through port 3000
app.listen(3000, () => {
  console.log("Our server is running on http://localhost:3000/ 🚀");
});
