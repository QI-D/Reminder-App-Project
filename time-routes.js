const timeController = require("./controllers/time_controller.js");

let timeApp = {
    post: function (app) {
        app.post("/reminder/:id/time/update", timeController.update);
    },
    
};

module.exports = timeApp