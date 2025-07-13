const Route = require('../models/RouteModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// Helper function to find a route by ID, Name, or Number
const findRouteByIdentifier = async (identifier) => {
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    const routeById = await Route.findById(identifier);
    if (routeById) return routeById;
  }

  const upperIdentifier = identifier.toUpperCase();
  const routeByName = await Route.findOne({ routeName: upperIdentifier });
  if (routeByName) return routeByName;

  // Only search by routeNumber if it's not an ObjectId (to avoid misinterpreting a valid ID as a number)
  if (!mongoose.Types.ObjectId.isValid(identifier)) {
    const routeByNumber = await Route.findOne({ routeNumber: upperIdentifier });
    if (routeByNumber) return routeByNumber;
  }

  return null;
};


/**
 * @desc    Define a new route
 * @route   POST /api/routes
 * @access  Private (Admin or Route Manager)
 */
const defineNewRoute = asyncHandler(async (req, res) => {
  console.log('defining new route');
  const {
    routeName,
    routeNumber,
    tlbRouteInfo,
    standardFare,
    typicalDailyIncomeExpectation,
    ntsaComplianceDetails,
    // New fields
    origin,
    destination,
    waypoints,
    estimatedDistance,
    estimatedDuration,
    routeType,
    assignedVehicle,
    assignedDriver,
    status // Overwrites default 'Planned' if provided
  } = req.body;

  // Basic validation for new required fields
  if (!routeName || !origin || !destination || !estimatedDistance || !estimatedDuration || !routeType) {
    res.status(400);
    throw new Error('Missing required fields: routeName, origin, destination, estimatedDistance, estimatedDuration, routeType are required.');
  }
  if (!origin.latitude || !origin.longitude || !destination.latitude || !destination.longitude) {
    res.status(400);
    throw new Error('Origin and Destination must include latitude and longitude.');
  }
  if (waypoints && !Array.isArray(waypoints)) {
    res.status(400);
    throw new Error('Waypoints must be an array.');
  }
  if (waypoints) {
    for (const wp of waypoints) {
      if (!wp.latitude || !wp.longitude || wp.order === undefined) {
        res.status(400);
        throw new Error('Each waypoint must include latitude, longitude, and order.');
      }
    }
  }


  const routeNameUpper = routeName.toUpperCase();
  const existingRouteByName = await Route.findOne({ routeName: routeNameUpper });
  if (existingRouteByName) {
    res.status(400);
    throw new Error(`Route with name "${routeName}" already exists.`);
  }

  if (routeNumber) {
    const routeNumberUpper = routeNumber.toUpperCase();
    const existingRouteByNumber = await Route.findOne({ routeNumber: routeNumberUpper, routeName: { $ne: routeNameUpper } }); // Ensure not matching the same route if name is also similar
    if (existingRouteByNumber) {
      res.status(400);
      throw new Error(`Route with number "${routeNumber}" already exists.`);
    }
  }

  const route = new Route({
    routeName, // Will be uppercased by pre-save hook
    routeNumber, // Will be uppercased by pre-save hook
    tlbRouteInfo,
    standardFare,
    typicalDailyIncomeExpectation,
    ntsaComplianceDetails,
    origin,
    destination,
    waypoints,
    estimatedDistance,
    estimatedDuration,
    routeType,
    assignedVehicle,
    assignedDriver,
    status: status || 'Planned', // Use provided status or default to 'Planned'
    createdBy: req.user._id,
  });

  const createdRoute = await route.save();
  res.status(201).json(createdRoute);
});

/**
 * @desc    Get all routes with pagination
 * @route   GET /api/routes
 * @access  Private (All authenticated users)
 */
const getAllRoutes = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10; // Default to 10 items per page
  const page = Number(req.query.page) || 1; // Default to page 1

  const count = await Route.countDocuments({});
  const routes = await Route.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email')
    .sort({ createdAt: -1 }); // Sort by newest first

  res.json({
    routes,
    page,
    pages: Math.ceil(count / pageSize),
    count
  });
});

/**
 * @desc    Get a single route by ID, Name or RouteNumber
 * @route   GET /api/routes/:idOrName
 * @access  Private
 */
