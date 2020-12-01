let database = require("../database");
const { MakeUser } = require("../make-data.js");
const { getPhoto } = require("./unsplashAPI_controller");

let authController = {
  login: (req, res) => {
    let userEmail = req.session.user;

    if (userEmail) {
      res.redirect("/reminders");
    } else {
      res.render("auth/login");
    }
  },

  loginSubmit: (req, res) => {
    // implement
    let email = req.body.email;
    let password = req.body.password;

    if (database.hasOwnProperty(email)) {
      if (database[email].password === password) {
        req.session["user"] = email;
        res.redirect("/reminders");
      } else {
        res.render("auth/login", {
          err: "password is not correct",
        });
      }
    } else {
      res.render("auth/login", {
        err: "The email does not exist",
      });
    }
  },

  register: (req, res) => {
    // get email from request
    let userEmail = req.query.email;

    //send user email to signup page
    res.render("auth/register", { userEmail: userEmail });
  },

  registerSubmit: async (req, res) => {
    // implement
    const email = req.body.email;
    const password = req.body.password;
    const photo = req.body.photo;
    if (!database.hasOwnProperty(email)) {
      const newUser = new MakeUser(
        Object.keys(database).length + 1,
        email,
        password,
        await getPhoto(photo)
      );
      database[email] = newUser;
      req.session["user"] = email;
      res.redirect("/reminders");
    } else {
      res.render("auth/register", {
        userEmail: "",
        err: "email has been registered",
      });
    }
  },
  logout: (req, res) => {
    req.session = null;
    res.redirect("/login");
  },
};

module.exports = authController;
