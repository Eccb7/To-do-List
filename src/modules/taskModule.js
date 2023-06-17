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
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.description = newDescription;
    saveTasksToStorage(tasks);
  }
};

// Delete a task
const deleteTask = (index) => {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => task.index !== index);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveTasksToStorage(tasks);
};

export {
  getTasksFromStorage, saveTasksToStorage, editTaskDescription, deleteTask,
};
