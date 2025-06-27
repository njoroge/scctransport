const express = require('express');
const router = express.Router();
const {
  registerVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All vehicle routes are protected and require at least a logged-in user.
// Specific authorization (e.g., 'admin', 'sacco_staff') can be added per route.
// For now, let's assume 'admin' or a new role like 'fleet_manager' would typically manage vehicles.
// We'll use 'admin' as a placeholder for privileged operations.

router
  .route('/')
  .post(protect, authorize('admin', 'route_marshal'), registerVehicle) // Example: Admin or Route Marshal can register
  .get(protect, getAllVehicles); // All authenticated users can view vehicles (adjust if needed)

router
  .route('/:id')
  .get(protect, getVehicleById) // All authenticated users can view details
  .put(protect, authorize('admin', 'route_marshal'), updateVehicle) // Example: Admin or RM can update
  .delete(protect, authorize('admin'), deleteVehicle); // Only Admin can delete (or mark as scrapped)

// Specific assignment routes (if not handled within the general update PUT /:id)
// Example:
// router.put('/:id/assign-owner', protect, authorize('admin'), assignVehicleOwnerController);
// router.put('/:id/assign-crew', protect, authorize('admin', 'route_marshal'), assignVehicleCrewController);

module.exports = router;
