import { logout } from "./api/users.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { loginView } from "./views/login.js";
import { profileView } from "./views/profile.js";
import { registerView } from "./views/register.js";
import { searchView } from "./views/search.js";

const main = document.querySelector("main");

document.getElementById('logoutBtn').addEventListener('click',onLogout)

page(decorateContext);
page("/books", dashboardView);
page("/", dashboardView);
page("/books/:id", detailsView);
page("/edit/:id", editView);
page("/login", loginView);
page("/register", registerView);
page("/myBooks", profileView);
page("/create", createView);
page("/search", searchView);

updateNav()
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
ctx.updateNav=updateNav;
  next();
}
function renderMain(templateResult) {
  render(templateResult, main);
}

function updateNav() {
  const userData = getUserData();
  if (userData) {
    document.getElementById("user").style.display = "block";
    document.getElementById("guest").style.display = "none";
    document.getElementsByTagName("span")[0].textContent = `Welcome, ${userData.email}`;
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "block";
  }
}

function onLogout(){
logout();
updateNav();
page.redirect('/books')
}