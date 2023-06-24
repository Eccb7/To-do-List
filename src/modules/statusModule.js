import { getTasksFromStorage, saveTasksToStorage } from "./taskModule.js";

// Update task completion status
const updateTaskStatus = (index, updatedStatus) => {
  let tasks = getTasksFromStorage();
  console.log(tasks);
  if (index !== -1) {
    tasks = tasks.map((task) => {
      if (task.index === index) {
        task.completed = updatedStatus;
      }
      return task;
    });
    return localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

export default updateTaskStatus;
