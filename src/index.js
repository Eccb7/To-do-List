import './style.css';

// Retrieve tasks from local storage
const getTasksFromStorage = () => {
  const tasksJSON = localStorage.getItem('tasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
};

// Save tasks to local storage
const saveTasksToStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Edit a task description
const editTaskDescription = (index, newDescription) => {
  const tasks = getTasksFromStorage();
  let renderTasks;
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.description = newDescription;
    saveTasksToStorage(tasks);
    renderTasks();
  }
};

// Delete a task
const deleteTask = (index) => {
  let renderTasks;
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => task.index !== index);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveTasksToStorage(tasks);
  renderTasks();
};

// Render tasks
const renderTasks = () => {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  const tasks = getTasksFromStorage();
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    taskItem.appendChild(checkbox);

    const taskDescription = document.createElement('span');
    taskDescription.className = 'task-description';
    taskDescription.innerText = task.description;
    taskItem.appendChild(taskDescription);

    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = '&#9998;';
    taskItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete-icon';
    deleteButton.appendChild(deleteIcon);
    taskItem.appendChild(deleteButton);

    todoList.appendChild(taskItem);

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasksToStorage(tasks);
    });

    editButton.addEventListener('click', () => {
      const newDescription = ('Enter a new description:', task.description);
      if (newDescription !== null) {
        editTaskDescription(task.index, newDescription);
      }
    });

    deleteButton.addEventListener('click', () => {
      deleteTask(task.index);
    });
  });
};

// Add a new task
const addTask = (description) => {
  const tasks = getTasksFromStorage();
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  saveTasksToStorage(tasks);
  renderTasks();
};

// Clear completed tasks
const clearCompletedTasks = () => {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveTasksToStorage(tasks);
  renderTasks();
};

// Event listener for adding a task
document.addEventListener('DOMContentLoaded', () => {
  const addTaskButton = document.getElementById('addTaskButton');
  const clearButton = document.querySelector('button[type="reset"]');
  const refreshButton = document.getElementById('refreshButton');

  addTaskButton.addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
      addTask(taskText);
      taskInput.value = '';
    }
  });

  clearButton.addEventListener('click', () => {
    clearCompletedTasks();
  });

  refreshButton.addEventListener('click', () => {
    window.location.reload();
  });

  renderTasks();
});

export default renderTasks;
