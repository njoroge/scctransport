const Vehicle = require('../models/VehicleModel');
const User = require('../models/UserModel'); // Needed for validating owner/crew roles
const Route = require('../models/RouteModel'); // Needed for validating routes
const asyncHandler = require('express-async-handler');

/**
 * @desc    Register a new vehicle
 * @route   POST /api/vehicles
 * @access  Private (e.g., Admin or Sacco Staff)
 */
const registerVehicle = asyncHandler(async (req, res) => {
  const {
    numberPlate,
    vehicleType,
    logbookNumber,
    routes, // Array of Route ObjectIds
    passengerCapacity,
    nickname,
    inspectionDetails,
    insuranceDetails,
    owner, // UserId of the owner
    driver, // UserId of the driver
    conductors, // Array of conductor UserIds
    status,
    ntsaRequirements,
  } = req.body;

  // Basic Validations
  if (!numberPlate || !vehicleType || !logbookNumber || !passengerCapacity || !owner) {
    res.status(400);
    throw new Error('Please provide all required vehicle details: numberPlate, vehicleType, logbookNumber, passengerCapacity, owner.');
  }

  // Check if vehicle with numberPlate or logbookNumber already exists
  const existingVehicleByPlate = await Vehicle.findOne({ numberPlate: numberPlate.toUpperCase() });
  if (existingVehicleByPlate) {
    res.status(400);
    throw new Error(`Vehicle with number plate ${numberPlate} already exists.`);
  }
  const existingVehicleByLogbook = await Vehicle.findOne({ logbookNumber });
  if (existingVehicleByLogbook) {
    res.status(400);
    throw new Error(`Vehicle with logbook number ${logbookNumber} already exists.`);
  }

  // Validate Owner
  const vehicleOwner = await User.findById(owner);
  if (!vehicleOwner) {
    res.status(400);
    throw new Error(`Owner with ID ${owner} not found.`);
  }
  if (vehicleOwner.role !== 'sacco_member' && vehicleOwner.role !== 'admin') { // Admin could own a vehicle for the Sacco
    res.status(400);
    throw new Error(`User ID ${owner} does not belong to a SACCO member or admin.`);
  }

  // Validate Routes if provided
  if (routes && routes.length > 0) {
    for (const routeId of routes) {
      const routeExists = await Route.findById(routeId);
      if (!routeExists) {
        res.status(400);
        throw new Error(`Route with ID ${routeId} not found.`);
      }
    }
  }

  // Validate driver if provided
  if (driver) {
    const driverUser = await User.findById(driver);
    if (!driverUser || driverUser.role !== 'driver') {
      res.status(400);
      throw new Error(`Assigned driver ID ${driver} is not a valid driver.`);
    }
  }

  // Validate conductors if provided
  if (conductors && conductors.length > 0) {
    for (const conductorId of conductors) {
      const conductorUser = await User.findById(conductorId);
      if (!conductorUser || conductorUser.role !== 'conductor') {
        res.status(400);
        throw new Error(`Assigned conductor ID ${conductorId} is not a valid conductor.`);
      }
    }
  }


  const vehicle = new Vehicle({
    numberPlate,
    vehicleType,
    logbookNumber,
    routes,
    passengerCapacity,
    nickname,
    inspectionDetails,
    insuranceDetails,
    owner,
    driver,
    conductors,
    status,
    ntsaRequirements,
    createdBy: req.user._id, // Logged-in user creating this record
  });

  const createdVehicle = await vehicle.save();
  res.status(201).json(createdVehicle);
});

/**
 * @desc    Get all vehicles
 * @route   GET /api/vehicles
 * @access  Private
 */
const getAllVehicles = asyncHandler(async (req, res) => {
  // TODO: Add pagination, filtering (by status, owner, route etc.), sorting
  const vehicles = await Vehicle.find({})
    .populate('owner', 'name memberId')
    .populate('driver', 'name')
    .populate('conductors', 'name')
    .populate('routes', 'routeName routeNumber');
  res.json(vehicles);
});

/**
 * @desc    Get a single vehicle by ID
 * @route   GET /api/vehicles/:id
 * @access  Private
 */
const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id)
    .populate('owner', 'name memberId email phoneNumber')
    .populate('driver', 'name email phoneNumber') // Consider populating CrewProfile too
    .populate('conductors', 'name email phoneNumber') // Consider populating CrewProfile too
    .populate('routes', 'routeName routeNumber standardFare')
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');

  if (vehicle) {
    res.json(vehicle);
  } else {
    res.status(404);
    throw new Error('Vehicle not found.');
  }
});

/**
 * @desc    Update vehicle details
 * @route   PUT /api/vehicles/:id
 * @access  Private (e.g., Admin or Sacco Staff)
 */
