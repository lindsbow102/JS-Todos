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

// Remove a todo
const removeTodo = ((id) => {
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  };
});

// Toggle todo checkbox based on completed or not
const toggleTodo = ((id) => {
  const todo = todos.find((todo) => {
    return todo.id === id;
  });

  if (todo !== undefined) {
      todo.completed = !todo.completed;
  } 
});


// Get the DOM elements for an individual todo
const generateTodoDOM = todo => {
  const todoEl = document.createElement("div");

  // Set up checkbox for todo
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);

  checkbox.addEventListener('change', (e) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Set up todo text
  const textEl = document.createElement('span');
  textEl.textContent = todo.text;
  todoEl.appendChild(textEl);

  // Set up Remove button
  const button = document.createElement('button');
  button.textContent = 'X';
  todoEl.appendChild(button);

  button.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  })

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
