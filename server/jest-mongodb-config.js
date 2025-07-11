// jest-mongodb-config.js
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.5', // Trying MongoDB 6.0.x for better OpenSSL 3.x compatibility
      skipMD5: true,
    },
    autoStart: false,
    instance: {
      dbName: 'jest',
    },
  },
  // Ensure tests wait long enough for MongoDB to download if needed
  // This timeout is also in jest.config.js, but being explicit here doesn't hurt for clarity.
  testTimeout: 90000, // Further increase for potentially larger/slower download
};
