const menu = document.querySelector("#menu");
const sidebar = document.querySelector("#sidebar");
const logo = document.querySelector("#logo");
const listItems = document.querySelectorAll(".sidebar-item:not(.logout)");
const profile = document.querySelector("#profile-data");

menu.addEventListener("click", () => {
  sidebar.toggleAttribute("data-collapsed");
  if (sidebar.hasAttribute("data-collapsed")) {
    logo.classList.toggle("hide");
    logo.classList.toggle("show");
    profile.classList.toggle("hide");
    profile.classList.toggle("show");
    listItems.forEach((item) => {
      item.classList.add("collapsed");
    });
  } else {
    logo.classList.toggle("hide");
    logo.classList.toggle("show");
    profile.classList.toggle("hide");
    profile.classList.toggle("show");
    listItems.forEach((item) => {
      item.classList.remove("collapsed");
    });
  }
});

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("selected");
  });
});
