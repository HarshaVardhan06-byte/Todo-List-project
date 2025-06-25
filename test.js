const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const container = document.getElementById('todo-container');

let todoList = JSON.parse(localStorage.getItem('todos')) || [];

function saveToLocal() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

function renderTodos() {
  container.innerHTML = '';
  todoList.forEach(({ id, text, completed }) => {
    const div = document.createElement('div');
    div.className = 'todo-item';

    const leftSide = document.createElement('div');
    leftSide.className = 'todo-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
      todoList = todoList.map(todo =>
        todo.id === id ? { ...todo, completed: checkbox.checked } : todo
      );
      saveToLocal();
      renderTodos();
    });

    const span = document.createElement('span');
    span.textContent = text;
    span.className = `todo-text ${completed ? 'completed' : ''}`;

    leftSide.appendChild(checkbox);
    leftSide.appendChild(span);

    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-icons-outlined';
    deleteIcon.textContent = 'delete';
    deleteIcon.addEventListener('click', () => {
      todoList = todoList.filter(todo => todo.id !== id);
      saveToLocal();
      renderTodos();
    });

    div.appendChild(leftSide);
    div.appendChild(deleteIcon);
    container.appendChild(div);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTodo = {
    id: Date.now().toString(),
    text: input.value.trim(),
    completed: false,
  };
  if (newTodo.text !== '') {
    todoList.push(newTodo);
    saveToLocal();
    renderTodos();
    input.value = '';
  }
});

renderTodos();
