import renderTasks from './renderModule.js';
import { getTasksFromStorage, saveTasksToStorage } from './taskModule.js';

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
export { addTask, clearCompletedTasks };