const getRouteByIdOrName = asyncHandler(async (req, res) => {
  const param = req.params.idOrName;
  const route = await findRouteByIdentifier(param);

  if (route) {
    // Populate creator/updater details
    // Ensure population is done correctly, especially after findOne
    const populatedRoute = await Route.findById(route._id)
                                      .populate('createdBy', 'name email')
                                      .populate('updatedBy', 'name email');
    res.json(populatedRoute);
  } else {
    res.status(404);
    throw new Error(`Route with identifier "${param}" not found.`);
  }
});

/**
 * @desc    Update route details by ID, Name or RouteNumber
 * @route   PUT /api/routes/:idOrName
 * @access  Private (Admin or Route Manager)
 */
const updateRoute = asyncHandler(async (req, res) => {
  const param = req.params.idOrName;
  const route = await findRouteByIdentifier(param);

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
    origin,
    destination,
    waypoints,
    estimatedDistance,
    estimatedDuration,
    routeType,
    assignedVehicle,
    assignedDriver,
    status,
  } = req.body;

  // Check for uniqueness if routeName or routeNumber are being changed
  if (routeName && routeName.toUpperCase() !== route.routeName) {
    const existingRouteByName = await Route.findOne({ routeName: routeName.toUpperCase(), _id: { $ne: route._id } });
    if (existingRouteByName) {
      res.status(400);
      throw new Error(`Another route with name "${routeName}" already exists.`);
    }
    route.routeName = routeName; // Uppercasing handled by pre-save
  }

  if (routeNumber && routeNumber.toUpperCase() !== route.routeNumber) {
    const existingRouteByNumber = await Route.findOne({ routeNumber: routeNumber.toUpperCase(), _id: { $ne: route._id } });
    if (existingRouteByNumber) {
      res.status(400);
      throw new Error(`Another route with number "${routeNumber}" already exists.`);
    }
    route.routeNumber = routeNumber; // Uppercasing handled by pre-save
  } else if (req.body.hasOwnProperty('routeNumber') && (routeNumber === null || routeNumber === '')) {
      route.routeNumber = undefined; // Allow unsetting route number
  }

  // Update fields if they are provided in the request body
  if (tlbRouteInfo !== undefined) route.tlbRouteInfo = tlbRouteInfo;
  if (standardFare !== undefined) route.standardFare = standardFare;
  if (typicalDailyIncomeExpectation !== undefined) route.typicalDailyIncomeExpectation = typicalDailyIncomeExpectation;
  if (ntsaComplianceDetails !== undefined) route.ntsaComplianceDetails = ntsaComplianceDetails;

  if (origin) {
    if(origin.latitude === undefined || origin.longitude === undefined) {
        res.status(400); throw new Error("Origin must have latitude and longitude");
    }
    route.origin = { ...route.origin, ...origin };
  }
  if (destination) {
     if(destination.latitude === undefined || destination.longitude === undefined) {
        res.status(400); throw new Error("Destination must have latitude and longitude");
    }
    route.destination = { ...route.destination, ...destination };
  }
  if (waypoints !== undefined) {
    if (!Array.isArray(waypoints)) {
        res.status(400); throw new Error('Waypoints must be an array.');
    }
    for (const wp of waypoints) {
      if (wp.latitude === undefined || wp.longitude === undefined || wp.order === undefined) {
        res.status(400);
        throw new Error('Each waypoint must include latitude, longitude, and order.');
      }
    }
    route.waypoints = waypoints;
  }
  if (estimatedDistance !== undefined) route.estimatedDistance = estimatedDistance;
  if (estimatedDuration !== undefined) route.estimatedDuration = estimatedDuration;
  if (routeType) route.routeType = routeType;
  if (assignedVehicle !== undefined) route.assignedVehicle = assignedVehicle; // Handle null for unassignment
  if (assignedDriver !== undefined) route.assignedDriver = assignedDriver;   // Handle null for unassignment
  if (status) route.status = status;

  route.updatedBy = req.user._id;
  const updatedRoute = await route.save();
  res.json(updatedRoute);
});

/**
 * @desc    Delete a route by ID, Name or RouteNumber (Permanent Delete)
 * @route   DELETE /api/routes/:idOrName
 * @access  Private (Admin)
 */
