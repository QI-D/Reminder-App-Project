const subtaskController = require("./controllers/subtask-controller.js");

let subtaskApp = {
  post: function (app) {
    app.post("/reminder/:id/subtask/update", subtaskController.update);
  },
  deletePost: function (app) {
    app.post("/reminder/:id/subtask/delete", subtaskController.delete);
  },
};

module.exports = subtaskApp;
