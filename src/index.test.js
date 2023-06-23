import { deleteTask } from './modules/taskModule.js';
import addTask from './index.js';

describe('Task Module', () => {
  beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn(() => '[]'), // Return an empty array as the initial value
      setItem: jest.fn(),
    };

    // Create a mock for the DOM element
    document.body.innerHTML = `
      <ul id="todo-list">
        <li>
          <input type="checkbox" checked>
          <span class="task-description">Task 1</span>
          <button class="edit-button">&#9998;</button>
          <button class="delete-button"><span class="delete-icon"></span></button>
        </li>
      </ul>
    `;
  });

  afterEach(() => {
    // Clean up the DOM after each test
    document.body.innerHTML = '';
  });

  test('addTask should add a new task to localStorage and render it', () => {
    // Mock the task input value
    const taskInput = document.createElement('input');
    taskInput.id = 'taskInput';
    taskInput.value = 'New Task';
    document.body.appendChild(taskInput);

    // Call the addTask function
    addTask('New Task');

    // Check if the task was added to localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify([{ description: 'New Task', completed: false, index: 1 }]),
    );

    // Check if the task was rendered in the DOM
    const todoList = document.getElementById('todo-list');
    expect(todoList.innerHTML).toContain('<li>');
    expect(todoList.innerHTML).toContain('New Task');

    // Check if the task input was cleared
    expect(taskInput.value).toBe('');
  });

  test('deleteTask should remove a task from localStorage and the DOM', () => {
    // Call the deleteTask function
    deleteTask(1);

    // Check if the task was removed from localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify([]));

    // Check if the task was removed from the DOM
    const todoList = document.getElementById('todo-list');
    expect(todoList.innerHTML).not.toContain('<li>');
  });
});
