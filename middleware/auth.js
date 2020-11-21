const Database = require("../database.js");
module.exports = function(req, res, next){
    let user = Database[req.session.user];
    if (user) {
        next();
    } else {
        res.render("auth/login");
    }
}