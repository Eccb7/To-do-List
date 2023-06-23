import './style.css';
import {
  getTasksFromStorage, saveTasksToStorage,
} from './modules/taskModule.js';
import renderTasks from './modules/renderModule.js';

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

const clearCompletedTasks = () => {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveTasksToStorage(tasks);
  renderTasks();
};

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

export default addTask;