const deleteRoute = asyncHandler(async (req, res) => {
  const param = req.params.idOrName;
  const route = await findRouteByIdentifier(param);

  if (route) {
    // Optional: Add checks here if needed, e.g., prevent deletion of 'Active' routes.
    // For now, removing the vehicle check as per plan.
    // const Vehicle = require('../models/VehicleModel'); // Lazy require
    // const vehiclesOnRoute = await Vehicle.countDocuments({ routes: route._id });
    // if (vehiclesOnRoute > 0) {
    //   res.status(400);
    //   throw new Error(`Cannot delete route "${route.routeName}". It is currently assigned to ${vehiclesOnRoute} vehicle(s). Please unassign vehicles first.`);
    // }

    await route.remove();
    res.json({ message: `Route "${route.routeName}" (ID: ${route._id}) removed permanently.` });
  } else {
    res.status(404);
    throw new Error(`Route with identifier "${param}" not found for deletion.`);
  }
});

/**
 * @desc    Archive a route by ID (Soft Delete)
 * @route   PATCH /api/routes/:id/archive
 * @access  Private (Admin or Route Manager)
 */
const archiveRoute = asyncHandler(async (req, res) => {
    const route = await Route.findById(req.params.id);

    if (!route) {
        res.status(404);
        throw new Error('Route not found.');
    }

    if (route.status === 'Archived') {
        res.status(400);
        throw new Error('Route is already archived.');
    }

    // Potentially add check: Cannot archive if 'Active' and assigned to vehicles?
    // For now, allowing archive regardless of state other than already archived.

    route.status = 'Archived';
    route.updatedBy = req.user._id;
    const archivedRoute = await route.save();
    res.json(archivedRoute);
});

/**
 * @desc    Unarchive a route by ID
 * @route   PATCH /api/routes/:id/unarchive
 * @access  Private (Admin or Route Manager)
 */
const unarchiveRoute = asyncHandler(async (req, res) => {
    const route = await Route.findById(req.params.id);

    if (!route) {
        res.status(404);
        throw new Error('Route not found.');
    }

    if (route.status !== 'Archived') {
        res.status(400);
        throw new Error('Route is not currently archived.');
    }

    route.status = 'Planned'; // Or another status like 'Inactive' or its previous status if stored
    route.updatedBy = req.user._id;
    const unarchivedRoute = await route.save();
    res.json(unarchivedRoute);
});

// ... (keep existing code for searchRoutes and getRouteAsGeoJSON) ...
// Ensure all functions are defined before this module.exports block.

/**
 * @desc    Search and filter routes with pagination
 * @route   GET /api/routes/search
 * @access  Private (All authenticated users)
 */
const searchRoutes = asyncHandler(async (req, res) => {
  const {
    routeName,
    routeNumber,
    status,
    assignedVehicle,
    assignedDriver,
    dateRangeStart,
    dateRangeEnd,
    originAddress,
    destinationAddress,
    routeType,
    page,
    pageSize: queryPageSize // Renamed to avoid conflict with function-scope pageSize
  } = req.query;

  const filter = {};

  if (routeName) {
    filter.routeName = { $regex: routeName, $options: 'i' }; // Case-insensitive partial match
  }
  if (routeNumber) {
    filter.routeNumber = { $regex: `^${routeNumber}$`, $options: 'i' }; // Case-insensitive exact match
  }
  if (status) {
    // If status is a comma-separated list, convert to an array for $in query
    const statuses = status.split(',').map(s => s.trim());
    if (statuses.length > 1) {
      filter.status = { $in: statuses };
    } else if (statuses.length === 1 && statuses[0]) {
      filter.status = statuses[0];
    }
  }
  if (assignedVehicle) {
    filter.assignedVehicle = assignedVehicle; // Assuming exact match for ID or string
  }
  if (assignedDriver) {
    filter.assignedDriver = assignedDriver; // Assuming exact match for ID or string
  }
  if (routeType) {
     // If routeType is a comma-separated list, convert to an array for $in query
    const routeTypes = routeType.split(',').map(s => s.trim());
    if (routeTypes.length > 1) {
      filter.routeType = { $in: routeTypes };
    } else if (routeTypes.length === 1 && routeTypes[0]) {
      filter.routeType = routeTypes[0];
    }
  }

  if (dateRangeStart || dateRangeEnd) {
    filter.createdAt = {};
    if (dateRangeStart) {
      if (isNaN(new Date(dateRangeStart))) {
        res.status(400);
        throw new Error('Invalid dateRangeStart format.');
      }
      filter.createdAt.$gte = new Date(dateRangeStart);
    }
    if (dateRangeEnd) {
      if (isNaN(new Date(dateRangeEnd))) {
        res.status(400);
        throw new Error('Invalid dateRangeEnd format.');
      }
      // To include the whole end day, set to end of day
      const endDate = new Date(dateRangeEnd);
      endDate.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = endDate;
    }
  }

  if (originAddress) {
    filter['origin.address'] = { $regex: originAddress, $options: 'i' };
  }
  if (destinationAddress) {
    filter['destination.address'] = { $regex: destinationAddress, $options: 'i' };
  }

  const pageSize = Number(queryPageSize) || 10;
  const currentPage = Number(page) || 1;

  const count = await Route.countDocuments(filter);
  const routes = await Route.find(filter)
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email')
    .sort({ createdAt: -1 }); // Default sort, can be made configurable

  res.json({
    routes,
    page: currentPage,
    pages: Math.ceil(count / pageSize),
    count,
    filterUsed: filter // Optionally return the filter used for debugging/transparency
  });
});

