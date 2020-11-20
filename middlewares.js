let middlewares = {
  parseBodyToArr: function (req, res, next) {
    let { reminder_subtask, reminder_tag } = req.body;
    req.body.reminder_subtask =
      typeof reminder_subtask === "string"
        ? [reminder_subtask]
        : reminder_subtask;
    req.body.reminder_tag =
      typeof reminder_tag === "string" //
        ? [reminder_tag] //
        : reminder_tag;
    next();
  },
};

module.exports = middlewares;
