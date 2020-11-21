let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render('auth/login')
  },

  loginSubmit: (req, res) => {
    // implement
    email = req.body.email
    password = req.body.password
    console.log('login', req.body)

    if (database.hasOwnProperty(email)) {
      if (database[email].psw === password) {
        req.session['user'] = email;
        res.redirect("/reminders");
      } else {
        res.render("auth/login", {
          err: "password is not correct"
        })
      }
    } else {
      res.render("auth/login", {
        err: "The email does not exist"
      })
    }
  },

  register: (req, res) => {
    // get email from request
    let useremail=req.query.email;

    //send user email to signup page
    res.render('auth/register',{useremail:useremail})
  },

  registerSubmit: (req, res) => {
    // implement
    email = req.body.email;
    password = req.body.password;
    console.log('register', req.body);

    if (!database.hasOwnProperty(email)) {
      database[email] = {
        reminders: [],
        psw: password,
        // userid: Object.keys(database).length
      }
      req.session['user'] = email;
      res.redirect("/reminders");
    } else {
      res.render("auth/register", {
        useremail: "",
        err: "email has been registered"
      });
    }
  }
}

module.exports = authController;