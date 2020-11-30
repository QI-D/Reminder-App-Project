const { MakeUser, MakeReminder } = require("./make-data.js");

let Database = {
  "cindy@gmail.com":new MakeUser(
    1,
    "cindy@gmail.com",
    "cindy",
    [new MakeReminder(
      1,
      "Cindy reminder",
      "Cindy"
    )]
  ),
  "alex@outlook.com": new MakeUser(
    2,
    "alex@outlook.com",
    "alex",
    [new MakeReminder(
      1,
      "Alex reminder",
      "Alex"
    ), new MakeReminder(
      2,
      "Alex another reminder",
      "Alex 2",
    )]
  )
 
  // "cindy@gmail.com": {
  //   reminders: ["", "", ""],
  //   psw: "cindy",
  //   videoList: [],
  //   friendList: []
    
  // },
  // "alex@outlook.com": {
  //   reminders: [""],
  //   psw: "alex",
  //   videoList: [],
  //   friendList: []
  // },
};

module.exports = Database;
