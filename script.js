// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const deleteList = document.getElementById('deleteList');
const audio = document.getElementById('background-music');
const audio2 = document.getElementById('background-music2');
const audio3 = document.getElementById('background-music3');

// Add event listener for adding new todos
addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTodo();
    audio2.play();
  }
});

// Function to add a new todo
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText) {
    const todoItem = createTodoElement(todoText);
    todoList.appendChild(todoItem);
    todoInput.value = '';
    audio2.play();
  }
}

// Function to create a new todo element
function createTodoElement(todoText) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', toggleTodo);

  const span = document.createElement('span');
  span.textContent = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', deleteTodo);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);

  return li;
}

// Function to create a new delete list element
function createDeleteElement(todoText) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Permanently';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', permanentDelete);

  const restoreButton = document.createElement('button');
  restoreButton.textContent = 'Restore';
  restoreButton.classList.add('restore-btn');
  restoreButton.addEventListener('click', restore);

  li.appendChild(span);
  li.appendChild(deleteButton);
  li.appendChild(restoreButton);

  return li;
}

// Function to toggle todo status
function toggleTodo(event) {
  const checkbox = event.target;
  const li = checkbox.parentElement;
  li.classList.toggle('checked');

  if (li.classList.contains('checked')) {
    todoList.appendChild(li);
    checkbox.disabled = true; // Disable the checkbox

    audio.play().then(() => {
      audio.onended = () => {
        checkbox.disabled = false; // Re-enable the checkbox when audio ends
      };
    }).catch(error => {
      console.log('Audio playback was prevented:', error);
      checkbox.disabled = false; // Ensure the checkbox is re-enabled if playback fails
    });
  } else {
    todoList.insertBefore(li, todoList.firstChild);
  }
}

// Function to delete a todo and move it to the delete list
function deleteTodo(event) {
  const li = event.target.parentElement;
  const todoText = li.querySelector('span').textContent;

  todoList.removeChild(li); // Remove from the todo list
  audio3.play();

  const deleteItem = createDeleteElement(todoText); // Create a new delete list element
  deleteList.appendChild(deleteItem); // Append to the delete list
}

// Function to permanently delete a todo from deleteList
function permanentDelete(event) {
  const li = event.target.parentElement;
  deleteList.removeChild(li); // Remove from the delete list
  audio3.play();
}

// Function to restore a todo to the todoList
function restore(event) {
  const li = event.target.parentElement;
  const todoText = li.querySelector('span').textContent;

  deleteList.removeChild(li); // Remove from the delete list

  const todoItem = createTodoElement(todoText); // Create a new todo list element
  todoList.insertBefore(todoItem, todoList.firstChild); // Insert at the top of the todo list
  audio2.play();
}
