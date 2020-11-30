class MakeReminder {
  constructor(id, title, description, subtask = null, tag = null, time=new Date().getTime()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = false;
    if (subtask === null) {
      subtask = [];
    }
    this.subtask = subtask;
    if (tag === null) {
      tag = [];
    }
    this.tag = tag;
    this.time=time;
  }
}

class MakeSubtask {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }
}

class MakeTag {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }
}

class MakeUser {
  constructor(
    id,
    email,
    password,
    photo,
    reminders = null,
    friendList = null,
    videoList = null,
    
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.photo = photo
    this.reminders = reminders == null ? [] : reminders;
    this.friendList = friendList == null ? [] : friendList;
    this.videoList = videoList == null ? [] : videoList;
  }
}
class MakeVideo {
  constructor(id, title, vidImg, vidId) {
    this.id = id;
    this.title = title;
    this.vidImg = vidImg;
    this.vidId = vidId;
  }
}
module.exports = { MakeSubtask, MakeReminder, MakeTag, MakeUser, MakeVideo };
