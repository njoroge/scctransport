const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
// const connectDB = require('../../config/db'); // Preset should handle DB connection
const gpsDataRoutes = require('../../routes/gpsDataRoutes');
const userRoutes = require('../../routes/userRoutes'); // For login to get token
const GPSData = require('../../models/GPSDataModel');
const Vehicle = require('../../models/VehicleModel');
const User = require('../../models/UserModel');

// Setup Express app for testing
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes); // Mount user routes for login
app.use('/api/gps-data', gpsDataRoutes);

let mongoServer;
let testVehicle;
let authToken;

beforeAll(async () => {
  mongoServer = await connectDB(); // Connect to the in-memory database or test instance

  // Create a test user
  await User.deleteMany({});
  const user = await User.create({
    username: 'gpsTester',
    email: 'gpstester@example.com',
    password: 'password123',
    role: 'Dispatcher', // Or any role that can access protected routes
  });

  // Log in to get a token
  const res = await request(app)
    .post('/api/users/login')
    .send({ email: 'gpstester@example.com', password: 'password123' });
  authToken = res.body.token;

  // Create a test vehicle
  await Vehicle.deleteMany({});
  testVehicle = await Vehicle.create({
    registrationNumber: 'GPS123',
    type: 'Test Bus',
    capacity: 10,
    make: 'TestMake',
    model: 'TestModel',
    year: 2023,
    status: 'Active',
  });
});

afterEach(async () => {
  await GPSData.deleteMany({}); // Clear GPSData after each test
});

afterAll(async () => {
  // It's good practice to ensure the DB is clean after tests,
  // jest-mongodb preset often drops the database, but explicit clearing can be safer for specific collections.
  await User.deleteMany({});
  await Vehicle.deleteMany({});
  // if (mongoServer) { // Preset handles DB server lifecycle
    // await mongoose.connection.dropDatabase(); // Preset should handle this
    // await mongoose.connection.close(); // Preset should handle this
    // await mongoServer.stop(); // If using MongoMemoryServer, uncomment this // Preset handles this
  // }
});

describe('GPS Data API', () => {
  describe('POST /api/gps-data', () => {
    it('should submit GPS data successfully with valid data', async () => {
      const gpsPayload = {
        vehicleId: testVehicle._id.toString(),
        latitude: 34.0522,
        longitude: -118.2437,
        speed: 60,
        heading: 180,
        timestamp: new Date().toISOString(),
      };

      const res = await request(app)
        .post('/api/gps-data')
        .set('Authorization', `Bearer ${authToken}`)
        .send(gpsPayload);

      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toBe('GPS data submitted successfully.');
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.latitude).toBe(gpsPayload.latitude);

      const savedData = await GPSData.findById(res.body.data._id);
      expect(savedData).not.toBeNull();
      expect(savedData.vehicleId.toString()).toBe(testVehicle._id.toString());
    });

    it('should return 400 if latitude is missing', async () => {
      const gpsPayload = {
        vehicleId: testVehicle._id.toString(),
        // latitude: 34.0522, // Missing
        longitude: -118.2437,
      };

      const res = await request(app)
        .post('/api/gps-data')
        .set('Authorization', `Bearer ${authToken}`)
        .send(gpsPayload);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Latitude and Longitude are required.');
    });

    it('should return 400 if longitude is missing', async () => {
      const gpsPayload = {
        vehicleId: testVehicle._id.toString(),
        latitude: 34.0522,
        // longitude: -118.2437, // Missing
      };

      const res = await request(app)
        .post('/api/gps-data')
        .set('Authorization', `Bearer ${authToken}`)
        .send(gpsPayload);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Latitude and Longitude are required.');
    });

    it('should return 400 if vehicleId is missing', async () => {
        const gpsPayload = {
            // vehicleId: testVehicle._id.toString(), // Missing
            latitude: 34.0522,
            longitude: -118.2437,
        };

        const res = await request(app)
            .post('/api/gps-data')
            .set('Authorization', `Bearer ${authToken}`)
            .send(gpsPayload);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('vehicleId is required.');
    });

    it('should return 404 if vehicleId does not exist', async () => {
      const nonExistentVehicleId = new mongoose.Types.ObjectId().toString();
      const gpsPayload = {
        vehicleId: nonExistentVehicleId,
        latitude: 34.0522,
        longitude: -118.2437,
      };

      const res = await request(app)
        .post('/api/gps-data')
        .set('Authorization', `Bearer ${authToken}`)
        .send(gpsPayload);

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Vehicle not found.');
    });

    it('should return 400 for invalid latitude (too high)', async () => {
        const gpsPayload = {
            vehicleId: testVehicle._id.toString(),
            latitude: 90.1, // Invalid
            longitude: -118.2437,
        };

        const res = await request(app)
            .post('/api/gps-data')
            .set('Authorization', `Bearer ${authToken}`)
            .send(gpsPayload);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Validation Error');
        expect(res.body.errors).toContain('Latitude must be between -90 and 90.');
    });

    // Add more tests for other validation rules (longitude, speed, heading)
    // Add test for unauthorized access (no token)
    it('should return 401 if no auth token is provided', async () => {
        const gpsPayload = {
            vehicleId: testVehicle._id.toString(),
            latitude: 34.0522,
            longitude: -118.2437,
        };

        const res = await request(app)
            .post('/api/gps-data')
            // .set('Authorization', `Bearer ${authToken}`) // No token
            .send(gpsPayload);

        expect(res.statusCode).toBe(401); // Or 403 depending on middleware
        // expect(res.body.message).toBe('Not authorized, no token'); // Adjust based on actual error message
    });

  });

  // Placeholder for future tests for GET endpoints
  // describe('GET /api/gps-data/:vehicleId/latest', () => { ... });
  // describe('GET /api/gps-data/active-vehicles', () => { ... });
});
