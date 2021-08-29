const iconClick = document.querySelector(".todo__header--icon");
const themeId = document.getElementById("theme-style");
const moon = document.getElementById("todo__header--icon moon");
const sun = document.getElementById("todo__header--icon sun");
const todoForm = document.querySelector("[data-todo-form]");
const todoInput = document.querySelector("[data-todo-input]");
const todoListContainer = document.querySelector("[data-todo-lists-container]");
const taskTemplate = document.getElementById("todo-template");
const activeNumber = document.querySelector("[data-active-number]");
const activeTasks = document.querySelector("[data-active-tasks]");
const allTasks = document.querySelector("[data-all-tasks]");
const completedTasks = document.querySelector("[data-completed-tasks]");
const footerActions = document.querySelectorAll(".footer__actions p");
const clearCompleteTasks = document.querySelector(
  "[data-clear-complete-tasks]"
);

const LS_TODO_KEYS = "todo.todos";
const LS_SELECTED_TODO_ID_KEYS = "todo.selectedListId";
let todos = JSON.parse(localStorage.getItem(LS_TODO_KEYS)) || [];
let selectedTodoId =
  JSON.parse(localStorage.getItem(LS_SELECTED_TODO_ID_KEYS)) || [];

// Change theme functionality
let theme = localStorage.getItem("theme");
if (theme == null) {
  setTheme("light");
} else {
  setTheme(theme);
}

// EventListeners
moon.addEventListener("click", () => {
  setTheme("dark");
});
sun.addEventListener("click", () => {
  setTheme("light");
});

clearCompleteTasks.addEventListener("click", (e) => {
  const uCompletedTodos = todos.filter((todo) => todo.complete !== "completed");
  todos = uCompletedTodos;
  saveAndRender(todos);
});

allTasks.addEventListener("click", (e) => {
  saveAndRender(todos);
  if (allTasks.classList.contains("active")) {
    activeTasks.classList.remove("active");
    completedTasks.classList.remove("active");
  } else {
    allTasks.classList.add("active");
    activeTasks.classList.remove("active");
    completedTasks.classList.remove("active");
  }
});
activeTasks.addEventListener("click", (e) => {
  const activeTodos = todos.filter((todo) => todo.complete !== "completed");
  saveAndRender(activeTodos);
  if (activeTasks.classList.contains("active")) {
    allTasks.classList.remove("active");
    completedTasks.classList.remove("active");
  } else {
    activeTasks.classList.add("active");
    allTasks.classList.remove("active");
    completedTasks.classList.remove("active");
  }
});
completedTasks.addEventListener("click", (e) => {
  const completedTodos = todos.filter((todo) => todo.complete === "completed");
  saveAndRender(completedTodos);
  if (completedTasks.classList.contains("active")) {
    activeTasks.classList.remove("active");
    allTasks.classList.remove("active");
  } else {
    completedTasks.classList.add("active");
    activeTasks.classList.remove("active");
    allTasks.classList.remove("active");
  }
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = todoInput.value;
  if (todoName == null || todoName === "") return;
  const todo = createTodo(todoName);
  todoInput.value = null;
  todos.push(todo);
  saveAndRender(todos);
});

todoListContainer.addEventListener("click", (e) => {
  const parent = e.target.parentElement;
  if (
    (e.target.tagName === "IMG") &
    e.target.classList.contains("todo__list--close")
  ) {
    const taskId = parent.classList[1];
    todoT = todos.filter((todo) => todo.id === taskId);
    todos.splice(todoT, 1);
    saveAndRender(todos);
  }
  if (
    e.target.classList.contains("circle") ||
    e.target.classList.contains("i-circle")
  ) {
    const parentElement = parent.parentElement;
    const status = completeStatus(parentElement);
    const Id = parentElement.classList[1];
    selectedTodo = todos.find((todo) => todo.id === Id);
    selectedTodo.complete = status;
    saveAndRender(todos);
  }
});

// Functions

function completeStatus(element) {
  if (element.classList.contains("completed")) {
    return "false";
  } else {
    return "completed";
  }
}

function createTodo(name) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: "false",
  };
}

function saveAndRender(input) {
  save();
  render(input);
}

function save() {
  localStorage.setItem(LS_TODO_KEYS, JSON.stringify(todos));
  localStorage.setItem(
    LS_SELECTED_TODO_ID_KEYS,
    JSON.stringify(selectedTodoId)
  );
}

function render(input) {
  clearElement(todoListContainer);
  renderTasks(input);
  renderTaskCount(todos);
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderTasks(input) {
  input.forEach((todo) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const taskContainer = taskElement.querySelector(".todo__list--item");
    taskContainer.classList.add(`${todo.id}`);
    taskContainer.classList.add(`${todo.complete}`);
    const circle = taskElement.querySelector(".circle");
    // circle.classList.add(`${todo.complete}`);
    const para = taskElement.querySelector(".list--item");
    para.append(todo.name);
    todoListContainer.appendChild(taskElement);
  });
}

function renderTaskCount(inputList) {
  const incompleteTask = inputList.filter(
    (task) => task.complete !== "completed"
  ).length;
  const taskString = incompleteTask === 1 ? "task" : "tasks";
  activeNumber.innerHTML = `${incompleteTask} ${taskString} left.`;
}

function setTheme(mode) {
  if (mode == "light") {
    iconClick.classList.add("sun");
    themeId.href = "./dist/css/main.css";
    moon.style.display = "block";
    sun.style.display = "none";
  }
  if (mode == "dark") {
    moon.style.display = "none";
    sun.style.display = "block";
    themeId.href = "./dist/css/mainLaout.css";
  }

  localStorage.setItem("theme", mode);
}

render(todos);
