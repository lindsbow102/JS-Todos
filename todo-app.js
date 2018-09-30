const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false
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
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.addTodo.value = '';
});

document.querySelector("#hide-completed").addEventListener("change", e => {
  // document.querySelector("#todos").innerHTML = "";
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
