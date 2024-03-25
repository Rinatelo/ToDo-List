import Todo from "./Todo.js";

let user = localStorage.getItem("user");
if (!user) {
  user = window.prompt("Введите ваше имя:");
  localStorage.setItem("user", user);
}

const todo = new Todo(user);
todo.init();
