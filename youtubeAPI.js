const youtubeAPIcontroller = require("./controllers/youtubeAPI_controller.js");

let youtubeApp = {
  get: function (app) {
    app.get("/reminders/ytvideos", youtubeAPIcontroller.list);
  },
  post: function (app) {
    app.post("/reminders/ytvideos", youtubeAPIcontroller.newVideos);
  },
  add: function (app) {
    app.post("/reminders/ytvideos/add", youtubeAPIcontroller.addVideo);
  },
};

module.exports = youtubeApp;
