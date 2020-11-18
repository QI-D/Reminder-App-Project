let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render('auth/login')
  },

  register: (req, res) => {
    // res.render('auth/register')

    // get email from request
    let useremail=req.query.email;

    //send user email to signup page
    res.render('auth/register',{useremail:useremail})
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    // implement
  }
}

module.exports = authController;