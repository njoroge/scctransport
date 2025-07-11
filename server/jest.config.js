module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '**/*.js',
    '!jest.config.js',
    '!jest-mongodb-config.js', // If we create this, exclude it
    '!coverage/**',
    '!node_modules/**',
    '!index.js', // Typically the main server entry point, often not unit tested directly
    '!config/db.js', // DB connection, tested via integration tests
  ],
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>'],
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  // Consider a timeout for async operations, especially with DB
  testTimeout: 90000, // 90 seconds (increased for potential MongoDB download)
  watchPathIgnorePatterns: ['globalConfig'], // For @shelf/jest-mongodb
};
