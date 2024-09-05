document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const completeAllBtn = document.getElementById("complete-all-btn");
  const todoList = document.getElementById("todo-list");
  const todoForm = document.getElementById("todo-form");

  const storage = localStorage.getItem("todo");
  let todos = storage ? JSON.parse(storage) : [];

  const renderTodos = () => {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.setAttribute("data-index", index);
      li.style.transition = "all 300ms ease-out"
      li.style.cursor = "pointer"
      li.className = `todo list-group-item d-flex justify-content-between align-items-center ${todo.completed ? "completed order-last" : "order-first"}`;
      li.innerHTML = `
        <span>${todo.text}</span>
        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
      `;
      todoList.appendChild(li);
    });

    localStorage.setItem("todo", JSON.stringify(todos))

    attachEventListeners();
  };

  const attachEventListeners = () => {
    document.querySelectorAll(".todo").forEach(item => {
      item.addEventListener("click", () => {
        toggleTodoStatus(item.dataset.index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        deleteTodoItem(button.dataset.index);
      });
    });
  };

  const addTodoItem = () => {
    const todoText = input.value.trim();
    if (todoText) {
      todos.push({ text: todoText, completed: false });
      input.value = "";
      renderTodos();
    }
  };

  const toggleTodoStatus = (index) => {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  };

  const deleteTodoItem = (index) => {
    todos.splice(index, 1);
    renderTodos();
  };

  const clearAllTodos = () => {
    todos = [];
    renderTodos();
  };

  const completeAllTodos = () => {
    todos = todos.map(todo => ({ ...todo, completed: true }));
    renderTodos();
  };

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodoItem();
  });

  deleteAllBtn.addEventListener("click", clearAllTodos);
  completeAllBtn.addEventListener("click", completeAllTodos);

  renderTodos();
});
