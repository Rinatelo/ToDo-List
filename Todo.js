import { setItemAsync, getItemAsync } from "./storage.js";

export default class Todo {
  constructor(user) {
    this.user = user;
  }

  action(event) {
    const target = event.target;
    if (target.classList.contains("todo__action")) {
      const action = target.dataset.todoAction;
      const elemItem = target.closest(".todo__item");
      if (action === "deleted" && elemItem.dataset.todoState === "deleted") {
        elemItem.remove();
      } else {
        elemItem.dataset.todoState = action;
      }
      this.save()
        .then(() => console.log("Data saved"))
        .catch((error) => console.error("Error saving data:", error));
    } else if (target.classList.contains("todo__add")) {
      this.add();
      this.save()
        .then(() => console.log("Data saved"))
        .catch((error) => console.error("Error saving data:", error));
    }
  }

  add() {
    const elemText = document.querySelector(".todo__text");

    if (elemText.desabled || !elemText.value.length) {
      return;
    }
    document
      .querySelector(".todo__items")
      .insertAdjacentHTML("beforeend", this.create(elemText.value));
    elemText.value = "";
  }

  create(text) {
    return `
    <li class="todo__item" data-todo-state="active">
    <span class="todo__task">${text}</span>
    <span class="todo__action todo__action_restore" data-todo-action="active"></span>
    <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
    <span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
    </li>`;
  }

  init() {
    getItemAsync(this.user)
      .then((fromStorage) => {
        if (fromStorage) {
          document.querySelector(".todo__items").innerHTML = fromStorage;
        }

        document
          .querySelector(".todo__options")
          .addEventListener("change", this.update);

        document.addEventListener("click", this.action.bind(this));
      })
      .catch((error) => console.error("Error loading data:", error));
  }

  update() {
    const option = document.querySelector(".todo__options").value;
    document.querySelector(".todo__items").dataset.todoOption = option;
    document.querySelector(".todo__text").disabled = option !== "active";
  }

  save() {
    return setItemAsync(
      this.user,
      document.querySelector(".todo__items").innerHTML
    );
  }
}
