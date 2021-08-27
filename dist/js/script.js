const iconClick = document.querySelector(".todo__header--icon");
const themeId = document.getElementById("theme-style");
const moon = document.getElementById("todo__header--icon moon");
const sun = document.getElementById("todo__header--icon sun");
const actionsList = document.querySelectorAll(".actions--list");
const clearComp = document.querySelector(".clear--completed");
const todoList = document.querySelectorAll(".todo__list--item");
const todoListContainer = document.querySelector(".todo__list");
const inputItem = document.querySelector(".form-goup--input");
const form = document.querySelector(".todo__form");
const completedList = [];
const activeList = [];
const allList = [];

moon.addEventListener("click", () => {
  moon.style.display = "none";
  sun.style.display = "block";
  themeId.href = "./dist/css/mainLaout.css";
});
sun.addEventListener("click", () => {
  iconClick.classList.add("sun");
  themeId.href = "./dist/css/main.css";
  moon.style.display = "block";
  sun.style.display = "none";
});

todoList.forEach((list) => {
  allList.push(list);
  if (list.classList.contains("completed")) {
    completedList.push(list);
  } else {
    activeList.push(list);
  }
});
console.log(completedList);

const circles = document.querySelectorAll(".circle");
todoList.forEach((list) => {
  cirBtn = list.querySelectorAll(".circle");
  cirBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      list.classList.toggle("completed");
      if (list.classList.contains("completed")) {
        completedList.push(list);
        activeList.pop(list);
      } else {
        completedList.pop(list);
        activeList.push(list);
      }
    });
  });
  // console.log(cirBtn);
});

actionsList.forEach((action) => {
  action.addEventListener("click", () => {
    if (action.classList.contains("item--completed")) {
      console.log(completedList);
    } else if (action.classList.contains("item--active")) {
      console.log(activeList);
    } else if (action.classList.contains("item--list")) {
      console.log(allList);
    }
  });
});

console.log(completedList);
clearComp.addEventListener("click", () => {
  completedList.length = 0;
  console.log(completedList);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log(inputItem.value);
  todoListContainer.appendChild(createElement(inputItem));
  console.log(todoList);
});

function createElement(input) {
  const divEl = document.createElement("div");
  divEl.classList.add("todo__list--item");
  divEl.innerHTML = `
  <div class="circle">
  <div class="i-circle"></div>
  </div>
  <p class="list--item">${input.value}</p>
  <img
    src="./dist/images/icon-cross.svg"
    alt="Cross icon"
    class="todo__list--close"
  />
  `;
  return divEl;
}
