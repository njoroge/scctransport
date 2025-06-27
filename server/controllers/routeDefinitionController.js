const Route = require('../models/RouteModel');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Define a new route
 * @route   POST /api/routes
 * @access  Private (Admin or Route Manager)
 */
const defineNewRoute = asyncHandler(async (req, res) => {
  const {
    routeName,
    routeNumber,
    tlbRouteInfo,
    standardFare,
    typicalDailyIncomeExpectation,
    ntsaComplianceDetails,
    status,
  } = req.body;

  if (!routeName) {
    res.status(400);
    throw new Error('Route name is required.');
  }

  const routeNameUpper = routeName.toUpperCase();
  const existingRouteByName = await Route.findOne({ routeName: routeNameUpper });
  if (existingRouteByName) {
    res.status(400);
    throw new Error(`Route with name "${routeName}" already exists.`);
  }

  if (routeNumber) {
    const routeNumberUpper = routeNumber.toUpperCase();
    const existingRouteByNumber = await Route.findOne({ routeNumber: routeNumberUpper });
    if (existingRouteByNumber) {
      res.status(400);
      throw new Error(`Route with number "${routeNumber}" already exists.`);
    }
  }

  const route = new Route({
    routeName: routeNameUpper,
    routeNumber: routeNumber ? routeNumber.toUpperCase() : undefined,
    tlbRouteInfo,
    standardFare,
    typicalDailyIncomeExpectation,
    ntsaComplianceDetails,
    status,
    createdBy: req.user._id,
  });

  const createdRoute = await route.save();
  res.status(201).json(createdRoute);
});

/**
 * @desc    Get all routes
 * @route   GET /api/routes
 * @access  Private (All authenticated users)
 */
const getAllRoutes = asyncHandler(async (req, res) => {
  // TODO: Add filtering by status, pagination
  const routes = await Route.find({})
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');
  res.json(routes);
});

/**
 * @desc    Get a single route by ID or Name
 * @route   GET /api/routes/:idOrName
 * @access  Private
 */
const getRouteByIdOrName = asyncHandler(async (req, res) => {
  const param = req.params.idOrName;
  let route;

  // Check if param is a valid MongoDB ObjectId
  if (param.match(/^[0-9a-fA-F]{24}$/)) {
    route = await Route.findById(param);
  }

  // If not found by ID, try by name (case-insensitive search for flexibility, though model stores uppercase)
  if (!route) {
    route = await Route.findOne({ routeName: param.toUpperCase() });
  }

  // If not found by name, try by number (case-insensitive)
  if (!route && !param.match(/^[0-9a-fA-F]{24}$/)) { // only try routeNumber if not an ID
      route = await Route.findOne({ routeNumber: param.toUpperCase() });
  }

  if (route) {
    // Populate creator/updater details
    await route.populate('createdBy', 'name email').execPopulate();
    if (route.updatedBy) {
        await route.populate('updatedBy', 'name email').execPopulate();
    }
    res.json(route);
  } else {
    res.status(404);
    throw new Error(`Route with identifier "${param}" not found.`);
  }
});

/**
 * @desc    Update route details by ID or Name
 * @route   PUT /api/routes/:idOrName
 * @access  Private (Admin or Route Manager)
 */
const updateRoute = asyncHandler(async (req, res) => {
  const param = req.params.idOrName;
  let route;

  if (param.match(/^[0-9a-fA-F]{24}$/)) {
    route = await Route.findById(param);
  }
  if (!route) {
    route = await Route.findOne({ routeName: param.toUpperCase() });
  }
  if (!route && !param.match(/^[0-9a-fA-F]{24}$/)) {
      route = await Route.findOne({ routeNumber: param.toUpperCase() });
  }

  if (!route) {
    res.status(404);
    throw new Error(`Route with identifier "${param}" not found for update.`);
  }

  const {
    routeName,
    routeNumber,
    tlbRouteInfo,
    standardFare,
    typicalDailyIncomeExpectation,
    ntsaComplianceDetails,
    status,
  } = req.body;

  // Check for uniqueness if routeName or routeNumber are being changed
  if (routeName && routeName.toUpperCase() !== route.routeName) {
    const existingRouteByName = await Route.findOne({ routeName: routeName.toUpperCase() });
    if (existingRouteByName) {
      res.status(400);
      throw new Error(`Another route with name "${routeName}" already exists.`);
    }
    route.routeName = routeName.toUpperCase();
  }

  if (routeNumber && routeNumber.toUpperCase() !== route.routeNumber) {
    const existingRouteByNumber = await Route.findOne({ routeNumber: routeNumber.toUpperCase() });
    if (existingRouteByNumber) {
      res.status(400);
      throw new Error(`Another route with number "${routeNumber}" already exists.`);
    }
    route.routeNumber = routeNumber.toUpperCase();
  } else if (req.body.hasOwnProperty('routeNumber') && routeNumber === null) {
      route.routeNumber = undefined; // Allow unsetting route number
  }


  if (tlbRouteInfo !== undefined) route.tlbRouteInfo = tlbRouteInfo;
  if (standardFare !== undefined) route.standardFare = standardFare;
  if (typicalDailyIncomeExpectation !== undefined) route.typicalDailyIncomeExpectation = typicalDailyIncomeExpectation;
  if (ntsaComplianceDetails !== undefined) route.ntsaComplianceDetails = ntsaComplianceDetails;
  if (status) route.status = status;

  route.updatedBy = req.user._id;
  const updatedRoute = await route.save();
  res.json(updatedRoute);
});

/**
 * @desc    Delete a route by ID or Name
 * @route   DELETE /api/routes/:idOrName
 * @access  Private (Admin)
 */
const deleteRoute = asyncHandler(async (req, res) => {
  const param = req.params.idOrName;
  let route;

  if (param.match(/^[0-9a-fA-F]{24}$/)) {
    route = await Route.findById(param);
  }
  if (!route) {
    route = await Route.findOne({ routeName: param.toUpperCase() });
  }
   if (!route && !param.match(/^[0-9a-fA-F]{24}$/)) {
      route = await Route.findOne({ routeNumber: param.toUpperCase() });
  }

  if (route) {
    // Check if route is assigned to any vehicles before deleting
    const Vehicle = require('../models/VehicleModel'); // Lazy require to avoid circular dependency if any
    const vehiclesOnRoute = await Vehicle.countDocuments({ routes: route._id });
    if (vehiclesOnRoute > 0) {
      res.status(400);
      throw new Error(`Cannot delete route "${route.routeName}". It is currently assigned to ${vehiclesOnRoute} vehicle(s). Please unassign vehicles first.`);
    }

    await route.remove();
    res.json({ message: `Route "${route.routeName}" removed successfully.` });
  } else {
    res.status(404);
    throw new Error(`Route with identifier "${param}" not found for deletion.`);
  }
});

module.exports = {
  defineNewRoute,
  getAllRoutes,
  getRouteByIdOrName,
  updateRoute,
  deleteRoute,
};
