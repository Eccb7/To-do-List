import addTask from './index.js';
import { deleteTask } from './modules/taskModule.js';

describe('Task Module', () => {
  beforeEach(() => {
    // Mock localStorage
    // eslint-disable-next-line func-names
    const localStorageMock = (function () {
      let store = {};

      return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: jest.fn(() => {
          store = {};
        }),
        removeItem: jest.fn((key) => {
          delete store[key];
        }),
      };
    }());

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

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
    const taskDescription = 'New Task';

    // Call the addTask function with the task description
    addTask(taskDescription);

    // Check if the task was added to localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify([
        { description: taskDescription, completed: false, index: 1 },
      ]),
    );

    // Check if the task was rendered in the DOM
    const todoListItems = document.querySelectorAll('.task-description');
    expect(todoListItems.length).toBe(1);
  });

  test('deleteTask should remove a task from localStorage and the DOM', () => {
    // Call the deleteTask function
    deleteTask(1);

    // Check if the task was removed from localStorage
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      'tasks',
      JSON.stringify([]),
    );

    // Check if the task was removed from the DOM
    const todoList = document.getElementById('todo-list');
    const todoListItems = todoList.getElementsByTagName('li');
    expect(todoListItems.length).toBe(1);
  });
});
