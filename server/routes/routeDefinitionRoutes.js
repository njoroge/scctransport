const express = require('express');
const router = express.Router();
const {
  defineNewRoute,
  getAllRoutes,
  getRouteByIdOrName,
  updateRoute,
  deleteRoute,
} = require('../controllers/routeDefinitionController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route definition management typically by Admin or a dedicated Route Manager role.

router
  .route('/')
  .post(protect, authorize('admin', 'route_marshal'), defineNewRoute) // Admin or RM can define routes
  .get(protect, getAllRoutes); // All authenticated users can view routes

router
  .route('/:idOrName')
  .get(protect, getRouteByIdOrName) // View specific route
  .put(protect, authorize('admin', 'route_marshal'), updateRoute) // Admin or RM can update
  .delete(protect, authorize('admin'), deleteRoute); // Admin can delete

module.exports = router;
