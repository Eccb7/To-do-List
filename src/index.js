import './style.css';
import {
  getTasksFromStorage, saveTasksToStorage, /* editTaskDescription, deleteTask, */
} from './modules/taskModule.js';
import { renderTasks } from './modules/renderModule.js';

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
  renderTasks(tasks);
};

// Clear completed tasks
const clearCompletedTasks = () => {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveTasksToStorage(tasks);
  renderTasks(tasks);
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

  const tasks = getTasksFromStorage();
  renderTasks(tasks);
});
