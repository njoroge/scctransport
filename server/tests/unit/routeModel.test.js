const mongoose = require('mongoose');
const Route = require('../../models/RouteModel'); // Adjust path as necessary
const User = require('../../models/UserModel'); // Assuming UserModel exists for createdBy

describe('Route Model Unit Tests', () => {
  let testUser;

  beforeAll(async () => {
    // Connect to the in-memory MongoDB server
    // Note: @shelf/jest-mongodb handles the connection globally based on jest.config.js
    // We might need to ensure the UserModel is also available if not using a mock

    // Create a dummy user for 'createdBy' field
    // Check if UserModel exists and create a user or mock it.
    // For simplicity, if UserModel is complex or not set up for tests, we might mock it.
    // However, for createdBy to work, a valid ObjectId is needed.
    if (User && User.db && User.db.models && User.db.models.User) {
        testUser = new User({ name: 'Test User', email: 'test@example.com', password: 'password123' });
        try {
            await testUser.save();
        } catch (e) {
            // If user model has unique email and test reruns, it might fail. Find existing.
            testUser = await User.findOne({ email: 'test@example.com' });
            if (!testUser) { // If still not found, something is wrong or first run failed.
                 console.error("Failed to create or find test user for Route model tests.");
                 // Fallback to a plain ObjectId if user creation is problematic in test setup
                 testUser = { _id: new mongoose.Types.ObjectId() };
            }
        }
    } else {
        // Fallback if UserModel is not fully available or behaving unexpectedly in test env
        console.warn("UserModel not fully available for Route model tests, using placeholder _id for createdBy.");
        testUser = { _id: new mongoose.Types.ObjectId() };
    }
  });

  afterAll(async () => {
    // Clear the Route collection
    await Route.deleteMany({});
    if (User && User.db && User.db.models && User.db.models.User) {
        await User.deleteMany({ email: 'test@example.com' });
    }
    // Note: @shelf/jest-mongodb handles disconnecting globally
  });

  beforeEach(async () => {
    // Clear data before each test to ensure test isolation
    await Route.deleteMany({});
  });

  // Helper function to create valid route data
  const getValidRouteData = (overrides = {}) => ({
    routeName: 'TEST ROUTE ' + new mongoose.Types.ObjectId().toString(), // Ensure unique routeName
    origin: { latitude: 1.23, longitude: 4.56, address: 'Origin Address' },
    destination: { latitude: 7.89, longitude: 10.11, address: 'Destination Address' },
    estimatedDistance: 100, // km
    estimatedDuration: 120, // minutes
    routeType: 'Delivery',
    status: 'Planned',
    createdBy: testUser._id,
    ...overrides,
  });

  describe('Field Validations', () => {
    it('should create a route with all valid fields', async () => {
      const routeData = getValidRouteData();
      const route = new Route(routeData);
      const savedRoute = await route.save();

      expect(savedRoute._id).toBeDefined();
      expect(savedRoute.routeName).toBe(routeData.routeName.toUpperCase()); // Test pre-save hook
      expect(savedRoute.origin.latitude).toBe(routeData.origin.latitude);
      expect(savedRoute.destination.address).toBe(routeData.destination.address);
      expect(savedRoute.estimatedDistance).toBe(routeData.estimatedDistance);
      expect(savedRoute.estimatedDuration).toBe(routeData.estimatedDuration);
      expect(savedRoute.routeType).toBe(routeData.routeType);
      expect(savedRoute.status).toBe(routeData.status);
      expect(savedRoute.createdBy.toString()).toBe(testUser._id.toString());
      expect(savedRoute.createdAt).toBeDefined();
      expect(savedRoute.updatedAt).toBeDefined();
    });

    const requiredFields = ['routeName', 'origin', 'destination', 'estimatedDistance', 'estimatedDuration', 'routeType', 'createdBy'];
    requiredFields.forEach(field => {
      it(`should fail if ${field} is missing`, async () => {
        const routeData = getValidRouteData();
        delete routeData[field];
        const route = new Route(routeData);
        let err;
        try {
          await route.save();
        } catch (error) {
          err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        if (err && err.errors) { // err.errors might be undefined if validation fails at a higher level
            expect(err.errors[field]).toBeDefined();
        }
      });
    });

    it('should fail if origin is missing latitude or longitude', async () => {
        let routeData = getValidRouteData({ origin: { address: 'Origin Address Only' } });
        let route = new Route(routeData);
        await expect(route.save()).rejects.toThrow(mongoose.Error.ValidationError);

        routeData = getValidRouteData({ origin: { latitude: 1.23, address: 'Origin Address' } });
        route = new Route(routeData);
        await expect(route.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('should fail if a waypoint is missing latitude, longitude, or order', async () => {
        const waypoints = [{ latitude: 1, longitude: 1 }]; // Missing order
        const routeData = getValidRouteData({ waypoints });
        const route = new Route(routeData);
        await expect(route.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('should fail with invalid routeType', async () => {
      const routeData = getValidRouteData({ routeType: 'InvalidType' });
      const route = new Route(routeData);
      await expect(route.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('should fail with invalid status', async () => {
      const routeData = getValidRouteData({ status: 'InvalidStatus' });
      const route = new Route(routeData);
      await expect(route.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('should enforce minimum for estimatedDistance', async () => {
      const routeData = getValidRouteData({ estimatedDistance: -10 });
      const route = new Route(routeData);
      await expect(route.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('should enforce minimum for estimatedDuration', async () => {
      const routeData = getValidRouteData({ estimatedDuration: -60 });
      const route = new Route(routeData);
      await expect(route.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });
  });

  describe('Uniqueness Validations', () => {
    it('should fail if routeName is not unique', async () => {
      const commonRouteName = 'UNIQUE ROUTE NAME';
      await new Route(getValidRouteData({ routeName: commonRouteName })).save();

      const route2 = new Route(getValidRouteData({ routeName: commonRouteName }));
      await expect(route2.save()).rejects.toThrow(/E11000 duplicate key error collection/);
    });

    it('should allow routeNumber to be non-unique if null or undefined', async () => {
      await new Route(getValidRouteData({ routeName: 'ROUTE A', routeNumber: null })).save();
      await expect(new Route(getValidRouteData({ routeName: 'ROUTE B', routeNumber: null })).save()).resolves.toBeDefined();
    });

    it('should fail if routeNumber is not unique (when provided)', async () => {
        const commonRouteNumber = 'U123';
        await new Route(getValidRouteData({ routeName: 'ROUTE X', routeNumber: commonRouteNumber })).save();

        const route2 = new Route(getValidRouteData({ routeName: 'ROUTE Y', routeNumber: commonRouteNumber }));
        // Mongoose unique validator for non-required fields (sparse index) throws a MongoError, not ValidationError directly for duplicate
        await expect(route2.save()).rejects.toThrow(/E11000 duplicate key error collection/);
    });
  });

  describe('Pre-save Hooks', () => {
    it('should uppercase routeName and routeNumber before saving', async () => {
      const routeData = getValidRouteData({ routeName: 'lowercase route', routeNumber: 'abc' });
      const route = new Route(routeData);
      const savedRoute = await route.save();

      expect(savedRoute.routeName).toBe('LOWERCASE ROUTE');
      expect(savedRoute.routeNumber).toBe('ABC');
    });
  });

  describe('Waypoints', () => {
    it('should correctly save valid waypoints', async () => {
      const waypoints = [
        { latitude: 1.1, longitude: 2.2, address: "Waypoint 1", order: 1 },
        { latitude: 3.3, longitude: 4.4, address: "Waypoint 2", order: 2 }
      ];
      const routeData = getValidRouteData({ waypoints });
      const route = new Route(routeData);
      const savedRoute = await route.save();

      expect(savedRoute.waypoints.length).toBe(2);
      expect(savedRoute.waypoints[0].address).toBe("Waypoint 1");
      expect(savedRoute.waypoints[1].order).toBe(2);
    });
  });
});
