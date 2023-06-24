import './style.css';
import renderTasks from './modules/renderModule.js';
import { addTask, clearCompletedTasks } from './modules/extrafunctionality.js';

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
