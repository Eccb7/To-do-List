// Example code for setting up a global test configuration
beforeAll(() => {
  // Set up any global configurations or environment variables needed for tests
  process.env.TEST_MODE = 'true';
});

// Example code for cleaning up after all tests have finished
afterAll(() => {
  // Clean up any resources or state after all tests have finished
  process.env.TEST_MODE = 'false';
});