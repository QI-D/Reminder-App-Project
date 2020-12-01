let showTag = document.querySelector(".show-tag");
let tagForm = document.querySelector(".form-tag");

showTag.addEventListener("click", () => {
  if (tagForm.style.display === "none") {
    tagForm.style.display = "block";
  } else {
    tagForm.style.display = "none";
  }
});
