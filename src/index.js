import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const todoList = document.getElementById('todo-list');

  addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
      const taskItem = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      taskItem.appendChild(checkbox);

      const taskLabel = document.createElement('label');
      taskLabel.innerText = taskText;
      taskItem.appendChild(taskLabel);

      todoList.appendChild(taskItem);
      taskInput.value = '';
    }
  });
});
