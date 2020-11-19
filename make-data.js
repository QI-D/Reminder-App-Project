class MakeReminder {
  constructor(id, title, description, subtask = null, tag = null) {
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

module.exports = { MakeSubtask, MakeReminder, MakeTag };
