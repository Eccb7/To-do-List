const customJestConfig = {
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/mocks/emptyModule.js',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jsdom',
};

module.exports = {
  ...customJestConfig,
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
};
