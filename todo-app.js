const todos = [
  {
    text: "Order cat food",
    completed: true
  },
  {
    text: "Clean kitchen",
    completed: false
  },
  {
    text: "Buy food",
    completed: true
  },
  {
    text: "Do work",
    completed: false
  },
  {
    text: "Exercise",
    completed: true
  }
];

const filters = {
  searchText: "",
  hideCompleted: false
};

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#todos").appendChild(h2);

  filteredTodos.forEach(todo => {
    const todoEl = document.createElement("p");
    todoEl.textContent = todo.text;
    document.querySelector("#todos").appendChild(todoEl);
  });
};

renderTodos(todos, filters);

document.querySelector("#filter-todos").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#add-todo").addEventListener("submit", e => {
  e.preventDefault();
  const newTodo = e.target.elements.addTodo.value;
  todos.push({ text: newTodo, completed: false });
  renderTodos(todos, filters);
  e.target.elements.addTodo.value = "";
});

document.querySelector("#hide-completed").addEventListener("change", e => {
  // document.querySelector("#todos").innerHTML = "";
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
