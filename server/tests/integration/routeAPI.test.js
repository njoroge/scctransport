const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Assuming your Express app is exported from server/index.js
const Route = require('../../models/RouteModel');
const User = require('../../models/UserModel'); // For creating a test user and token

// Global variables for test user and token
let testUser;
let authToken;
let testUserId;

// Helper to create a unique route name for each test run
const generateUniqueRouteName = () => 'Test Route ' + new mongoose.Types.ObjectId().toString();

describe('Route API Integration Tests', () => {
  beforeAll(async () => {
    // jest-mongodb handles DB connection

    // Create a test user and generate a token
    // This part might need adjustment based on your actual auth implementation
    // For instance, if user registration also logs them in or provides a token.
    const userEmail = `testuser-${Date.now()}@example.com`;
    const userPassword = 'password123';

    // Attempt to register a new user
    // This assumes your POST /api/users/register endpoint works and returns a token or user info
    // OR that your User model and JWT generation can be used directly.
    try {
        // Option 1: Register user via API (if available and simple)
        // const res = await request(app).post('/api/users/register').send({ name: 'Test User', email: userEmail, password: userPassword, role: 'admin' }); // Assuming role can be set
        // if (res.body.token) {
        //   authToken = res.body.token;
        //   testUserId = res.body._id; // Or decode from token if id is in there.
        // } else { // Fallback to creating user directly if register endpoint is complex or doesn't give token
        //     throw new Error("Token not received from registration");
        // }
        // testUser = { _id: testUserId };


        // Option 2: Create user directly and mock token generation if needed (more control for tests)
        const plainUser = { name: 'Test User', email: userEmail, password: userPassword, role: 'admin' }; // Assuming 'admin' role for full access in tests
        testUser = new User(plainUser);
        await testUser.save();
        testUserId = testUser._id;

        // Generate token (assuming User model has a method or use a utility)
        // This is a placeholder for your actual token generation logic
        if (testUser.getSignedJwtToken) { // Example method name
            authToken = testUser.getSignedJwtToken();
        } else {
            // Fallback: If no direct method, you might need a utility or to call an auth service endpoint
            // For now, we'll assume a simple JWT structure if direct generation isn't available
            // This is NOT secure for production but common in tests if direct token gen is hard
            const jwt = require('jsonwebtoken');
            authToken = jwt.sign({ id: testUserId, role: 'admin' }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
            console.warn("Using fallback JWT generation for tests. Ensure UserModel.getSignedJwtToken or similar is preferred.");
        }
        if (!authToken) throw new Error("Auth token could not be generated for test user.");

    } catch (error) {
      console.error('Failed to create test user and token:', error);
      // Fallback if user creation fails catastrophically
      testUser = { _id: new mongoose.Types.ObjectId() }; // Placeholder
      authToken = 'dummy_token_for_failed_setup'; // Placeholder
      testUserId = testUser._id;
      console.warn("Test user setup failed, using placeholder ID and token. Auth tests may be unreliable.");
    }
  });

  afterAll(async () => {
    await Route.deleteMany({});
    if (testUserId && User) {
      await User.findByIdAndDelete(testUserId);
    }
    // jest-mongodb handles DB disconnection
    // await mongoose.connection.close(); // Not needed with jest-mongodb usually
  });

  beforeEach(async () => {
    await Route.deleteMany({});
  });

  // --- Test Data ---
  const getValidRoutePayload = (overrides = {}) => ({
    routeName: generateUniqueRouteName(),
    origin: { latitude: 1.23, longitude: 4.56, address: 'Origin St' },
    destination: { latitude: 7.89, longitude: 10.11, address: 'Destination Ave' },
    waypoints: [{ latitude: 5.0, longitude: 6.0, address: 'Waypoint 1', order: 1 }],
    estimatedDistance: 250,
    estimatedDuration: 180,
    routeType: 'Delivery',
    status: 'Planned',
    // createdBy will be set by the backend using authenticated user
    ...overrides,
  });

  // --- CREATE ---
  describe('POST /api/routes', () => {
    it('should create a new route successfully with valid data', async () => {
      const payload = getValidRoutePayload();
      const res = await request(app)
        .post('/api/routes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body.routeName).toBe(payload.routeName.toUpperCase());
      expect(res.body.origin.address).toBe(payload.origin.address);
      expect(res.body.waypoints.length).toBe(1);
      expect(res.body.createdBy).toBe(testUserId.toString());
    });

    it('should fail to create a route if required fields are missing', async () => {
      const payload = { ...getValidRoutePayload(), routeName: undefined };
      const res = await request(app)
        .post('/api/routes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(payload);
      expect(res.statusCode).toBe(400);
    });
     it('should fail to create if not authenticated', async () => {
      const payload = getValidRoutePayload();
      const res = await request(app).post('/api/routes').send(payload);
      expect(res.statusCode).toBe(401); // Or whatever your auth middleware returns
    });
  });

  // --- READ ALL ---
  describe('GET /api/routes', () => {
    it('should get all routes with pagination', async () => {
      await new Route({ ...getValidRoutePayload({routeName: generateUniqueRouteName()}), createdBy: testUserId }).save();
      await new Route({ ...getValidRoutePayload({routeName: generateUniqueRouteName()}), createdBy: testUserId }).save();

      const res = await request(app)
        .get('/api/routes?page=1&pageSize=1')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.routes.length).toBe(1);
      expect(res.body.page).toBe(1);
      expect(res.body.pages).toBe(2); // Total 2 routes, 1 per page
      expect(res.body.count).toBe(2);
    });
  });

  // --- READ ONE ---
  describe('GET /api/routes/:idOrName', () => {
    it('should get a route by its ID', async () => {
      const route = await new Route({ ...getValidRoutePayload(), createdBy: testUserId }).save();
      const res = await request(app)
        .get(`/api/routes/${route._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.routeName).toBe(route.routeName);
    });

    it('should get a route by its name (case-insensitive in controller)', async () => {
      const routeData = getValidRoutePayload();
      await new Route({ ...routeData, createdBy: testUserId }).save();
      const res = await request(app)
        .get(`/api/routes/${routeData.routeName.toLowerCase()}`) // search with lowercase
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.routeName).toBe(routeData.routeName.toUpperCase());
    });

    it('should return 404 if route not found', async () => {
      const res = await request(app)
        .get(`/api/routes/${new mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(404);
    });
  });

  // --- UPDATE ---
  describe('PUT /api/routes/:idOrName', () => {
    it('should update a route successfully', async () => {
      const route = await new Route({ ...getValidRoutePayload(), createdBy: testUserId }).save();
      const updatedPayload = { routeName: 'Updated Route Name', status: 'Active' };

      const res = await request(app)
        .put(`/api/routes/${route._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedPayload);

      expect(res.statusCode).toBe(200);
      expect(res.body.routeName).toBe(updatedPayload.routeName.toUpperCase());
      expect(res.body.status).toBe('Active');
      expect(res.body.updatedBy).toBe(testUserId.toString());
    });

    it('should return 404 if trying to update a non-existent route', async () => {
      const res = await request(app)
        .put(`/api/routes/${new mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ routeName: 'Trying to update' });
      expect(res.statusCode).toBe(404);
    });
  });

  // --- DELETE ---
  describe('DELETE /api/routes/:idOrName', () => {
    it('should permanently delete a route', async () => {
      const route = await new Route({ ...getValidRoutePayload(), createdBy: testUserId }).save();
      const res = await request(app)
        .delete(`/api/routes/${route._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain('removed permanently');

      const deletedRoute = await Route.findById(route._id);
      expect(deletedRoute).toBeNull();
    });
  });

  // --- ARCHIVE / UNARCHIVE ---
  describe('PATCH /api/routes/:id/archive and /unarchive', () => {
    it('should archive a route', async () => {
      const route = await new Route({ ...getValidRoutePayload(), createdBy: testUserId }).save();
      const res = await request(app)
        .patch(`/api/routes/${route._id}/archive`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Archived');
    });

    it('should unarchive an archived route', async () => {
      const route = await new Route({ ...getValidRoutePayload(), status: 'Archived', createdBy: testUserId }).save();
      const res = await request(app)
        .patch(`/api/routes/${route._id}/unarchive`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Planned'); // Default unarchive status
    });
  });

  // --- GEOJSON ---
  describe('GET /api/routes/:idOrName/geojson', () => {
    it('should get route data as GeoJSON', async () => {
      const route = await new Route({ ...getValidRoutePayload(), createdBy: testUserId }).save();
      const res = await request(app)
        .get(`/api/routes/${route._id}/geojson`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('FeatureCollection');
      expect(res.body.features.length).toBeGreaterThanOrEqual(3); // LineString, Origin Point, Dest Point (+ waypoints)
      expect(res.body.features[0].geometry.type).toBe('LineString');
    });
  });

  // --- SEARCH ---
  describe('GET /api/routes/search', () => {
    beforeEach(async () => { // Populate with more diverse data for search tests
        await Route.insertMany([
            { ...getValidRoutePayload({ routeName: 'Alpha Delivery Route', routeType: 'Delivery', status: 'Active' }), createdBy: testUserId },
            { ...getValidRoutePayload({ routeName: 'Bravo Pickup Route', routeType: 'Pickup', status: 'Planned', routeNumber: 'B101' }), createdBy: testUserId },
            { ...getValidRoutePayload({ routeName: 'Charlie Maintenance', routeType: 'Maintenance', status: 'Completed', origin: {latitude: 10, longitude: 20, address: "Old Town Depot"} }), createdBy: testUserId },
        ]);
    });

    it('should find routes by routeName (partial match)', async () => {
        const res = await request(app)
            .get('/api/routes/search?routeName=Alpha')
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.routes.length).toBe(1);
        expect(res.body.routes[0].routeName).toBe('ALPHA DELIVERY ROUTE');
    });

    it('should find routes by status', async () => {
        const res = await request(app)
            .get('/api/routes/search?status=Active,Planned')
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.routes.length).toBe(2); // Alpha (Active), Bravo (Planned)
    });

    it('should find routes by routeType', async () => {
        const res = await request(app)
            .get('/api/routes/search?routeType=Maintenance')
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.routes.length).toBe(1);
        expect(res.body.routes[0].routeName).toBe('CHARLIE MAINTENANCE');
    });

    it('should find routes by originAddress (partial match)', async () => {
        const res = await request(app)
            .get('/api/routes/search?originAddress=Old Town')
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.routes.length).toBe(1);
        expect(res.body.routes[0].origin.address).toBe('Old Town Depot');
    });

    it('should find routes by routeNumber (exact match)', async () => {
        const res = await request(app)
            .get('/api/routes/search?routeNumber=B101')
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.routes.length).toBe(1);
        expect(res.body.routes[0].routeNumber).toBe('B101');
    });

    it('should return empty if no routes match criteria', async () => {
        const res = await request(app)
            .get('/api/routes/search?routeName=NonExistentRouteXYZ')
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.routes.length).toBe(0);
        expect(res.body.count).toBe(0);
    });
  });

});
