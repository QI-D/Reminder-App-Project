const youtubeAPIcontroller = require("./controllers/youtubeAPI_controller.js");

let youtubeApp = {
  get: function (app, authCheck) {
    app.get("/reminders/ytvideos", authCheck, youtubeAPIcontroller.list);
  },
  post: function (app, authCheck) {
    app.post("/reminders/ytvideos", authCheck, youtubeAPIcontroller.newVideos);
  },
  add: function (app, authCheck) {
    app.post(
      "/reminders/ytvideos/add",
      authCheck,
      youtubeAPIcontroller.addVideo
    );
  },
};

module.exports = youtubeApp;
