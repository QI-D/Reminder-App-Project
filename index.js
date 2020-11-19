// const express = require("express");
// const ejsLayouts = require("express-ejs-layouts");

// const reminderController = require("./controllers/reminder_controller");

// express is going to return back to us a web server
// const app = express();
// const subtaskApp = require("./subtask-routes.js");
// const timeApp = require("./time-routes");
// const tagApp = require("./tag-routes");

// app.use(express.static(__dirname + "/public"));

const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controllers/reminder_controller");
const authController = require("./controllers/auth_controller");

// express is going to return back to us a web server
const subtaskApp = require("./subtask-routes.js");
const timeApp = require("./time-routes");
const tagApp = require("./tag-routes");
const { loginPage } = require("./controllers/reminder_controller");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");

//Case 1: user goes to localhost: 8080 -> information about site, marketing, login page ...
app.get("/", (req, res) => {
  res.send("Go to http://localhost:3000/reminder");
});

//Case 2: User goes to Localhost:8080/reminder -> show a list of reminders
app.get("/reminders", reminderController.list);

//Case 3: user goes to localhost:8080/reminder -> show a CREATE REMINDER RAGE
app.get("/reminder/new", reminderController.new);

//Case 4: User SENDS NEW REMINDER DATA TO US (CREATING A REMINDER)
app.post("/reminders", reminderController.create);

//Case 5: User wants to go to sign up page
// app.get("/reminder/register", authController.register);

// //Case 6: User create account with username and password
// app.post("/reminder/signUp", authController.registerSubmit);

// //Case 7: User wants to go to login page
// app.get("/reminder/loginPage", authController.login);

// //Case 8: User wants to login with username and password
// app.post("/reminder/login", authController.loginSubmit);

// Case 9: User wants to see an individual reminder
app.get("/reminder/:id", reminderController.listOne);

// Case 10: User wnats to EDIT an individual reminder
app.get("/reminder/:id/edit", reminderController.edit);

//Case 11: User clicks the update button from Case 6, and expects their reminder to be updated
app.post("/reminder/update/:id", reminderController.update);

//Case 12: User clicks the delete button and we expect the reminder to be deleted
app.post("/reminder/delete/:id", reminderController.delete);

app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

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

// web service request through port 3000
app.listen(3000, () => {
  console.log("Our server is running on http://localhost:3000/ 🚀");
});