// Make sure to add searchRoutes to the module.exports at the top of the file
// module.exports = { ..., searchRoutes }


/**
 * @desc    Get a single route's path as a GeoJSON LineString
 * @route   GET /api/routes/:idOrName/geojson
 * @access  Private (All authenticated users who can view the route)
 */
const getRouteAsGeoJSON = asyncHandler(async (req, res) => {
  const param = req.params.idOrName;
  const route = await findRouteByIdentifier(param);

  if (!route) {
    res.status(404);
    throw new Error(`Route with identifier "${param}" not found.`);
  }

  if (!route.origin || !route.destination) {
    res.status(400);
    throw new Error('Route is missing origin or destination, cannot generate GeoJSON path.');
  }

  const coordinates = [];

  // Add origin
  coordinates.push([route.origin.longitude, route.origin.latitude]);

  // Add waypoints in order
  if (route.waypoints && route.waypoints.length > 0) {
    // Sort waypoints by order just in case they are not stored in order
    const sortedWaypoints = [...route.waypoints].sort((a, b) => a.order - b.order);
    sortedWaypoints.forEach(wp => {
      coordinates.push([wp.longitude, wp.latitude]);
    });
  }

  // Add destination
  coordinates.push([route.destination.longitude, route.destination.latitude]);

  if (coordinates.length < 2) {
    res.status(400);
    throw new Error('Route path requires at least two points (origin and destination).');
  }

  const geoJsonFeature = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          routeName: route.routeName,
          routeId: route._id,
          routeType: route.routeType,
          status: route.status,
          // Add any other relevant route properties here
        },
        geometry: {
          type: "LineString",
          coordinates: coordinates
        }
      },
      // Optionally, add points for origin, destination, and waypoints as separate features
      {
        type: "Feature",
        properties: { name: route.origin.address || "Origin", type: "Origin", routeName: route.routeName },
        geometry: { type: "Point", coordinates: [route.origin.longitude, route.origin.latitude] }
      },
      {
        type: "Feature",
        properties: { name: route.destination.address || "Destination", type: "Destination", routeName: route.routeName },
        geometry: { type: "Point", coordinates: [route.destination.longitude, route.destination.latitude] }
      }
    ]
  };

  if (route.waypoints && route.waypoints.length > 0) {
    route.waypoints.forEach(wp => {
      geoJsonFeature.features.push({
        type: "Feature",
        properties: { name: wp.address || `Waypoint ${wp.order}`, type: "Waypoint", order: wp.order, routeName: route.routeName },
        geometry: { type: "Point", coordinates: [wp.longitude, wp.latitude] }
      });
    });
  }


  res.json(geoJsonFeature);
});

// Make sure to add getRouteAsGeoJSON to module.exports
// module.exports = { ..., getRouteAsGeoJSON }

module.exports = {
  defineNewRoute,
  getAllRoutes,
  getRouteByIdOrName,
  updateRoute,
  deleteRoute,
  archiveRoute,
  unarchiveRoute,
  searchRoutes,
  getRouteAsGeoJSON
};
