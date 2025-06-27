const express = require('express');
const router = express.Router();
const {
  createCrewProfile,
  getAllCrewProfiles,
  getCrewProfileByUserId,
  updateCrewProfile,
  deleteCrewProfile,
} = require('../controllers/crewProfileController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All crew profile routes are protected.
// Creating, updating, and deleting profiles typically done by Admin or HR/Staff role.
// Viewing might be available to more roles.

router
  .route('/')
  .post(protect, authorize('admin', 'route_marshal'), createCrewProfile) // Example: Admin or RM can create
  .get(protect, getAllCrewProfiles); // All authenticated (staff) users can view all profiles

router
  .route('/:userId') // Operations by User ID associated with the crew profile
  .get(protect, getCrewProfileByUserId) // View specific profile
  .put(protect, authorize('admin', 'route_marshal'), updateCrewProfile) // Admin or RM can update
  .delete(protect, authorize('admin'), deleteCrewProfile); // Admin can delete

module.exports = router;
