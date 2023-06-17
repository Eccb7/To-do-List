import {
  getTasksFromStorage, /* saveTasksToStorage, */ editTaskDescription, deleteTask,
} from './taskModule.js';
import updateTaskStatus from './statusModule.js';

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
      updateTaskStatus(task.index, checkbox.checked); // Call the new module
    });

    editButton.addEventListener('click', () => {
      // Create an input field and set its initial value to the task description
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.value = task.description;
      taskDescription.replaceWith(inputField);

      // Automatically focus on the input field
      inputField.focus();

      // Handle the editing logic when the input field loses focus
      inputField.addEventListener('blur', () => {
        const newDescription = inputField.value;
        if (newDescription.trim() !== '') {
          editTaskDescription(task.index, newDescription);
        }
        // Replace the input field with the updated task description
        inputField.replaceWith(taskDescription);
      });
    });

    deleteButton.addEventListener('click', () => {
      deleteTask(task.index);
      renderTasks(); // Re-render tasks after deletion
    });
  });
};

export default renderTasks;
