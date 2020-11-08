let showSubtask = document.querySelector(".show--subtask");
let subtaskForm = document.querySelector(".form--subtask");

showSubtask.addEventListener("click", () => {
  if (subtaskForm.style.display === "none") {
    subtaskForm.style.display = "block";
  } else {
    subtaskForm.style.display = "none";
  }
});
