import Todo from "./Todo.js";

let user = localStorage.getItem("user");
if (!user) {
  let userInput = window.prompt("Введите ваше имя:");
  const handler = {
    set: function (obj, prop, value) {
      if (/\d|[.,\\/]/.test(value) || value.trim() === "") {
        throw new Error("Недопустимое значение");
      } else {
        obj[prop] = value;
        return true;
      }
    },
  };
  let userObj = new Proxy({}, handler);
  userObj.name = userInput;
  user = userObj.name;
  localStorage.setItem("user", user);
}

const todo = new Todo(user);
todo.init();
