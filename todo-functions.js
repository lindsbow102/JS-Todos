// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos"); // Check for existing saved data

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Render application todos based on filters
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(todo => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Get the DOM elements for an individual todo
const generateTodoDOM = todo => {
  const todoEl = document.createElement("div");

  // Set up checkbox for todo
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  todoEl.appendChild(checkbox);

  // Set up todo text
  const textEl = document.createElement('span');
  textEl.textContent = todo.text;
  todoEl.appendChild(textEl);

  // Set up Remove button
  const button = document.createElement('button');
  button.textContent = 'X';
  todoEl.appendChild(button);

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
