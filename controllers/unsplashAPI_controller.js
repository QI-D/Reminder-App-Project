const fetch = require("node-fetch");
const Database = require("../database.js");

let unsplashAPIController = {
  // getPhoto: async (req, res) => {
  //   const currentUser = req.currentUser;
  //   const searchTerm = req.body.photo
  //   const data = await fetch(`https://api.unsplash.com/search/photos?client_id=oxEQbZC1VxL0aUXyDOwS8FjNyBzoo_Z8ZiI721_1U78&page=1&query=${searchTerm}`)
  //   const jsonData = await data.json()
  //   console.log(jsonData)
  //   const photoUrl = jsonData.results[0].urls.regular
  // }
    getPhoto: async (searchTerm) => {
    const data = await fetch(`https://api.unsplash.com/search/photos?client_id=oxEQbZC1VxL0aUXyDOwS8FjNyBzoo_Z8ZiI721_1U78&page=1&query=${searchTerm}`)
    const jsonData = await data.json()
    // console.log(jsonData)
    const photoUrl = jsonData.results[0].urls.regular
    // console.log(photoUrl)
    return photoUrl
  }
}

module.exports = unsplashAPIController;