const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    res.status(404);
    throw new Error('Vehicle not found.');
  }

  // Check permissions: Only admin or perhaps the user who created it can update (define business rule)
  // For now, assuming 'protect' middleware handles general access. More granular auth via 'authorize'.

  const {
    numberPlate, // Should this be updatable? Usually not.
    vehicleType,
    logbookNumber, // Should this be updatable? Usually not.
    routes,
    passengerCapacity,
    nickname,
    inspectionDetails,
    insuranceDetails,
    owner,
    driver,
    conductors,
    status,
    ntsaRequirements,
  } = req.body;

  // Validate Owner if changed
  if (owner && owner.toString() !== vehicle.owner.toString()) {
    const vehicleOwner = await User.findById(owner);
    if (!vehicleOwner) {
      res.status(400);
      throw new Error(`New owner with ID ${owner} not found.`);
    }
    if (vehicleOwner.role !== 'sacco_member' && vehicleOwner.role !== 'admin') {
      res.status(400);
      throw new Error(`User ID ${owner} does not belong to a SACCO member or admin.`);
    }
    vehicle.owner = owner;
  }

  // Validate Routes if changed
  if (routes) { // Assuming routes is a full replacement array
    if (routes.length > 0) {
        for (const routeId of routes) {
          const routeExists = await Route.findById(routeId);
          if (!routeExists) {
            res.status(400);
            throw new Error(`Route with ID ${routeId} not found during update.`);
          }
        }
    }
    vehicle.routes = routes;
  }

  // Validate driver if changed
  if (driver && (!vehicle.driver || driver.toString() !== vehicle.driver.toString())) {
    const driverUser = await User.findById(driver);
    if (!driverUser || driverUser.role !== 'driver') {
      res.status(400);
      throw new Error(`New assigned driver ID ${driver} is not a valid driver.`);
    }
    vehicle.driver = driver;
  } else if (req.body.hasOwnProperty('driver') && driver === null) { // Explicitly unassigning
    vehicle.driver = null;
  }

  // Validate conductors if changed
  if (conductors) {
    if (conductors.length > 0) {
      for (const conductorId of conductors) {
        const conductorUser = await User.findById(conductorId);
        if (!conductorUser || conductorUser.role !== 'conductor') {
          res.status(400);
          throw new Error(`New assigned conductor ID ${conductorId} is not a valid conductor.`);
        }
      }
    }
    vehicle.conductors = conductors;
  }


  // Update fields that are present in req.body
  if (vehicleType) vehicle.vehicleType = vehicleType;
  if (passengerCapacity) vehicle.passengerCapacity = passengerCapacity;
  if (nickname) vehicle.nickname = nickname;
  if (inspectionDetails) vehicle.inspectionDetails = { ...vehicle.inspectionDetails, ...inspectionDetails };
  if (insuranceDetails) vehicle.insuranceDetails = { ...vehicle.insuranceDetails, ...insuranceDetails };
  if (status) vehicle.status = status;
  if (ntsaRequirements) vehicle.ntsaRequirements = { ...vehicle.ntsaRequirements, ...ntsaRequirements };

  // Potentially non-updatable fields (handle with care or disallow)
  if (numberPlate && numberPlate.toUpperCase() !== vehicle.numberPlate) {
      const existingVehicleByPlate = await Vehicle.findOne({ numberPlate: numberPlate.toUpperCase() });
      if (existingVehicleByPlate) {
          res.status(400);
          throw new Error(`Another vehicle with number plate ${numberPlate} already exists.`);
      }
      vehicle.numberPlate = numberPlate; // Ensure pre-save hook handles case
  }
  if (logbookNumber && logbookNumber !== vehicle.logbookNumber) {
      const existingVehicleByLogbook = await Vehicle.findOne({ logbookNumber });
      if (existingVehicleByLogbook) {
          res.status(400);
          throw new Error(`Another vehicle with logbook number ${logbookNumber} already exists.`);
      }
      vehicle.logbookNumber = logbookNumber;
  }


  vehicle.updatedBy = req.user._id;
  const updatedVehicle = await vehicle.save();
  res.json(updatedVehicle);
});

/**
 * @desc    Delete a vehicle
 * @route   DELETE /api/vehicles/:id
 * @access  Private (e.g., Admin)
 */
const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
    // Add checks here: e.g., cannot delete if it has active assignments or financial records.
    // Option 1: Full delete (careful with related data)
    // await vehicle.remove();
    // Option 2: Soft delete (change status)
    vehicle.status = 'Scrapped'; // Or 'Deleted'
    vehicle.updatedBy = req.user._id;
    await vehicle.save();
    res.json({ message: 'Vehicle marked as Scrapped/Deleted.' });
  } else {
    res.status(404);
    throw new Error('Vehicle not found.');
  }
});

module.exports = {
  registerVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
