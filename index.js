const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const remindersController = require("./controllers/reminder_controller");

const reminderController = require("./controllers/reminder_controller");

// express is going to return back to us a web server
const app = express();
const subtaskApp = require("./subtask-routes.js");
const timeApp = require("./time-routes");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");

//Case 1: user goes to localhost: 8080 -> information about site, marketing, login page ...
app.get("/", (req, res) => {
  res.send("Go to http://localhost:3000/reminder");
});

//Case 2: User goes to Localhost:8080/reminder -> show a list of reminders
app.get("/reminder", reminderController.list);

//Case 3: user goes to localhost:8080/reminder -> show a CREATE REMINDER RAGE
app.get("/reminder/new", reminderController.new);

app.get("/reminder/newuser", remindersController.signUpPage);

app.post("/reminder/signUp", reminderController.signUp);

//Case 4: User SENDS NEW REMINDER DATA TO US (CREATING A REMINDER)
app.post("/reminder", reminderController.create);

// Case 5: User wants to see an individual reminder
app.get("/reminder/:id", reminderController.listOne);

// Case 6 User wnats to EDIT an individual reminder
app.get("/reminder/:id/edit", reminderController.edit);

//Case 7: User clicks the update button from Case 6, and expects their reminder to be updated
app.post("/reminder/update/:id", reminderController.update);

//Case 8: User clicks the delete button and we expect the reminder to be deleted
app.post("/reminder/delete/:id", reminderController.delete);

//======= Subtask =============

//Case 1: User wants to add subtasks
subtaskApp.post(app);

//Case 2: User wnats to delete subtasks
subtaskApp.deletePost(app);


//===========time=============

//Case:1: User add a reminder time
timeApp.post(app);

// web service request through port 3000
app.listen(3000, () => {
  console.log("Our server is running on http://localhost:3000/ 🚀");
});
