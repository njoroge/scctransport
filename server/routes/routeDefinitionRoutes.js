const express = require('express');
const router = express.Router();
const {
  defineNewRoute,
  getAllRoutes,
  getRouteByIdOrName,
  updateRoute,
  deleteRoute,
  archiveRoute,
  unarchiveRoute,
  searchRoutes,
  getRouteAsGeoJSON // Added getRouteAsGeoJSON
} = require('../controllers/routeDefinitionController');
const { protect, authorize } = require('../middleware/authMiddleware');

// --- Base Route for Creating and Listing ---
router
  .route('/')
  .post(protect, authorize('admin', 'route_marshal'), defineNewRoute) // Admin or Route Manager can define new routes
  .get(protect, getAllRoutes); // All authenticated users can view routes (with pagination)

// --- Search Route ---
// IMPORTANT: This needs to be defined *before* routes with dynamic params like /:idOrName
router.get('/search', protect, searchRoutes); // All authenticated users can search routes

// --- GeoJSON output for a specific route ---
// Also define before /:idOrName to avoid 'geojson' being treated as an idOrName.
router.get('/:idOrName/geojson', protect, getRouteAsGeoJSON); // Authenticated users can get GeoJSON

// --- Routes for specific route identified by ID, Name, or Number ---
// Note: :idOrName will be handled by the controller to check if it's an ID, name or route number.
router
  .route('/:idOrName')
  .get(protect, getRouteByIdOrName) // All authenticated users can view a specific route
  .put(protect, authorize('admin', 'route_marshal'), updateRoute) // Admin or Route Manager can update
  .delete(protect, authorize('admin'), deleteRoute); // Only Admin can permanently delete

// --- Routes for Archiving and Unarchiving (using MongoDB ID for these specific actions) ---
router
  .route('/:id/archive')
  .patch(protect, authorize('admin', 'route_marshal'), archiveRoute); // Admin or RM can archive

router
  .route('/:id/unarchive')
  .patch(protect, authorize('admin', 'route_marshal'), unarchiveRoute); // Admin or RM can unarchive

module.exports = router;
