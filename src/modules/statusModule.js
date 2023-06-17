import { getTasksFromStorage, saveTasksToStorage } from './taskModule.js';

// Update task completion status
const updateTaskStatus = (index, completed) => {
  const tasks = getTasksFromStorage();
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.completed = completed;
    saveTasksToStorage(tasks);
  }
};

export default updateTaskStatus;
