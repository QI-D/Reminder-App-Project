let database = require("../database");
const { MakeUser } = require("../make-data.js");
const { getPhoto } = require("./unsplashAPI_controller");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  loginSubmit: (req, res) => {
    // implement
    email = req.body.email;
    password = req.body.password;
    console.log("login", req.body);

    if (database.hasOwnProperty(email)) {
      if (database[email].psw === password) {
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
    let useremail = req.query.email;

    //send user email to signup page
    res.render("auth/register", { useremail: useremail });
  },

  registerSubmit: async (req, res) => {
    // implement
    const email = req.body.email;
    const password = req.body.password;
    const photo = req.body.photo
    // console.log(await getPhoto(photo))
    if (!database.hasOwnProperty(email)) {
      const newUser = new MakeUser(
        Object.keys(database).length + 1,
        email,
        password,
        await getPhoto(photo)
      );
      // console.log(photo)
      console.log(newUser)
      database[email] = newUser;
      req.session["user"] = email;
      res.redirect("/reminders");
    } else {
      res.render("auth/register", {
        useremail: "",
        err: "email has been registered"
      });
    }
  },

  // getPhoto: async (searchTerm) => {
  //   const data = await fetch(`https://api.unsplash.com/search/photos?client_id=oxEQbZC1VxL0aUXyDOwS8FjNyBzoo_Z8ZiI721_1U78&page=1&query=${searchTerm}`)
  //   const jsonData = await data.json()
  //   console.log(jsonData)
  //   const photoUrl = jsonData.results[0].urls.regular
  //   return photoUrl
  // }
};

module.exports = authController;
