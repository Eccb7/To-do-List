import { getTasksFromStorage, saveTasksToStorage } from './taskModule.js';

// Update task completion status
const updateTaskStatus = (index, updatedStatus) => {
  let tasks = getTasksFromStorage();
  if (index !== -1) {
    tasks = tasks.map((task) => {
      if (task.index === index) {
        task.completed = updatedStatus;
      }
      return task;
    });
    saveTasksToStorage(tasks);
  }
};

export default updateTaskStatus;
