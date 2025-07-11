const mongoose = require('mongoose');

// It's possible that jest-mongodb sets a different env var or that MONGO_URL is not yet available
// when this file is first parsed. However, it should be available when the functions run.
// For Mongoose 5.x, these options are generally good.
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Mongoose 5.x does not have useCreateIndex or useFindAndModify in the same way as Mongoose 4.x
  // It's better to rely on Mongoose 5.x defaults or specific needs.
  // For tests, a short serverSelectionTimeout might be useful if connection issues are frequent.
  serverSelectionTimeoutMS: 5000, // Shorter timeout for connection selection in tests
};

beforeAll(async () => {
  if (!process.env.MONGO_URL) {
    console.error('MONGO_URL not set by jest-mongodb. Tests may fail to connect.');
    // Optionally, throw an error to stop tests if MONGO_URL is critical and missing.
    // throw new Error("MONGO_URL is not set in the environment. jest-mongodb might not be configured correctly.");
    // For now, we'll let it try and likely fail with buffering if MONGO_URL is truly missing.
  }
  try {
    // Ensure any existing connection is closed before attempting a new one,
    // though Mongoose handles this reasonably well.
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    await mongoose.connect(process.env.MONGO_URL, mongooseOptions);
  } catch (err) {
    console.error('Mongoose connection error in beforeAll:', err.message);
    // Propagate the error to fail tests immediately if connection fails.
    throw err;
  }
});

// Clears all test data after each test suite.
// afterEach(async () => {
//   if (mongoose.connection.readyState !== 0) {
//     const collections = mongoose.connection.collections;
//     for (const key in collections) {
//       const collection = collections[key];
//       await collection.deleteMany({});
//     }
//   }
// });
// Note: Individual test files are already doing beforeEach deleteMany.
// A global afterEach might be too broad or interfere with per-suite setups.

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});
