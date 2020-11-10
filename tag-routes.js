const tagController = require("./controllers/tag_controller.js");

let tagApp = {
  post: function (app) {
    app.post("/reminder/:id/tag/add", tagController.add);
  },
  deletePost: function (app) {
    app.post("/reminder/:id/tag/delete", tagController.delete);
  },
};

module.exports = tagApp;
