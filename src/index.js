import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const todoList = document.getElementById('todo-list');

  const tasks = [
    { description: 'Task 1', completed: false, index: 1 },
    { description: 'Task 2', completed: true, index: 2 },
    { description: 'Task 3', completed: false, index: 3 },
  ];

  function renderTasks() {
    // Clear existing tasks
    todoList.innerHTML = '';

    // Sort tasks by index
    tasks.sort((a, b) => a.index - b.index);

    // Create and append list items for each task
    tasks.forEach((task) => {
      const taskItem = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      taskItem.appendChild(checkbox);

      const taskLabel = document.createElement('label');
      taskLabel.innerText = task.description;
      taskItem.appendChild(taskLabel);

      todoList.appendChild(taskItem);
    });
  }

  // Render tasks on page load
  renderTasks();

  addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
      const newTask = {
        description: taskText,
        completed: false,
        index: tasks.length + 1,
      };
      tasks.push(newTask);
      renderTasks();
      taskInput.value = '';
    }
  });
});
