const fetch = require("node-fetch");
const { MakeVideo } = require("../make-data.js");
const Database = require("../database.js");

let youtubeAPIController = {
  list: (req, res) => {
    res.locals.youtubeData = null;
    res.locals.userVideoList = req.currentUser.videoList;
    res.locals.isclicked = "youtubeClicked";
    res.locals.url = req.url;
    res.render("reminder/search-youtube.ejs");
    //
  },
  newVideos: async (req, res) => {
    const { searchTerm } = req.body;
    res.locals.url = req.url;
    const enSearchTerm = encodeURIComponent(searchTerm);
    try {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${enSearchTerm}&type=video&key=AIzaSyAf4_tbubtzBl_itVwJNJtf7Ug8P2kto00`
      );
      const json_data = await data.json();
      const youtubeData = json_data.items;
      res.locals.youtubeData = youtubeData;
      res.locals.userVideoList = req.currentUser.videoList;
      res.render("reminder/search-youtube.ejs");
    } catch {
      res.send("500 x.x Youtube Api not available");
    }
  },
  addVideo(req, res) {
    const currenUser = req.currentUser;
    const { ytvideoId, ytvideoTitle, ytvideoImg } = req.body;
    const video = new MakeVideo(
      currenUser.videoList.length + 1,
      ytvideoTitle,
      ytvideoImg,
      ytvideoId
    );
    Database[currenUser.email].videoList.push(video);
    res.redirect("/reminders/ytvideos");
  },
};

module.exports = youtubeAPIController;
