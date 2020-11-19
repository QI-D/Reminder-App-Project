let createSubtask = document.querySelector(".create__subtask");
let newSubtask = document.querySelector(".new__subtask");
let deleteSubtask = document.querySelector(".delete__subtask");

let createTag = document.querySelector(".create__tag");
let newTag = document.querySelector(".new__tag");
let deleteTag = document.querySelector(".delete__tag");

// ============= create and delete subtask ===============
createSubtask.addEventListener("click", () => {
  //`<input type="text" class="form-control mb-1"  name="reminder_subtask" placeholder="Subtask">`;
  let item = document.createElement("input");
  item.setAttribute("class", "form-control mb-1 display__subtask");
  item.setAttribute("type", "text");
  item.setAttribute("name", "reminder_subtask");
  item.setAttribute("placeholder", "Subtask");
  newSubtask.appendChild(item);
});

deleteSubtask.addEventListener("click", () => {
  if (newSubtask.hasChildNodes()) {
    newSubtask.removeChild(newSubtask.lastChild);
  }
});

// =============== create and delete tag ========================
//reference = https://css-tricks.com/snippets/javascript/random-hex-color/
createTag.addEventListener("click", () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  let item = document.createElement("input");
  item.setAttribute("class", "form-control mb-1 display__tag d-inline");
  item.setAttribute("type", "text");
  item.setAttribute("name", "reminder_tag");
  item.style.backgroundColor = "#" + randomColor;
  newTag.appendChild(item);
});

deleteTag.addEventListener("click", () => {
  if (newTag.hasChildNodes()) {
    newTag.removeChild(newTag.lastChild);
  }
});
