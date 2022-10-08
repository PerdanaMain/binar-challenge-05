const menu = document.getElementById("menu-label");
const sidebar = document.getElementsByClassName("sb")[0];

menu.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-hide");
});
